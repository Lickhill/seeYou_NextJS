import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { UserProfile } from "@/models/User";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { likerId, likedId } = body;

		if (!likerId || !likedId) {
			return NextResponse.json(
				{ error: "LikerId and likedId are required" },
				{ status: 400 }
			);
		}

		const client = await clientPromise;
		const db = client.db("seeyou");
		const collection = db.collection<UserProfile>("users");

		// Add likedId to liker's likes array
		await collection.updateOne(
			{ clerkId: likerId },
			{
				$addToSet: { likes: likedId },
				$set: { updatedAt: new Date() },
			}
		);

		// Check if the liked user has also liked the liker
		const likedUser = await collection.findOne({ clerkId: likedId });

		let isMatch = false;
		if (likedUser && likedUser.likes && likedUser.likes.includes(likerId)) {
			// It's a match! Add both users to each other's matches
			isMatch = true;

			// Add to liker's matches
			await collection.updateOne(
				{ clerkId: likerId },
				{
					$addToSet: { matches: likedId },
					$set: { updatedAt: new Date() },
				}
			);

			// Add to liked user's matches
			await collection.updateOne(
				{ clerkId: likedId },
				{
					$addToSet: { matches: likerId },
					$set: { updatedAt: new Date() },
				}
			);
		}

		return NextResponse.json({ success: true, isMatch });
	} catch (error) {
		console.error("Error processing like:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
