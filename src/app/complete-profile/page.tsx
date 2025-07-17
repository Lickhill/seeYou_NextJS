"use client";

import { useState, useEffect, useCallback } from "react";
import { useUser } from "@clerk/nextjs";
import { CldUploadWidget } from "next-cloudinary";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface CloudinaryResult {
	event: string;
	info: {
		secure_url: string;
	};
}

interface UserProfileData {
	name: string;
	lastName: string;
	phone: string;
	instagramId: string;
	photoUrl: string;
}

export default function CompleteProfile() {
	const { user } = useUser();
	const router = useRouter();
	const [formData, setFormData] = useState<UserProfileData>({
		name: "",
		lastName: "",
		phone: "",
		instagramId: "",
		photoUrl: "",
	});
	const [loading, setLoading] = useState(false);
	const [photoUploading, setPhotoUploading] = useState(false);
	const [fetchingProfile, setFetchingProfile] = useState(true);

	const fetchUserProfile = useCallback(async () => {
		if (!user?.id) return;

		try {
			setFetchingProfile(true);
			const response = await fetch(`/api/user-check?clerkId=${user.id}`);
			const data = await response.json();

			if (data.exists && data.user) {
				setFormData({
					name: data.user.name || "",
					lastName: data.user.lastName || "",
					phone: data.user.phone || "",
					instagramId: data.user.instagramId || "",
					photoUrl: data.user.photoUrl || "",
				});
			}
		} catch (error) {
			console.error("Error fetching user profile:", error);
		} finally {
			setFetchingProfile(false);
		}
	}, [user?.id]);

	useEffect(() => {
		if (user?.id) {
			fetchUserProfile();
		}
	}, [user?.id, fetchUserProfile]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!formData.name.trim()) {
			alert("Name is required");
			return;
		}

		setLoading(true);
		try {
			const response = await fetch("/api/profile", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					clerkId: user?.id,
					...formData,
				}),
			});

			if (response.ok) {
				router.push("/people");
			} else {
				throw new Error("Failed to save profile");
			}
		} catch (error) {
			console.error("Error saving profile:", error);
			alert("Error saving profile. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	if (fetchingProfile) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-violet-950 via-purple-900 to-black py-6 sm:py-12 flex items-center justify-center">
				<div className="text-center glass-card p-8 rounded-2xl">
					<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-violet-400 mx-auto mb-6"></div>
					<p className="text-violet-300 text-lg font-medium">
						Loading your profile...
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-violet-950 via-purple-900 to-black py-6 sm:py-12 flex flex-col">
			<div className="max-w-2xl mx-auto px-4 sm:px-6 flex-1">
				<div className="glass-card p-6 sm:p-8 rounded-2xl">
					<h1 className="text-2xl sm:text-3xl font-bold gradient-text mb-2">
						Complete Your Profile
					</h1>
					<p className="text-violet-400 mb-6 sm:mb-8 text-sm sm:text-base">
						Tell us more about yourself to get started with SeeYou.
					</p>

					<form
						onSubmit={handleSubmit}
						className="space-y-4 sm:space-y-6"
					>
						{/* Photo Upload */}
						<div className="text-center">
							<div className="mb-4">
								{formData.photoUrl ? (
									<Image
										src={formData.photoUrl}
										alt="Profile"
										width={128}
										height={128}
										className="w-24 sm:w-32 h-24 sm:h-32 rounded-full mx-auto object-cover border-4 border-violet-400"
									/>
								) : (
									<div className="w-24 sm:w-32 h-24 sm:h-32 rounded-full mx-auto bg-gradient-to-br from-violet-600 to-purple-800 flex items-center justify-center">
										<svg
											className="w-10 sm:w-12 h-10 sm:h-12 text-gray-300"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
											/>
										</svg>
									</div>
								)}
							</div>
							<CldUploadWidget
								uploadPreset="seeyouprofiles"
								options={{
									folder: "seeyou/profiles",
									maxFileSize: 10000000,
									sources: ["local", "camera"],
									multiple: false,
									resourceType: "image",
								}}
								onSuccess={(result: CloudinaryResult) => {
									setFormData((prev) => ({
										...prev,
										photoUrl: result.info.secure_url,
									}));
									setPhotoUploading(false);
								}}
								onError={(error: Error) => {
									console.error("Upload error:", error);
									setPhotoUploading(false);
									alert("Upload failed. Please try again.");
								}}
							>
								{({ open }) => (
									<button
										type="button"
										onClick={() => {
											setPhotoUploading(true);
											open();
										}}
										disabled={photoUploading}
										className="glass-button text-white px-4 py-2 rounded-xl font-medium transition-all duration-300 disabled:opacity-50 text-sm sm:text-base"
									>
										{photoUploading
											? "Uploading..."
											: "Upload Photo"}
									</button>
								)}
							</CldUploadWidget>
						</div>

						{/* Form Fields */}
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
							{/* Name Field */}
							<div className="sm:col-span-2">
								<label
									htmlFor="name"
									className="block text-sm font-medium text-gray-300 mb-2"
								>
									Name *
								</label>
								<input
									type="text"
									id="name"
									name="name"
									required
									value={formData.name}
									onChange={handleInputChange}
									className="w-full px-3 py-2 sm:py-3 bg-gray-700/50 border border-violet-500/30 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent text-white placeholder-gray-400 text-sm sm:text-base"
									placeholder="Enter your first name"
								/>
							</div>

							{/* Last Name Field */}
							<div className="sm:col-span-2">
								<label
									htmlFor="lastName"
									className="block text-sm font-medium text-gray-300 mb-2"
								>
									Last Name
								</label>
								<input
									type="text"
									id="lastName"
									name="lastName"
									value={formData.lastName}
									onChange={handleInputChange}
									className="w-full px-3 py-2 sm:py-3 bg-gray-700/50 border border-violet-500/30 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent text-white placeholder-gray-400 text-sm sm:text-base"
									placeholder="Enter your last name"
								/>
							</div>

							{/* Phone Field */}
							<div>
								<label
									htmlFor="phone"
									className="block text-sm font-medium text-gray-300 mb-2"
								>
									Phone Number
								</label>
								<input
									type="tel"
									id="phone"
									name="phone"
									value={formData.phone}
									onChange={handleInputChange}
									className="w-full px-3 py-2 sm:py-3 bg-gray-700/50 border border-violet-500/30 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent text-white placeholder-gray-400 text-sm sm:text-base"
									placeholder="Your phone number"
								/>
							</div>

							{/* Instagram ID Field */}
							<div>
								<label
									htmlFor="instagramId"
									className="block text-sm font-medium text-gray-300 mb-2"
								>
									Instagram ID
								</label>
								<input
									type="text"
									id="instagramId"
									name="instagramId"
									value={formData.instagramId}
									onChange={handleInputChange}
									className="w-full px-3 py-2 sm:py-3 bg-gray-700/50 border border-violet-500/30 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent text-white placeholder-gray-400 text-sm sm:text-base"
									placeholder="@username"
								/>
							</div>
						</div>

						{/* Submit Button */}
						<button
							type="submit"
							disabled={loading || !formData.name.trim()}
							className="w-full bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 hover:from-violet-500 hover:via-purple-500 hover:to-pink-500 disabled:from-gray-600 disabled:to-gray-600 text-white py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 text-sm sm:text-base"
						>
							{loading ? "Saving..." : "Update Profile"}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
