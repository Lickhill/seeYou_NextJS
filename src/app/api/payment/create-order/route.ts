// File: src/app/api/payment/create-order/route.ts

import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

// Define a type for the expected Razorpay error structure for better type safety.
interface RazorpayError {
	error?: {
		description?: string;
	};
	message?: string;
}

export async function POST(request: NextRequest) {
	// --- Enhanced Debugging ---
	// This will show in your terminal. If you see "MISSING", your .env.local file is not working.
	console.log("--- Checking Environment Variables ---");
	console.log(
		"RAZORPAY_KEY_ID:",
		process.env.RAZORPAY_KEY_ID ? "Loaded" : "MISSING"
	);
	console.log(
		"RAZORPAY_KEY_SECRET:",
		process.env.RAZORPAY_KEY_SECRET ? "Loaded" : "MISSING"
	);
	console.log("------------------------------------");

	const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
	const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

	if (!razorpayKeyId || !razorpayKeySecret) {
		console.error(
			"CRITICAL: Razorpay API keys are not set in environment variables."
		);
		return NextResponse.json(
			{
				error: "Payment gateway is not configured. API keys are missing on the server.",
			},
			{ status: 500 }
		);
	}

	try {
		// Initialize Razorpay inside the try block to catch any initialization errors
		const razorpay = new Razorpay({
			key_id: razorpayKeyId,
			key_secret: razorpayKeySecret,
		});

		const { amount, currency } = await request.json();

		if (amount == null || currency == null) {
			return NextResponse.json(
				{ error: "Amount and currency are required." },
				{ status: 400 }
			);
		}

		const options = {
			amount: amount * 100, // Amount in the smallest currency unit (e.g., paise for INR)
			currency: currency.toUpperCase(),
			receipt: `receipt_order_${new Date().getTime()}`,
		};

		console.log("Creating Razorpay order with options:", options);

		const order = await razorpay.orders.create(options);
		console.log("Razorpay order created successfully:", order);

		if (!order) {
			console.error(
				"Razorpay order creation returned null or undefined."
			);
			return NextResponse.json(
				{
					error: "Failed to create order with Razorpay. The response was empty.",
				},
				{ status: 500 }
			);
		}

		return NextResponse.json({
			orderId: order.id,
			currency: order.currency,
			amount: order.amount,
			key: razorpayKeyId,
		});
	} catch (error: unknown) {
		// Changed 'any' to 'unknown' for better type safety
		// --- This is the most important part for debugging ---
		console.error("--- FULL ERROR OBJECT FROM RAZORPAY ---");
		console.error(error);
		console.error("---------------------------------------");

		// Type guard to safely access nested properties
		const razorpayError = error as RazorpayError;

		// Razorpay often nests the real error description. Let's log it if it exists.
		if (razorpayError.error?.description) {
			console.error(
				"Razorpay Error Description:",
				razorpayError.error.description
			);
		}

		const errorMessage =
			razorpayError.error?.description ||
			razorpayError.message ||
			"An unknown error occurred on the server.";

		return NextResponse.json(
			{
				error: `Internal server error: ${errorMessage}`,
				details: error, // Send the full error details to the client for inspection
			},
			{ status: 500 }
		);
	}
}
