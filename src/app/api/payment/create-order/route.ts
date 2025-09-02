// File: src/app/api/payment/create-order/route.ts (Corrected)

import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
	const { amount, userId, matchId } = await request.json();

	if (!amount || !userId || !matchId) {
		return NextResponse.json(
			{ error: "Amount, userId, and matchId are required." },
			{ status: 400 }
		);
	}

	const merchantId = process.env.PHONEPE_MERCHANT_ID;
	const saltKey = process.env.PHONEPE_SALT_KEY;
	const saltIndex = process.env.PHONEPE_SALT_INDEX;
	const redirectUrl = process.env.NEXT_PUBLIC_PHONEPE_REDIRECT_URL;

	if (!merchantId || !saltKey || !saltIndex || !redirectUrl) {
		console.error("PhonePe environment variables are not set.");
		return NextResponse.json(
			{ error: "Payment gateway is not configured." },
			{ status: 500 }
		);
	}

	// --- FIX: Generate a transaction ID that is under 38 characters ---
	// A UUID without hyphens is 32 characters long. "MUID-" + 32 = 37 characters.
	const merchantTransactionId = `MUID-${uuidv4().replace(/-/g, "")}`;

	const payload = {
		merchantId,
		merchantTransactionId,
		merchantUserId: userId,
		amount: amount * 100, // Amount in paise
		redirectUrl: `${redirectUrl}`,
		redirectMode: "REDIRECT",
		callbackUrl: `http://localhost:3001/api/payment/`,
		mobileNumber: "9999999999", // Can be a placeholder or actual user number
		paymentInstrument: {
			type: "PAY_PAGE",
		},
	};

	const base64Payload = Buffer.from(JSON.stringify(payload)).toString(
		"base64"
	);
	const checksumString = `${base64Payload}/pg/v1/pay${saltKey}`;
	const sha256Checksum = crypto
		.createHash("sha256")
		.update(checksumString)
		.digest("hex");
	const xVerify = `${sha256Checksum}###${saltIndex}`;

	try {
		const response = await fetch(
			"https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"X-VERIFY": xVerify,
				},
				body: JSON.stringify({ request: base64Payload }),
			}
		);

		const data = await response.json();

		if (data.success) {
			return NextResponse.json({
				success: true,
				redirectUrl: data.data.instrumentResponse.redirectInfo.url,
				merchantTransactionId: merchantTransactionId,
			});
		} else {
			// Log the specific error from PhonePe for easier debugging
			console.error("PhonePe API Error:", data.message);
			return NextResponse.json(
				{ error: data.message || "Failed to create payment order." },
				{ status: 500 } // Or use response.status if available
			);
		}
	} catch (error) {
		console.error("Error creating PhonePe order:", error);
		return NextResponse.json(
			{ error: "Internal server error." },
			{ status: 500 }
		);
	}
}
