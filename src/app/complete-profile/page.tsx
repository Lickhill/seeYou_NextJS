"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { CldUploadWidget } from "next-cloudinary";
import { useRouter } from "next/navigation";

export default function CompleteProfile() {
	const { user } = useUser();
	const router = useRouter();
	const [formData, setFormData] = useState({
		name: "",
		lastName: "",
		phone: "",
		instagramId: "",
		photoUrl: "",
	});
	const [loading, setLoading] = useState(false);
	const [photoUploading, setPhotoUploading] = useState(false);

	useEffect(() => {
		if (user?.id) {
			fetchUserProfile();
		}
	}, [user?.id]);

	const fetchUserProfile = async () => {
		try {
			const response = await fetch(`/api/user-check?clerkId=${user?.id}`);
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
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handlePhotoUpload = (result: any) => {
		console.log("Upload result:", result); // Add this for debugging
		if (result.event === "success") {
			setFormData((prev) => ({
				...prev,
				photoUrl: result.info.secure_url,
			}));
			setPhotoUploading(false);
		}
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

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
			<div className="max-w-2xl mx-auto px-4">
				<div className="bg-white rounded-lg shadow-lg p-8">
					<h1 className="text-3xl font-bold text-gray-900 mb-2">
						Complete Your Profile
					</h1>
					<p className="text-gray-600 mb-8">
						Tell us more about yourself to get started with SeeYou.
					</p>

					<form onSubmit={handleSubmit} className="space-y-6">
						{/* Photo Upload */}
						<div className="text-center">
							<div className="mb-4">
								{formData.photoUrl ? (
									<img
										src={formData.photoUrl}
										alt="Profile"
										className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-blue-100"
									/>
								) : (
									<div className="w-32 h-32 rounded-full mx-auto bg-gray-200 flex items-center justify-center">
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
								onSuccess={(result: any) => {
									console.log("Upload success:", result);
									setFormData((prev) => ({
										...prev,
										photoUrl: result.info.secure_url,
									}));
									setPhotoUploading(false);
								}}
								onError={(error: any) => {
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
										className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
									>
										{photoUploading
											? "Uploading..."
											: "Upload Photo"}
									</button>
								)}
							</CldUploadWidget>
						</div>

						{/* Name Field */}
						<div>
							<label
								htmlFor="name"
								className="block text-sm font-medium text-gray-700 mb-2"
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
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								placeholder="Enter your first name"
							/>
						</div>

						{/* Last Name Field */}
						<div>
							<label
								htmlFor="lastName"
								className="block text-sm font-medium text-gray-700 mb-2"
							>
								Last Name
							</label>
							<input
								type="text"
								id="lastName"
								name="lastName"
								value={formData.lastName}
								onChange={handleInputChange}
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								placeholder="Enter your last name"
							/>
						</div>

						{/* Phone Field */}
						<div>
							<label
								htmlFor="phone"
								className="block text-sm font-medium text-gray-700 mb-2"
							>
								Phone Number
							</label>
							<input
								type="tel"
								id="phone"
								name="phone"
								value={formData.phone}
								onChange={handleInputChange}
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								placeholder="Enter your phone number"
							/>
						</div>

						{/* Instagram ID Field */}
						<div>
							<label
								htmlFor="instagramId"
								className="block text-sm font-medium text-gray-700 mb-2"
							>
								Instagram ID
							</label>
							<input
								type="text"
								id="instagramId"
								name="instagramId"
								value={formData.instagramId}
								onChange={handleInputChange}
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								placeholder="@username"
							/>
						</div>

						{/* Submit Button */}
						<button
							type="submit"
							disabled={loading || !formData.name.trim()}
							className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition-colors"
						>
							{loading ? "Saving..." : "Complete Profile"}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
