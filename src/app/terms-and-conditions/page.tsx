import React from 'react';

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Terms and Conditions</h1>
          <p className="text-lg text-gray-600">
            Please read these terms carefully before using SeeYou
          </p>
          <p className="text-sm text-gray-500 mt-2">Last updated: January 2024</p>
        </div>

        <div className="prose max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600">
              By accessing and using SeeYou, you accept and agree to be bound by the terms and provision of this agreement. 
              If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Eligibility</h2>
            <div className="space-y-3">
              <p className="text-gray-600">To use SeeYou, you must:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Be at least 18 years old</li>
                <li>Have the legal capacity to enter into binding agreements</li>
                <li>Not be prohibited from using our service under applicable law</li>
                <li>Provide accurate and truthful information</li>
                <li>Maintain the security of your account credentials</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. User Conduct</h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-4">
              <h3 className="font-semibold text-red-800 mb-3">Prohibited Activities</h3>
              <ul className="list-disc pl-6 space-y-2 text-red-700">
                <li>Harassment, abuse, or threatening behavior</li>
                <li>Sharing inappropriate or offensive content</li>
                <li>Misrepresenting your identity or age</li>
                <li>Commercial solicitation or spam</li>
                <li>Sharing personal contact information publicly</li>
                <li>Creating fake or duplicate accounts</li>
              </ul>
            </div>
            <p className="text-gray-600">
              Users who violate these terms may have their accounts suspended or terminated at our discretion.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Premium Subscriptions</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-pink-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-3">Subscription Terms</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Monthly and annual plans available</li>
                  <li>• Automatic renewal unless cancelled</li>
                  <li>• Cancel anytime in account settings</li>
                  <li>• No refunds for partial months</li>
                </ul>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-3">Premium Features</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Unlimited likes and super likes</li>
                  <li>• See who liked you</li>
                  <li>• Advanced matching filters</li>
                  <li>• Priority customer support</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Privacy and Data</h2>
            <p className="text-gray-600 mb-4">
              Your privacy is important to us. We collect and use your information as described in our Privacy Policy. 
              By using SeeYou, you consent to the collection and use of your information as outlined in our Privacy Policy.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800">
                <strong>Important:</strong> Never share personal information like your full name, address, phone number, 
                or financial information with other users until you feel completely comfortable and safe.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Content and Intellectual Property</h2>
            <p className="text-gray-600 mb-4">
              You retain ownership of content you post on SeeYou, but grant us a license to use, display, and distribute 
              your content within our service. You are responsible for ensuring you have the right to share any content you upload.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Safety and Security</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="font-semibold text-yellow-800 mb-3">Safety Guidelines</h3>
              <ul className="list-disc pl-6 space-y-2 text-yellow-700">
                <li>Meet in public places for first dates</li>
                <li>Tell friends or family about your plans</li>
                <li>Trust your instincts and report suspicious behavior</li>
                <li>Never send money or provide financial information</li>
                <li>Use SeeYou&apos;s in-app messaging until you feel safe</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Disclaimers and Limitations</h2>
            <p className="text-gray-600 mb-4">
              SeeYou is provided &ldquo;as is&rdquo; without any warranties. We do not guarantee matches, relationships, or outcomes. 
              We are not responsible for the actions of other users or any interactions that occur outside our platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Termination</h2>
            <p className="text-gray-600">
              Either party may terminate this agreement at any time. Upon termination, your right to use SeeYou will cease immediately. 
              We reserve the right to terminate accounts that violate these terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Contact Information</h2>
            <p className="text-gray-600">
              If you have questions about these Terms and Conditions, please contact us at 
              <a href="mailto:legal@seeyou.com" className="text-pink-600 hover:underline ml-1">legal@seeyou.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
