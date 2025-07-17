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

				// If it's a match, show modal and update matches count
				if (data.isMatch) {
					const matchedUserData = users.find(
						(u) => u.clerkId === likedUserId
					);
					setMatchedUser(matchedUserData);
					setShowMatchModal(true);
					setMatchesCount((prev) => prev + 1);
				}
			}
		} catch (error) {
			console.error("Error liking user:", error);
			alert("Failed to like user. Please try again.");
		}
	};

	if (loading) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-violet-950 via-purple-900 to-black flex items-center justify-center futuristic-grid">
				<div className="text-center glass-card p-8 rounded-2xl">
					<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-violet-400 mx-auto mb-6 glow-effect"></div>
					<p className="text-violet-300 text-lg font-medium">
						Loading people...
					</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-violet-950 via-purple-900 to-black flex items-center justify-center futuristic-grid">
				<div className="text-center glass-card p-8 rounded-2xl">
					<p className="text-red-400 mb-6">{error}</p>
					<button
						onClick={fetchUsers}
						className="glass-button text-white px-6 py-3 rounded-xl font-medium"
					>
						Try Again
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-violet-950 via-purple-900 to-black flex flex-col">
			{/* Header */}
			<div className="glass-effect border-b border-violet-500/30">
				<div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
					<div className="flex flex-col sm:flex-row items-start gap-6">
						{/* Current User Profile */}
						<div className="flex items-center gap-4">
							{currentUserProfile?.photoUrl ? (
								<div className="w-16 h-16 rounded-full overflow-hidden border-2 border-violet-400 pulse-violet">
									<img
										src={currentUserProfile.photoUrl}
										alt="Your profile"
										className="w-full h-full object-cover"
									/>
								</div>
							) : (
								<div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center pulse-violet">
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
							<div>
								<p className="text-sm font-medium text-white">
									{currentUserProfile?.name}{" "}
									{currentUserProfile?.lastName}
								</p>
								<p className="text-xs text-violet-400 animate-pulse">
									● Online
								</p>
							</div>
						</div>

						{/* Page Title */}
						<div className="mt-1">
							<h1 className="text-2xl md:text-3xl font-bold gradient-text">
								People on SeeYou
							</h1>
							<p className="text-violet-300 mt-1">
								Connect with {users.length} amazing people
							</p>
						</div>
					</div>

					<div className="flex flex-wrap items-center gap-3 mt-2 md:mt-0">
						<a href="/matches" className="relative">
							<button className="glass-button text-white px-4 py-2 rounded-xl font-medium flex items-center gap-2">
								<span>💕</span>
								<span>Matches</span>
							</button>
							{matchesCount > 0 && (
								<span className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-pulse">
									{matchesCount}
								</span>
							)}
						</a>
						<a href="/complete-profile">
							<button className="glass-button text-white px-4 py-2 rounded-xl font-medium flex items-center gap-2">
								<span>✏️</span>
								<span>Update</span>
							</button>
						</a>
						<UserButton
							afterSignOutUrl="/"
							appearance={{
								elements: {
									avatarBox:
										"w-10 h-10 rounded-xl border-2 border-violet-400 hover:border-violet-300 transition-all duration-300",
									userButtonTrigger:
										"hover:scale-110 transition-transform duration-300",
								},
							}}
						/>
					</div>
				</div>
			</div>

			{/* Content */}
			<div className="max-w-7xl mx-auto px-4 py-8 flex-1">
				{users.length === 0 ? (
					<div className="text-center py-16">
						<div className="w-24 h-24 glass-card rounded-full mx-auto mb-4 flex items-center justify-center">
							<svg
								className="w-12 h-12 text-violet-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={1.5}
									d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 715.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
								/>
							</svg>
						</div>
						<h3 className="text-xl font-semibold gradient-text mb-2">
							No people found
						</h3>
						<p className="text-violet-300 max-w-md mx-auto mb-6">
							Be the first to complete your profile and start
							connecting with others in the community!
						</p>
						<a href="/complete-profile">
							<button className="glass-button text-white px-6 py-3 rounded-xl font-medium">
								Complete Your Profile
							</button>
						</a>
					</div>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8">
						{users.map((person) => (
							<div
								key={person.clerkId}
								className="glass-card rounded-2xl hover:scale-105 transition-all duration-300 p-8 text-center"
							>
								{/* Profile Photo */}
								<div className="mb-6">
									{person.photoUrl ? (
										<img
											src={person.photoUrl}
											alt={`${person.name}'s profile`}
											className="w-28 h-28 rounded-full mx-auto object-cover border-3 border-violet-400"
										/>
									) : (
										<div className="w-28 h-28 rounded-full mx-auto bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center">
											<span className="text-white font-bold text-2xl">
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
								<h3 className="font-semibold text-white text-xl mb-4">
									{person.name} {person.lastName}
								</h3>

								{/* Like Button */}
								<button
									onClick={() => handleLike(person.clerkId)}
									disabled={likedUsers.includes(
										person.clerkId
									)}
									className={`w-full py-3 px-6 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
										likedUsers.includes(person.clerkId)
											? "glass-effect text-gray-400 cursor-not-allowed"
											: "bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 hover:from-violet-500 hover:via-purple-500 hover:to-pink-500 text-white hover:scale-105"
									}`}
								>
									{likedUsers.includes(person.clerkId) ? (
										<>
											<span>✅</span>
											<span>Liked</span>
										</>
									) : (
										<>
											<span>❤️</span>
											<span>Like</span>
										</>
									)}
								</button>
							</div>
						))}
					</div>
				)}
			</div>

			{/* Match Modal */}
			{showMatchModal && matchedUser && (
				<div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
					<div className="glass-card rounded-3xl p-8 max-w-md w-full text-center relative overflow-hidden">
						{/* Animated background elements */}
						<div className="absolute -top-20 -left-20 w-40 h-40 bg-violet-600/30 rounded-full blur-xl animate-pulse"></div>
						<div
							className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-600/30 rounded-full blur-xl animate-pulse"
							style={{ animationDelay: "1s" }}
						></div>

						<div className="relative z-10">
							<h2 className="text-3xl font-bold gradient-text mb-6">
								✨ It's a Match! ✨
							</h2>
							<div className="flex justify-center mb-6">
								<div className="relative">
									{/* Current user */}
									{currentUserProfile?.photoUrl ? (
										<img
											src={currentUserProfile.photoUrl}
											alt="Your profile"
											className="w-20 h-20 rounded-full object-cover border-4 border-pink-400"
										/>
									) : (
										<div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-600 to-violet-600 flex items-center justify-center">
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

									{/* Matched user */}
									{matchedUser.photoUrl ? (
										<img
											src={matchedUser.photoUrl}
											alt={matchedUser.name}
											className="w-20 h-20 rounded-full object-cover border-4 border-violet-400 absolute left-16"
										/>
									) : (
										<div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center absolute left-16">
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

									{/* Animated heart */}
									<div className="absolute left-14 top-7 w-8 h-8 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center animate-bounce">
										<span className="text-white">❤️</span>
									</div>
								</div>
							</div>

							<p className="text-xl text-white mb-8">
								You and{" "}
								<span className="gradient-text font-bold">
									{matchedUser.name} {matchedUser.lastName}
								</span>{" "}
								liked each other!
							</p>

							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<button
									onClick={() => setShowMatchModal(false)}
									className="glass-button text-white px-6 py-3 rounded-xl font-medium flex-1"
								>
									Continue Browsing
								</button>
								<a href="/matches">
									<button
										onClick={() => setShowMatchModal(false)}
										className="bg-gradient-to-r from-pink-600 to-violet-600 hover:from-pink-500 hover:to-violet-500 text-white px-6 py-3 rounded-xl font-medium w-full"
									>
										View All Matches
									</button>
								</a>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Footer */}
			<div className="glass-effect border-t border-violet-500/30 py-6 mt-auto">
				<div className="max-w-7xl mx-auto px-4">
					<div className="flex flex-col md:flex-row justify-between items-center">
						<div className="mb-4 md:mb-0">
							<h3 className="text-xl font-bold gradient-text">
								SeeYou
							</h3>
							<p className="text-violet-400 text-sm mt-1">
								Connecting souls since 2024
							</p>
						</div>
						<div className="flex gap-6">
							{[
								"twitter",
								"instagram",
								"facebook",
								"linkedin",
							].map((social) => (
								<a
									key={social}
									href="#"
									className="text-violet-400 hover:text-violet-300 transition-all duration-300 hover:scale-125"
								>
									<span className="text-xl">📱</span>
								</a>
							))}
						</div>
					</div>
					<div className="mt-8 text-center text-violet-500 text-sm">
						<p>© 2024 SeeYou App. All rights reserved.</p>
						<div className="mt-2 flex flex-wrap justify-center gap-4">
							{[
								"Privacy Policy",
								"Terms of Service",
								"Contact Us",
								"Careers",
							].map((link) => (
								<a
									key={link}
									href="#"
									className="hover:text-violet-300 transition-colors"
								>
									{link}
								</a>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
