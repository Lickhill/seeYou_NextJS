// File: src/app/api/payment/verify/route.ts

import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import clientPromise from "@/lib/mongodb";
import { UserProfile } from "@/models/User"; // Import UserProfile to ensure types are correct

export async function POST(request: NextRequest) {
	try {
		const { orderId, paymentId, signature, userId, matchId } =
			await request.json();

		if (!orderId || !paymentId || !signature || !userId || !matchId) {
			return NextResponse.json(
				{ error: "Missing required payment details" },
				{ status: 400 }
			);
		}

		// Verify payment signature
		const hmac = crypto.createHmac(
			"sha256",
			process.env.RAZORPAY_KEY_SECRET!
		);
		hmac.update(`${orderId}|${paymentId}`);
		const generatedSignature = hmac.digest("hex");

		if (generatedSignature !== signature) {
			return NextResponse.json(
				{ error: "Payment verification failed" },
				{ status: 400 }
			);
		}

		// Update user's revealed matches in database
		const client = await clientPromise;
		const db = client.db("seeyou");
		const collection = db.collection<UserProfile>("users"); // Use UserProfile type here

		await collection.updateOne(
			{ clerkId: userId },
			{
				$addToSet: { revealedMatches: matchId },
				// CORRECTED: The $push operator needs to be on the same level as other operators
				$push: {
					payments: {
						matchId,
						paymentId,
						orderId,
						amount: 29,
						date: new Date(),
					},
				},
				$set: { updatedAt: new Date() },
			},
			{ upsert: true }
		);

		return NextResponse.json({
			success: true,
			message: "Payment verified successfully",
		});
	} catch (error) {
		console.error("Error verifying payment:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
