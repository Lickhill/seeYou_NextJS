"use client";

import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";

export default function Home() {
	const { isLoaded, isSignedIn, user } = useUser();
	const router = useRouter();
	const [checking, setChecking] = useState(false);
	const [hasChecked, setHasChecked] = useState(false);

	const checkUserInDatabase = useCallback(async () => {
		if (!user?.id || checking || hasChecked) return;

		try {
			setChecking(true);
			const response = await fetch(`/api/user-check?clerkId=${user.id}`);
			const data = await response.json();

			if (data.exists) {
				router.push("/people");
			} else {
				router.push("/complete-profile");
			}
		} catch (error) {
			console.error("Error checking user:", error);
		} finally {
			setChecking(false);
			setHasChecked(true);
		}
	}, [user?.id, router, checking, hasChecked]);

	useEffect(() => {
		if (isLoaded && isSignedIn && user?.id && !checking && !hasChecked) {
			checkUserInDatabase();
		}
	}, [
		isLoaded,
		isSignedIn,
		user?.id,
		checkUserInDatabase,
		checking,
		hasChecked,
	]);

	if (!isLoaded || checking) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-violet-950 via-purple-900 to-black flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-violet-400 mx-auto mb-6"></div>
					<p className="text-violet-300 text-lg font-medium">
						Loading...
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
			{/* Navigation */}
			<nav className="px-4 py-4 flex justify-between items-center">
				<div className="text-2xl font-bold text-gray-900">
					See<span className="text-blue-600">You</span>
				</div>
				<div className="flex items-center gap-4">
					{user ? (
						<UserButton afterSignOutUrl="/" />
					) : (
						<>
							<SignInButton mode="modal">
								<button className="text-gray-700 hover:text-gray-900 font-medium">
									Sign In
								</button>
							</SignInButton>
							<SignUpButton mode="modal">
								<button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
									Sign Up
								</button>
							</SignUpButton>
						</>
					)}
				</div>
			</nav>

			{/* Hero Section */}
			<section className="px-4 py-20 text-center">
				<div className="max-w-4xl mx-auto">
					<h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
						See<span className="text-blue-600">You</span>
					</h1>
					<p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
						Connect, meet, and stay in touch with the people who
						matter most to you.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						{user ? (
							<a href="/complete-profile">
								<button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
									Complete Your Profile
								</button>
							</a>
						) : (
							<>
								<SignUpButton mode="modal">
									<button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
										Get Started
									</button>
								</SignUpButton>
								<SignInButton mode="modal">
									<button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 rounded-lg font-semibold transition-colors">
										Sign In
									</button>
								</SignInButton>
							</>
						)}
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="px-4 py-16 bg-white">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
						Why Choose SeeYou?
					</h2>
					<div className="grid md:grid-cols-3 gap-8">
						<div className="text-center p-6">
							<div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
								<svg
									className="w-8 h-8 text-blue-600"
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
								Easy Connections
							</h3>
							<p className="text-gray-600">
								Connect with friends, family, and colleagues
								effortlessly.
							</p>
						</div>
						<div className="text-center p-6">
							<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
								<svg
									className="w-8 h-8 text-green-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
									/>
								</svg>
							</div>
							<h3 className="text-xl font-semibold text-gray-900 mb-2">
								Smart Scheduling
							</h3>
							<p className="text-gray-600">
								Plan meetings and events with intelligent
								scheduling features.
							</p>
						</div>
						<div className="text-center p-6">
							<div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
								<svg
									className="w-8 h-8 text-purple-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
									/>
								</svg>
							</div>
							<h3 className="text-xl font-semibold text-gray-900 mb-2">
								Secure & Private
							</h3>
							<p className="text-gray-600">
								Your connections and data are protected with
								enterprise-grade security.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Call to Action */}
			<section className="px-4 py-16 bg-blue-600">
				<div className="max-w-4xl mx-auto text-center">
					<h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
						Ready to get started?
					</h2>
					<p className="text-blue-100 text-lg mb-8">
						Join thousands of users who are already connecting
						through SeeYou.
					</p>
					{user ? (
						<a href="/complete-profile">
							<button className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-3 rounded-lg font-semibold transition-colors">
								Complete Your Profile
							</button>
						</a>
					) : (
						<SignUpButton mode="modal">
							<button className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-3 rounded-lg font-semibold transition-colors">
								Start Your Journey
							</button>
						</SignUpButton>
					)}
				</div>
			</section>

			{/* Footer */}
			<footer className="px-4 py-8 bg-gray-900 text-center">
				<p className="text-gray-400">
					© 2024 SeeYou. Built with Next.js and Tailwind CSS.
				</p>
			</footer>
		</div>
	);
}
