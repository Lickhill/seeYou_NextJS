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

		// Fetch all users except the current user
		const users = await collection
			.find(
				{ clerkId: { $ne: currentUserId } },
				{
					projection: {
						clerkId: 1,
						name: 1,
						lastName: 1,
						photoUrl: 1,
					},
				}
			)
			.toArray();

		return NextResponse.json({ users });
	} catch (error) {
		console.error("Error fetching users:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { clerkId, name, lastName, phone, instagramId, photoUrl } = body;

		if (!clerkId || !name) {
			return NextResponse.json(
				{ error: "ClerkId and name are required" },
				{ status: 400 }
			);
		}

		const client = await clientPromise;
		const db = client.db("seeyou");
		const collection = db.collection<UserProfile>("users");

		const userProfile: UserProfile = {
			clerkId,
			name,
			lastName: lastName || "",
			phone: phone || "",
			instagramId: instagramId || "",
			photoUrl: photoUrl || "",
			likes: [],
			matches: [],
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		// Check if user already exists
		const existingUser = await collection.findOne({ clerkId });

		if (existingUser) {
			// Update existing user but preserve likes and matches
			await collection.updateOne(
				{ clerkId },
				{
					$set: {
						name: userProfile.name,
						lastName: userProfile.lastName,
						phone: userProfile.phone,
						instagramId: userProfile.instagramId,
						photoUrl: userProfile.photoUrl,
						updatedAt: new Date(),
					},
				}
			);
		} else {
			// Create new user with empty likes and matches arrays
			await collection.insertOne(userProfile);
		}

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Error saving profile:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
