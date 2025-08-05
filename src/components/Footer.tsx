import React from "react";
import Link from "next/link";

export default function Footer() {
	return (
		<footer className="glass-effect border-t border-violet-500/30 bg-gradient-to-br from-violet-950/80 via-purple-900/80 to-black/80 text-white backdrop-blur-md">
			<div className="max-w-7xl mx-auto px-4 py-12">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{/* Brand Section */}
					<div className="space-y-4">
						<h3 className="text-2xl font-bold gradient-text">
							SeeYou
						</h3>
						<p className="text-violet-200">
							Find your perfect match and create meaningful
							connections. Your date is just a swipe away.
						</p>
						<div className="flex space-x-4">
							<a
								href="#"
								className="text-violet-300 hover:text-white transition-colors"
							>
								<svg
									className="w-6 h-6"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
								</svg>
							</a>
							<a
								href="#"
								className="text-violet-300 hover:text-white transition-colors"
							>
								<svg
									className="w-6 h-6"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
								</svg>
							</a>
							<a
								href="#"
								className="text-violet-300 hover:text-white transition-colors"
							>
								<svg
									className="w-6 h-6"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z" />
								</svg>
							</a>
							<a
								href="#"
								className="text-violet-300 hover:text-white transition-colors"
							>
								<svg
									className="w-6 h-6"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M12.544 12.168c.77.001 1.393.623 1.394 1.393v5.858c0 .77-.623 1.394-1.393 1.394H5.687c-.77 0-1.394-.623-1.394-1.393V12.56c0-.77.623-1.394 1.393-1.394h6.857zm-3.428-8.88a5.585 5.585 0 1 1 0 11.17 5.585 5.585 0 0 1 0-11.17zm0 2.233a3.352 3.352 0 1 0 0 6.704 3.352 3.352 0 0 0 0-6.704zm5.596-.436a1.31 1.31 0 1 1 0 2.62 1.31 1.31 0 0 1 0-2.62z" />
								</svg>
							</a>
						</div>
					</div>

					{/* Support Links */}
					<div className="space-y-4">
						<h4 className="text-lg font-semibold text-violet-200">
							Support
						</h4>
						<ul className="space-y-2">
							<li>
								<Link
									href="/contact-us"
									className="text-violet-300 hover:text-white transition-colors"
								>
									Contact Us
								</Link>
							</li>
						</ul>
					</div>

					{/* Legal Links */}
					<div className="space-y-4">
						<h4 className="text-lg font-semibold text-violet-200">
							Legal
						</h4>
						<ul className="space-y-2">
							<li>
								<Link
									href="/privacy-policy"
									className="text-violet-300 hover:text-white transition-colors"
								>
									Privacy Policy
								</Link>
							</li>
							<li>
								<Link
									href="/terms-and-conditions"
									className="text-violet-300 hover:text-white transition-colors"
								>
									Terms & Conditions
								</Link>
							</li>
							<li>
								<Link
									href="/cancellation-refund"
									className="text-violet-300 hover:text-white transition-colors"
								>
									Cancellation & Refund
								</Link>
							</li>
							<li>
								<Link
									href="/shipping-policy"
									className="text-violet-300 hover:text-white transition-colors"
								>
									Shipping Policy
								</Link>
							</li>
						</ul>
					</div>
				</div>

				{/* Bottom Section */}
				<div className="border-t border-violet-500/30 mt-12 pt-8">
					<div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
						<div className="text-violet-300">
							<p>&copy; 2024 SeeYou. All rights reserved.</p>
						</div>

						<div className="flex items-center space-x-6">
							<div className="flex items-center space-x-2 text-violet-300">
								<svg
									className="w-5 h-5"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
								</svg>
								<span className="text-sm">Safe & Secure</span>
							</div>

							<div className="flex items-center space-x-2 text-violet-300">
								<svg
									className="w-5 h-5"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M12 1l3.09 6.26L22 9l-5 4.87L18.18 21 12 17.27 5.82 21 7 13.87 2 9l6.91-1.74L12 1z" />
								</svg>
								<span className="text-sm">4.8★ Rating</span>
							</div>

							<div className="flex items-center space-x-2 text-violet-300">
								<svg
									className="w-5 h-5"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M16 1H8C6.34 1 5 2.34 5 4v16c0 1.66 1.34 3 3 3h8c1.66 0 3-1.34 3-3V4c0-1.66-1.34-3-3-3z" />
								</svg>
								<span className="text-sm">Mobile App</span>
							</div>
						</div>
					</div>

					<div className="text-center mt-6 text-violet-300 text-sm">
						<p>
							Made with ❤️ for people seeking a match and
							meaningful connections
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
}
