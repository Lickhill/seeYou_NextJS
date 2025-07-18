// "use client";

// import { CldUploadWidget } from "next-cloudinary";

// interface CloudinaryResult {
// 	event?: string;
// 	info?: {
// 		secure_url: string;
// 	};
// }

// export default function TestCloudinary() {
// 	return (
// 		<div className="p-8">
// 			<h1>Test Cloudinary Upload</h1>
// 			<p>Cloud Name: {process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}</p>

// 			<CldUploadWidget
// 				uploadPreset="seeyouprofiles"
// 				options={{
// 					clientAllowedFormats: ["jpg", "jpeg", "png", "gif", "webp"],
// 					maxFileSize: 10000000,
// 					showAdvancedOptions: false,
// 					showCompletedButton: true,
// 					showUploadMoreButton: false,
// 				}}
// 				onSuccess={(result: CloudinaryResult) => {
// 					console.log("Success:", result);
// 					if (result.info?.secure_url) {
// 						alert("Upload successful!");
// 					}
// 				}}
// 				onError={(error: Error) => {
// 					console.error("Error:", error);
// 					alert("Upload failed: " + error.message);
// 				}}
// 			>
// 				{({ open }) => (
// 					<button
// 						onClick={() => open()}
// 						className="bg-blue-500 text-white p-2 rounded"
// 					>
// 						Test Upload
// 					</button>
// 				)}
// 			</CldUploadWidget>
// 		</div>
// 	);
// }

// // This file can be deleted or moved to prevent deployment issues
