// File: src/app/api/matches/route.ts

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

		// Get current user's matches and revealedMatches arrays
		const currentUser = await collection.findOne({
			clerkId: currentUserId,
		});

		if (
			!currentUser ||
			!currentUser.matches ||
			!Array.isArray(currentUser.matches)
		) {
			return NextResponse.json({ matches: [] });
		}

		// Correctly access the revealedMatches property
		const revealed: string[] = Array.isArray(currentUser.revealedMatches)
			? currentUser.revealedMatches
			: [];

		// Explicitly type the array
		const alwaysRevealedIds: string[] = [];
		if (currentUser.matches.length > 0) {
			alwaysRevealedIds.push(currentUser.matches[0]);
		}

		// Explicitly type the 'id' parameter in the filter callback
		const revealedIds: string[] = revealed.filter(
			(id: string) => !alwaysRevealedIds.includes(id)
		);

		const toRevealIds = [...alwaysRevealedIds, ...revealedIds];

		if (toRevealIds.length === 0) {
			return NextResponse.json({ matches: [] });
		}

		// Fetch only the revealed matches and the first match
		const matchedUsers = await collection
			.find(
				{ clerkId: { $in: toRevealIds } },
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
