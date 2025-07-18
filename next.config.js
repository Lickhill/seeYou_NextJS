/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["res.cloudinary.com"],
	},
	// Remove CSP for development - uncomment for production
	// async headers() {
	//   return [
	//     {
	//       source: '/(.*)',
	//       headers: [
	//         {
	//           key: 'Content-Security-Policy',
	//           value: "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://widget.cloudinary.com https://cdnjs.cloudflare.com https://*.clerk.accounts.dev https://*.clerk.dev https://clerk.com https://js.clerk.dev; object-src 'none'; connect-src 'self' https://*.clerk.accounts.dev https://*.clerk.dev https://clerk.com https://api.clerk.dev;"
	//         }
	//       ]
	//     }
	//   ]
	// }
};

module.exports = nextConfig;
