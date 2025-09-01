// File: src/app/api/payment/verify/route.ts (Corrected)

import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import clientPromise from "@/lib/mongodb";
import { UserProfile } from "@/models/User";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const base64Response = body.response;

		if (!base64Response) {
			console.error("Invalid callback: Missing response payload.");
			return NextResponse.json(
				{ error: "Invalid callback response" },
				{ status: 400 }
			);
		}

		// --- Signature Verification (No Changes) ---
		const saltKey = process.env.PHONEPE_SALT_KEY;
		const saltIndex = process.env.PHONEPE_SALT_INDEX;
		const receivedXVerify = request.headers.get("x-verify");

		const checksumString = `${base64Response}${saltKey}`;
		const sha256Checksum = crypto
			.createHash("sha256")
			.update(checksumString)
			.digest("hex");
		const calculatedXVerify = `${sha256Checksum}###${saltIndex}`;

		if (receivedXVerify !== calculatedXVerify) {
			console.error("Checksum verification failed!");
			return NextResponse.json(
				{ error: "Checksum verification failed" },
				{ status: 400 }
			);
		}

		// --- Decode the Response and Update Database ---
		const decodedResponse = JSON.parse(
			Buffer.from(base64Response, "base64").toString()
		);

		const { success, code, data } = decodedResponse;
		const { merchantTransactionId, transactionId, amount } = data;

		if (success && code === "PAYMENT_SUCCESS") {
			// --- FIX: Extract userId and matchId from our custom merchantTransactionId ---
			const parts = merchantTransactionId.split("-");
			if (parts.length < 4 || parts[0] !== "SY") {
				console.error(
					"Invalid merchantTransactionId format:",
					merchantTransactionId
				);
				return NextResponse.json(
					{ error: "Invalid transaction ID format." },
					{ status: 400 }
				);
			}

			const userId = parts[1];
			const matchId = parts[2]; // The clerkId of the person who was unlocked

			if (!userId || !matchId) {
				console.error(
					"Could not parse userId or matchId from transaction ID."
				);
				return NextResponse.json(
					{
						error: "Could not identify user or match from the transaction.",
					},
					{ status: 400 }
				);
			}

			// --- Update the database ---
			const client = await clientPromise;
			const db = client.db("seeyou");
			const collection = db.collection<UserProfile>("users");

			await collection.updateOne(
				{ clerkId: userId },
				{
					$addToSet: { revealedMatches: matchId },
					$push: {
						payments: {
							matchId,
							paymentId: transactionId,
							orderId: merchantTransactionId,
							amount: amount / 100, // Convert from paise to rupees
							date: new Date(),
						},
					},
					$set: { updatedAt: new Date() },
				}
			);

			console.log(
				`Successfully updated profile for user ${userId}, revealed match ${matchId}`
			);
		} else {
			console.warn(
				`Payment not successful for ${merchantTransactionId}. Status: ${code}`
			);
		}

		// Respond to PhonePe's server. A redirect here is for the server, not the user.
		return NextResponse.json({
			success: true,
			message: "Callback received",
		});
	} catch (error) {
		console.error("Error in verify callback:", error);
		return NextResponse.json(
			{ error: "Internal server error in verify callback." },
			{ status: 500 }
		);
	}
}

// PhonePe also sends a GET request to the redirect URL with a POST here.
// We only care about the POST from their server (the callback).
export async function GET(request: NextRequest) {
	return NextResponse.redirect(new URL("/matches", request.url));
}
