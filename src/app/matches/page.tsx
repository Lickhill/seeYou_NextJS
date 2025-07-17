"use client";

import { useState, useEffect, useCallback } from "react";
import { useUser, UserButton } from "@clerk/nextjs";
import { UserProfile } from "@/models/User";
import Image from "next/image";

export default function MatchesPage() {
	const { user } = useUser();
	const [matches, setMatches] = useState<UserProfile[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchMatches = useCallback(async () => {
		if (!user?.id) return;

		try {
			setLoading(true);
			const response = await fetch(
				`/api/matches?currentUserId=${user.id}`
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
	}, [user?.id]);

	useEffect(() => {
		if (user?.id) {
			fetchMatches();
		}
	}, [user?.id, fetchMatches]);

	if (loading) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-100 flex items-center justify-center">
				<div className="text-center glass-card p-8 rounded-3xl">
					<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-pink-500 mx-auto mb-6"></div>
					<p className="text-pink-600 text-lg font-medium">
						Finding your matches...
					</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-100 flex items-center justify-center">
				<div className="text-center glass-card p-8 rounded-3xl">
					<p className="text-red-500 mb-6 font-medium">{error}</p>
					<button
						onClick={fetchMatches}
						className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105"
					>
						Try Again
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-100 flex flex-col">
			{/* Header */}
			<div className="glass-effect border-b border-pink-200/50 backdrop-blur-md">
				<div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
					<div className="text-center md:text-left">
						<h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 bg-clip-text text-transparent mb-2">
							💕 Your Matches
						</h1>
						<p className="text-pink-600/70 text-lg font-light">
							{matches.length}{" "}
							{matches.length === 1 ? "soul" : "souls"} connected
							with yours
						</p>
					</div>
					<div className="flex items-center gap-4">
						<a href="/people">
							<button className="glass-button bg-white/30 backdrop-blur-sm border border-pink-200/50 text-pink-700 hover:bg-pink-50/50 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105">
								← Back to People
							</button>
						</a>
						<UserButton afterSignOutUrl="/" />
					</div>
				</div>
			</div>

			{/* Content */}
			<div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 flex-1">
				{matches.length === 0 ? (
					<div className="text-center py-20">
						<div className="w-32 h-32 glass-card rounded-full mx-auto mb-8 flex items-center justify-center bg-gradient-to-br from-pink-100 to-rose-100 border border-pink-200/50">
							<span className="text-6xl">💔</span>
						</div>
						<h3 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-4">
							No matches yet
						</h3>
						<p className="text-pink-600/70 mb-8 max-w-md mx-auto text-lg leading-relaxed">
							Your perfect match is waiting to be discovered. Keep
							spreading the love!
						</p>
						<a href="/people">
							<button className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 hover:from-pink-600 hover:via-rose-600 hover:to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
								Find Your Match ✨
							</button>
						</a>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{matches.map((match) => (
							<div
								key={match.clerkId}
								className="glass-card bg-white/40 backdrop-blur-md border border-pink-200/50 rounded-3xl p-8 text-center hover:scale-105 transition-all duration-500 hover:shadow-xl group"
							>
								{/* Match Header */}
								<div className="relative mb-6">
									<div className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
										Match! 💕
									</div>

									{/* Profile Photo */}
									{match.photoUrl ? (
										<Image
											src={match.photoUrl}
											alt={`${match.name}&apos;s profile`}
											width={96}
											height={96}
											className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-pink-300 group-hover:border-rose-300 transition-all duration-300"
										/>
									) : (
										<div className="w-24 h-24 rounded-full mx-auto bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center border-4 border-pink-300 group-hover:border-rose-300 transition-all duration-300">
											<span className="text-white font-bold text-2xl">
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
								</div>

								{/* Name */}
								<h3 className="text-2xl font-bold text-gray-800 mb-6">
									{match.name} {match.lastName}
								</h3>

								{/* Contact Information */}
								<div className="space-y-4 mb-8">
									{match.phone && (
										<div className="flex items-center justify-center gap-3 text-pink-700">
											<div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
												<svg
													className="w-5 h-5"
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
											</div>
											<span className="font-medium">
												{match.phone}
											</span>
										</div>
									)}

									{match.instagramId && (
										<div className="flex items-center justify-center gap-3 text-pink-700">
											<div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
												<svg
													className="w-5 h-5"
													fill="currentColor"
													viewBox="0 0 24 24"
												>
													<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
												</svg>
											</div>
											<span className="font-medium">
												{match.instagramId}
											</span>
										</div>
									)}
								</div>

								{/* Action Buttons */}
								<div className="flex gap-3">
									{match.phone && (
										<a
											href={`tel:${match.phone}`}
											className="flex-1 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white py-3 px-4 rounded-2xl font-semibold text-center transition-all duration-300 transform hover:scale-105"
										>
											📞 Call
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
											className="flex-1 bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white py-3 px-4 rounded-2xl font-semibold text-center transition-all duration-300 transform hover:scale-105"
										>
											📷 Instagram
										</a>
									)}
								</div>
							</div>
						))}
					</div>
				)}
			</div>

			{/* Footer */}
			<div className="glass-effect border-t border-pink-200/50 backdrop-blur-md py-8 mt-auto">
				<div className="max-w-7xl mx-auto px-6 lg:px-8">
					<div className="text-center">
						<h3 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-2">
							SeeYou
						</h3>
						<p className="text-pink-600/70 font-light">
							Where hearts connect and love stories begin ✨
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
