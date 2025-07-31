import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { UserProfile } from "@/models/User";

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const clerkId = searchParams.get("clerkId");

		if (!clerkId) {
			return NextResponse.json(
				{ error: "ClerkId is required" },
				{ status: 400 }
			);
		}

		const client = await clientPromise;
		const db = client.db("seeyou");
		const collection = db.collection<UserProfile>("users");

		const user = await collection.findOne({ clerkId });

		return NextResponse.json({
			exists: !!user,
			user: user
				? {
						name: user.name,
						lastName: user.lastName,
						photoUrl: user.photoUrl,
						phone: user.phone,
						instagramId: user.instagramId,
						likes: user.likes || [],
						matches: user.matches || [],
						revealed: user.revealedMatches || [],
				  }
				: null,
		});
	} catch (error) {
		console.error("Error checking user:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
