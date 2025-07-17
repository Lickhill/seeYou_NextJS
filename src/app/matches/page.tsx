"use client";

import { useState, useEffect } from "react";
import { useUser, UserButton } from "@clerk/nextjs";
import { UserProfile } from "@/models/User";

export default function MatchesPage() {
	const { user } = useUser();
	const [matches, setMatches] = useState<UserProfile[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (user?.id) {
			fetchMatches();
		}
	}, [user?.id]);

	const fetchMatches = async () => {
		try {
			setLoading(true);
			const response = await fetch(
				`/api/matches?currentUserId=${user?.id}`
			);

			if (!response.ok) {
				throw new Error("Failed to fetch matches");
			}

			const data = await response.json();
			setMatches(data.matches);
		} catch (err) {
			console.error("Error fetching matches:", err);
			setError("Failed to load matches. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
					<p className="text-gray-600">Loading matches...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 flex items-center justify-center">
				<div className="text-center">
					<p className="text-red-600 mb-4">{error}</p>
					<button
						onClick={fetchMatches}
						className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg"
					>
						Try Again
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100">
			{/* Header */}
			<div className="bg-white shadow-sm border-b">
				<div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
					<div>
						<h1 className="text-3xl font-bold text-gray-900">
							💕 Your Matches
						</h1>
						<p className="text-gray-600 mt-1">
							{matches.length}{" "}
							{matches.length === 1 ? "match" : "matches"} found
						</p>
					</div>
					<div className="flex items-center gap-4">
						<a href="/people">
							<button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
								Back to People
							</button>
						</a>
						<UserButton afterSignOutUrl="/" />
					</div>
				</div>
			</div>

			{/* Content */}
			<div className="max-w-7xl mx-auto px-4 py-8">
				{matches.length === 0 ? (
					<div className="text-center py-16">
						<div className="w-24 h-24 bg-pink-200 rounded-full mx-auto mb-4 flex items-center justify-center">
							<span className="text-4xl">💔</span>
						</div>
						<h3 className="text-xl font-semibold text-gray-900 mb-2">
							No matches yet
						</h3>
						<p className="text-gray-600 mb-6">
							Keep liking people to find your perfect matches!
						</p>
						<a href="/people">
							<button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-medium">
								Find People
							</button>
						</a>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{matches.map((match) => (
							<div
								key={match.clerkId}
								className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6"
							>
								{/* Profile Photo */}
								<div className="flex items-center mb-4">
									{match.photoUrl ? (
										<img
											src={match.photoUrl}
											alt={`${match.name}'s profile`}
											className="w-16 h-16 rounded-full object-cover border-4 border-pink-200"
										/>
									) : (
										<div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center">
											<span className="text-white font-bold text-lg">
												{match.name
													.charAt(0)
													.toUpperCase()}
												{match.lastName
													? match.lastName
															.charAt(0)
															.toUpperCase()
													: ""}
											</span>
										</div>
									)}
									<div className="ml-4">
										<h3 className="text-xl font-semibold text-gray-900">
											{match.name} {match.lastName}
										</h3>
										<p className="text-pink-600 font-medium">
											Match! 💕
										</p>
									</div>
								</div>

								{/* Contact Information */}
								<div className="space-y-3">
									{match.phone && (
										<div className="flex items-center">
											<svg
												className="w-5 h-5 text-gray-400 mr-3"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
												/>
											</svg>
											<span className="text-gray-700">
												{match.phone}
											</span>
										</div>
									)}

									{match.instagramId && (
										<div className="flex items-center">
											<svg
												className="w-5 h-5 text-gray-400 mr-3"
												fill="currentColor"
												viewBox="0 0 24 24"
											>
												<path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.621 5.367 11.988 11.988 11.988s11.987-5.367 11.987-11.988C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.348-1.051-2.348-2.348s1.051-2.348 2.348-2.348 2.348 1.051 2.348 2.348-1.051 2.348-2.348 2.348zm7.718 0c-1.297 0-2.348-1.051-2.348-2.348s1.051-2.348 2.348-2.348 2.348 1.051 2.348 2.348-1.051 2.348-2.348 2.348z" />
											</svg>
											<span className="text-gray-700">
												{match.instagramId}
											</span>
										</div>
									)}
								</div>

								{/* Action Buttons */}
								<div className="mt-6 flex gap-2">
									{match.phone && (
										<a
											href={`tel:${match.phone}`}
											className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium text-center transition-colors"
										>
											Call
										</a>
									)}
									{match.instagramId && (
										<a
											href={`https://instagram.com/${match.instagramId.replace(
												"@",
												""
											)}`}
											target="_blank"
											rel="noopener noreferrer"
											className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-medium text-center transition-colors"
										>
											Instagram
										</a>
									)}
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
