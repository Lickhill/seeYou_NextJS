"use client";

import { useState, useEffect } from "react";
import { useUser, UserButton } from "@clerk/nextjs";
import { UserProfile } from "@/models/User";

export default function PeoplePage() {
	const { user } = useUser();
	const [users, setUsers] = useState<UserProfile[]>([]);
	const [currentUserProfile, setCurrentUserProfile] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [likedUsers, setLikedUsers] = useState<string[]>([]);
	const [showMatchModal, setShowMatchModal] = useState(false);
	const [matchedUser, setMatchedUser] = useState<any>(null);
	const [matchesCount, setMatchesCount] = useState(0);

	useEffect(() => {
		if (user?.id) {
			fetchUsers();
			fetchCurrentUserProfile();
		}
	}, [user?.id]);

	const fetchCurrentUserProfile = async () => {
		try {
			const response = await fetch(`/api/user-check?clerkId=${user?.id}`);
			const data = await response.json();
			if (data.user) {
				setCurrentUserProfile(data.user);
				setLikedUsers(data.user.likes || []);
				setMatchesCount(data.user.matches?.length || 0);
			}
		} catch (err) {
			console.error("Error fetching current user profile:", err);
		}
	};

	const fetchUsers = async () => {
		try {
			setLoading(true);
			const response = await fetch(
				`/api/profile?currentUserId=${user?.id}`
			);

			if (!response.ok) {
				throw new Error("Failed to fetch users");
			}

			const data = await response.json();
			setUsers(data.users);
		} catch (err) {
			console.error("Error fetching users:", err);
			setError("Failed to load people. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	const handleLike = async (likedUserId: string) => {
		try {
			const response = await fetch("/api/like", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					likerId: user?.id,
					likedId: likedUserId,
				}),
			});

			const data = await response.json();

			if (data.success) {
				// Update local liked users state
				setLikedUsers((prev) => [...prev, likedUserId]);

				// If it's a match, show modal
				if (data.isMatch) {
					const matchedUserData = users.find(
						(u) => u.clerkId === likedUserId
					);
					setMatchedUser(matchedUserData);
					setShowMatchModal(true);
				}
			}
		} catch (error) {
			console.error("Error liking user:", error);
			alert("Failed to like user. Please try again.");
		}
	};

	if (loading) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
					<p className="text-gray-600">Loading people...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
				<div className="text-center">
					<p className="text-red-600 mb-4">{error}</p>
					<button
						onClick={fetchUsers}
						className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
					>
						Try Again
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
			{/* Header */}
			<div className="bg-white shadow-sm border-b">
				<div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-start">
					<div className="flex items-start gap-6">
						{/* Current User Profile */}
						<div className="text-center">
							{currentUserProfile?.photoUrl ? (
								<div className="w-20 h-20 rounded-full overflow-hidden border-4 border-blue-200 mb-2">
									<img
										src={currentUserProfile.photoUrl}
										alt="Your profile"
										className="w-full h-full object-cover"
									/>
								</div>
							) : (
								<div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center mb-2">
									<span className="text-white font-bold text-xl">
										{currentUserProfile?.name
											?.charAt(0)
											.toUpperCase()}
										{currentUserProfile?.lastName
											?.charAt(0)
											.toUpperCase()}
									</span>
								</div>
							)}
							<p className="text-sm font-medium text-gray-900">
								{currentUserProfile?.name}{" "}
								{currentUserProfile?.lastName}
							</p>
						</div>

						{/* Page Title */}
						<div className="mt-2">
							<h1 className="text-3xl font-bold text-gray-900">
								People on SeeYou
							</h1>
							<p className="text-gray-600 mt-1">
								Connect with {users.length} amazing people
							</p>
						</div>
					</div>

					<div className="flex items-center gap-4">
						<a href="/matches" className="relative">
							<button className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
								Matches
							</button>
							{matchesCount > 0 && (
								<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
									{matchesCount}
								</span>
							)}
						</a>
						<a href="/complete-profile">
							<button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
								Update Profile
							</button>
						</a>
						<UserButton afterSignOutUrl="/" />
					</div>
				</div>
			</div>

			{/* Content */}
			<div className="max-w-7xl mx-auto px-4 py-8">
				{users.length === 0 ? (
					<div className="text-center py-16">
						<div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
							<svg
								className="w-12 h-12 text-gray-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
								/>
							</svg>
						</div>
						<h3 className="text-xl font-semibold text-gray-900 mb-2">
							No people found
						</h3>
						<p className="text-gray-600">
							Be the first to complete your profile and start
							connecting!
						</p>
					</div>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
						{users.map((person) => (
							<div
								key={person.clerkId}
								className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 text-center"
							>
								{/* Profile Photo */}
								<div className="mb-4">
									{person.photoUrl ? (
										<img
											src={person.photoUrl}
											alt={`${person.name}'s profile`}
											className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-blue-100"
										/>
									) : (
										<div className="w-20 h-20 rounded-full mx-auto bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
											<span className="text-white font-bold text-xl">
												{person.name
													.charAt(0)
													.toUpperCase()}
												{person.lastName
													? person.lastName
															.charAt(0)
															.toUpperCase()
													: ""}
											</span>
										</div>
									)}
								</div>

								{/* Name */}
								<h3 className="font-semibold text-gray-900 text-lg mb-1">
									{person.name} {person.lastName}
								</h3>

								{/* Like Button */}
								<button
									onClick={() => handleLike(person.clerkId)}
									disabled={likedUsers.includes(
										person.clerkId
									)}
									className={`w-full py-2 px-4 rounded-lg font-medium transition-colors mt-3 ${
										likedUsers.includes(person.clerkId)
											? "bg-gray-400 text-white cursor-not-allowed"
											: "bg-blue-600 hover:bg-blue-700 text-white"
									}`}
								>
									{likedUsers.includes(person.clerkId)
										? "Liked"
										: "Like"}
								</button>
							</div>
						))}
					</div>
				)}
			</div>

			{/* Match Modal */}
			{showMatchModal && matchedUser && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white rounded-lg p-8 max-w-md mx-4 text-center">
						<h2 className="text-2xl font-bold text-pink-600 mb-4">
							🎉 It's a Match! 🎉
						</h2>
						<div className="mb-4">
							{matchedUser.photoUrl ? (
								<img
									src={matchedUser.photoUrl}
									alt={matchedUser.name}
									className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-pink-200"
								/>
							) : (
								<div className="w-20 h-20 rounded-full mx-auto bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center">
									<span className="text-white font-bold text-xl">
										{matchedUser.name
											.charAt(0)
											.toUpperCase()}
										{matchedUser.lastName
											?.charAt(0)
											.toUpperCase()}
									</span>
								</div>
							)}
						</div>
						<p className="text-lg mb-6">
							You and{" "}
							<strong>
								{matchedUser.name} {matchedUser.lastName}
							</strong>{" "}
							liked each other!
						</p>
						<button
							onClick={() => setShowMatchModal(false)}
							className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-lg font-medium"
						>
							Continue
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
