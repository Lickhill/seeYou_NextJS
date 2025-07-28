"use client";

import { useState, useEffect, useCallback } from "react";
import { useUser, UserButton } from "@clerk/nextjs";
import { UserProfile } from "@/models/User";
import Image from "next/image";
import Script from "next/script";

// --- SVG Icon Components for better reusability ---

const HeartIcon = () => (
	<svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
		<path
			fillRule="evenodd"
			d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
			clipRule="evenodd"
		/>
	</svg>
);

const LockIcon = () => (
	<svg
		className="w-8 h-8 text-white"
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
);

const PhoneIcon = () => (
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
);

const InstagramIcon = () => (
	<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
		<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
	</svg>
);

// --- Reusable UI Components ---

const LoadingSpinner = ({ message }: { message: string }) => (
	<div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-100 p-4">
		<div className="glass-card p-8 rounded-3xl text-center shadow-lg">
			<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-pink-500 mx-auto mb-6"></div>
			<p className="text-pink-600 text-lg font-medium">{message}</p>
		</div>
	</div>
);

const ErrorDisplay = ({
	message,
	onRetry,
}: {
	message: string;
	onRetry: () => void;
}) => (
	<div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-100 p-4">
		<div className="glass-card text-center p-8 rounded-3xl shadow-lg">
			<p className="text-red-500 mb-6 font-medium text-lg">{message}</p>
			<button
				onClick={onRetry}
				className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-md"
			>
				Try Again
			</button>
		</div>
	</div>
);

const NoMatchesDisplay = () => (
	<div className="text-center py-16 sm:py-20">
		<div className="w-32 h-32 glass-card rounded-full mx-auto mb-8 flex items-center justify-center bg-gradient-to-br from-pink-100 to-rose-100 border border-pink-200/50 shadow-lg">
			<span className="text-6xl animate-pulse">💔</span>
		</div>
		<h3 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-4">
			No Matches Yet
		</h3>
		<p className="text-pink-600/80 mb-8 max-w-md mx-auto text-lg leading-relaxed">
			Your perfect match is waiting to be discovered. Keep exploring and
			spreading the love!
		</p>
		<a href="/people">
			<button className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 hover:from-pink-600 hover:via-rose-600 hover:to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl">
				Find Your Match ✨
			</button>
		</a>
	</div>
);

const RevealedMatchCard = ({ match }: { match: UserProfile }) => (
	<div className="glass-card bg-white/50 backdrop-blur-lg border border-pink-200/60 rounded-3xl p-6 sm:p-8 text-center transform hover:scale-105 transition-transform duration-500 hover:shadow-2xl group relative overflow-hidden">
		<div className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md animate-pulse">
			Match! 💕
		</div>

		<div className="relative mb-6">
			{match.photoUrl ? (
				<Image
					src={match.photoUrl}
					alt={`${match.name}'s profile`}
					width={112}
					height={112}
					className="w-28 h-28 rounded-full mx-auto object-cover border-4 border-pink-300 group-hover:border-rose-400 transition-all duration-300 shadow-lg"
				/>
			) : (
				<div className="w-28 h-28 rounded-full mx-auto bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center border-4 border-pink-300 group-hover:border-rose-400 transition-all duration-300 shadow-lg">
					<span className="text-white font-bold text-3xl">
						{match.name.charAt(0).toUpperCase()}
						{match.lastName
							? match.lastName.charAt(0).toUpperCase()
							: ""}
					</span>
				</div>
			)}
		</div>

		<h3 className="text-2xl font-bold text-gray-800 truncate mb-2">
			{match.name} {match.lastName}
		</h3>

		<div className="space-y-4 my-6">
			{match.phone && (
				<div className="flex items-center justify-center gap-3 text-pink-700">
					<div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
						<PhoneIcon />
					</div>
					<span className="font-medium">{match.phone}</span>
				</div>
			)}
			{match.instagramId && (
				<div className="flex items-center justify-center gap-3 text-pink-700">
					<div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
						<InstagramIcon />
					</div>
					<span className="font-medium">{match.instagramId}</span>
				</div>
			)}
		</div>

		<div className="flex flex-col sm:flex-row gap-3">
			{match.phone && (
				<a
					href={`tel:${match.phone}`}
					className="flex-1 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white py-3 px-4 rounded-xl font-semibold text-center transition-all duration-300 transform hover:scale-105 shadow-md"
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
					className="flex-1 bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white py-3 px-4 rounded-xl font-semibold text-center transition-all duration-300 transform hover:scale-105 shadow-md"
				>
					📷 Instagram
				</a>
			)}
		</div>
	</div>
);

const LockedMatchCard = ({
	matchId,
	onUnlock,
	isPaymentLoading,
	isRazorpayLoaded,
}: {
	matchId: string;
	onUnlock: (matchId: string, matchName: string) => void;
	isPaymentLoading: boolean;
	isRazorpayLoaded: boolean;
}) => (
	<div className="relative glass-card bg-white/40 backdrop-blur-md border border-pink-200/50 rounded-3xl p-6 sm:p-8 text-center transform hover:scale-105 transition-transform duration-500 hover:shadow-2xl group flex flex-col justify-center items-center min-h-[380px]">
		<div className="absolute inset-0 bg-gradient-to-br from-pink-500/80 to-purple-600/80 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center z-10 p-6 text-center">
			<div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm shadow-lg">
				<LockIcon />
			</div>
			<h3 className="text-xl font-bold text-white mb-2">
				Reveal This Match
			</h3>
			<p className="text-white/90 mb-6 text-sm">
				Pay ₹29 to see contact details
			</p>
			<button
				onClick={() => onUnlock(matchId, "Your Next Match")}
				disabled={isPaymentLoading || !isRazorpayLoaded}
				className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed border border-white/30 shadow-md w-full max-w-xs"
			>
				{isPaymentLoading ? (
					<span className="flex items-center justify-center">
						<div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
						Processing...
					</span>
				) : !isRazorpayLoaded ? (
					"Loading..."
				) : (
					"💳 Pay ₹29 to Reveal"
				)}
			</button>
		</div>
	</div>
);

// --- Main Page Component ---

export default function MatchesPage() {
	const { user } = useUser();
	const [matches, setMatches] = useState<UserProfile[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [revealedMatches, setRevealedMatches] = useState<string[]>([]);
	const [paymentLoading, setPaymentLoading] = useState<string | null>(null);
	const [razorpayLoaded, setRazorpayLoaded] = useState(false);
	const [allMatchIds, setAllMatchIds] = useState<string[]>([]);

	const fetchMatches = useCallback(async () => {
		if (!user?.id) return;

		try {
			setLoading(true);
			setError(null);
			const [matchesResponse, userCheckResponse] = await Promise.all([
				fetch(`/api/matches?currentUserId=${user.id}`),
				fetch(`/api/user-check?clerkId=${user.id}`),
			]);

			if (!matchesResponse.ok) throw new Error("Failed to fetch matches");
			if (!userCheckResponse.ok)
				throw new Error("Failed to fetch user data");

			const matchesData = await matchesResponse.json();
			const userData = await userCheckResponse.json();

			setMatches(matchesData.matches || []);
			setAllMatchIds(userData.user?.matches || []);
			setRevealedMatches(userData.user?.revealed || []);
		} catch (err: any) {
			console.error("Error fetching data:", err);
			setError(
				err.message || "Failed to load matches. Please try again."
			);
		} finally {
			setLoading(false);
		}
	}, [user?.id]);

	useEffect(() => {
		if (user?.id) {
			fetchMatches();
		}
	}, [user?.id, fetchMatches]);

	const handlePayment = async (matchId: string, matchName: string) => {
		if (!user?.id) {
			alert("User not authenticated. Please sign in again.");
			return;
		}
		if (!razorpayLoaded) {
			alert(
				"Payment system is not ready. Please wait a moment and try again."
			);
			return;
		}
		setPaymentLoading(matchId);

		try {
			const orderResponse = await fetch("/api/payment/create-order", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ amount: 29, currency: "INR", matchId }),
			});

			if (!orderResponse.ok) {
				const errorData = await orderResponse.json();
				throw new Error(
					errorData.error ||
						`HTTP ${orderResponse.status}: Failed to create order`
				);
			}

			const orderData = await orderResponse.json();
			if (!orderData.orderId)
				throw new Error("Order ID not received from server");
			if (typeof window === "undefined" || !(window as any).Razorpay)
				throw new Error("Razorpay script not loaded.");

			const options = {
				key: orderData.key,
				amount: orderData.amount,
				currency: orderData.currency,
				name: "SeeYou",
				description: `Reveal your match`,
				order_id: orderData.orderId,
				handler: async (response: any) => {
					try {
						const verifyResponse = await fetch(
							"/api/payment/verify",
							{
								method: "POST",
								headers: { "Content-Type": "application/json" },
								body: JSON.stringify({
									orderId: response.razorpay_order_id,
									paymentId: response.razorpay_payment_id,
									signature: response.razorpay_signature,
									userId: user.id,
									matchId: matchId,
								}),
							}
						);

						const verifyData = await verifyResponse.json();
						if (verifyResponse.ok && verifyData.success) {
							await handlePaymentSuccess(matchId);
							alert(
								"Payment successful! Your match is now revealed!"
							);
						} else {
							throw new Error(
								verifyData.error ||
									"Payment verification failed"
							);
						}
					} catch (error: any) {
						console.error("Payment verification error:", error);
						alert(
							`Verification Failed: ${error.message}. Please contact support.`
						);
					} finally {
						setPaymentLoading(null);
					}
				},
				prefill: {
					name: user.fullName || "Valued User",
					email: user.emailAddresses[0]?.emailAddress || "",
				},
				theme: { color: "#8b5cf6" },
				modal: {
					ondismiss: () => setPaymentLoading(null),
				},
			};

			const rzp = new (window as any).Razorpay(options);
			rzp.open();
		} catch (error: any) {
			console.error("Payment initiation error:", error);
			alert(`Payment Failed: ${error.message}`);
			setPaymentLoading(null);
		}
	};

	const handlePaymentSuccess = async (matchId: string) => {
		try {
			await fetch("/api/profile", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					clerkId: user?.id,
					revealMatchId: matchId,
				}),
			});
			await fetchMatches(); // Refetch all data to update the UI
		} catch (err) {
			console.error("Error updating revealed matches:", err);
			setError(
				"Could not update your matches after payment. Please refresh."
			);
		}
	};

	if (loading) return <LoadingSpinner message="Finding your soulmates..." />;
	if (error) return <ErrorDisplay message={error} onRetry={fetchMatches} />;

	return (
		<>
			<Script
				id="razorpay-checkout-js"
				src="https://checkout.razorpay.com/v1/checkout.js"
				onLoad={() => setRazorpayLoaded(true)}
				onError={() => {
					console.error("Failed to load Razorpay script");
					setRazorpayLoaded(false);
					setError(
						"Could not load the payment system. Please refresh the page."
					);
				}}
			/>
			<div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-100 flex flex-col">
				{/* Header */}
				<header className="sticky top-0 z-30 glass-effect border-b border-pink-200/50 backdrop-blur-md">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
						<div className="flex justify-between items-center">
							<div className="text-left">
								<h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 bg-clip-text text-transparent">
									Your Matches
								</h1>
								<p className="text-pink-600/80 text-sm sm:text-base font-light">
									{allMatchIds.length} potential connections
									found
								</p>
							</div>
							<div className="flex items-center gap-2 sm:gap-4">
								<a href="/people">
									<button className="glass-button bg-white/40 backdrop-blur-sm border border-pink-200/50 text-pink-700 hover:bg-pink-50/50 px-3 sm:px-5 py-2 rounded-xl sm:rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 text-sm sm:text-base">
										Back
									</button>
								</a>
								<UserButton afterSignOutUrl="/" />
							</div>
						</div>
					</div>
				</header>

				{/* Main Content */}
				<main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-1">
					{allMatchIds.length === 0 ? (
						<NoMatchesDisplay />
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
							{allMatchIds.map((matchId, index) => {
								const match = matches.find(
									(m) => m.clerkId === matchId
								);
								const isFirstMatch = index === 0;
								const isRevealed =
									isFirstMatch ||
									revealedMatches.includes(matchId);

								if (isRevealed && match) {
									return (
										<RevealedMatchCard
											key={match.clerkId}
											match={match}
										/>
									);
								} else {
									return (
										<LockedMatchCard
											key={matchId}
											matchId={matchId}
											onUnlock={handlePayment}
											isPaymentLoading={
												paymentLoading === matchId
											}
											isRazorpayLoaded={razorpayLoaded}
										/>
									);
								}
							})}
						</div>
					)}
				</main>

				{/* Footer */}
				<footer className="glass-effect border-t border-pink-200/50 backdrop-blur-md py-6 mt-auto">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center">
							<h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-1">
								SeeYou
							</h3>
							<p className="text-pink-600/70 font-light text-sm sm:text-base">
								Where hearts connect and love stories begin ✨
							</p>
						</div>
					</div>
				</footer>
			</div>
		</>
	);
}
