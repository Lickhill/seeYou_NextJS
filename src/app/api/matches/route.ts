import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { UserProfile } from "@/models/User";

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const currentUserId = searchParams.get("currentUserId");

		if (!currentUserId) {
			return NextResponse.json(
				{ error: "Current user ID is required" },
				{ status: 400 }
			);
		}

		const client = await clientPromise;
		const db = client.db("seeyou");
		const collection = db.collection<UserProfile>("users");

		// Get current user's matches array
		const currentUser = await collection.findOne({
			clerkId: currentUserId,
		});

		if (!currentUser || !currentUser.matches) {
			return NextResponse.json({ matches: [] });
		}

		// Fetch full profile details of matched users
		const matchedUsers = await collection
			.find(
				{ clerkId: { $in: currentUser.matches } },
				{
					projection: {
						clerkId: 1,
						name: 1,
						lastName: 1,
						photoUrl: 1,
						phone: 1,
						instagramId: 1,
					},
				}
			)
			.toArray();

		return NextResponse.json({ matches: matchedUsers });
	} catch (error) {
		console.error("Error fetching matches:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
