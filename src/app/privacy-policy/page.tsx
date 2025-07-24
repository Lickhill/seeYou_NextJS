import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600">
            Your privacy and security are our top priorities
          </p>
          <p className="text-sm text-gray-500 mt-2">Last updated: January 2024</p>
        </div>

        <div className="prose max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Information We Collect</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-3">Account Information</h3>
                <ul className="space-y-2 text-blue-700">
                  <li>• Name and age</li>
                  <li>• Email address</li>
                  <li>• Phone number (optional)</li>
                  <li>• Profile photos</li>
                  <li>• Location data</li>
                  <li>• Dating preferences</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="font-semibold text-purple-800 mb-3">Usage Information</h3>
                <ul className="space-y-2 text-purple-700">
                  <li>• App interactions</li>
                  <li>• Messages and communications</li>
                  <li>• Device information</li>
                  <li>• IP address</li>
                  <li>• Browsing behavior</li>
                  <li>• Match preferences</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. How We Use Your Information</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-pink-500 pl-6">
                <h3 className="font-semibold text-gray-800 mb-2">Matching & Recommendations</h3>
                <p className="text-gray-600">
                  We use your preferences, location, and behavior to suggest compatible matches and improve our algorithm.
                </p>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="font-semibold text-gray-800 mb-2">Safety & Security</h3>
                <p className="text-gray-600">
                  Your information helps us detect and prevent fraud, harassment, and other harmful activities.
                </p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="font-semibold text-gray-800 mb-2">Communication</h3>
                <p className="text-gray-600">
                  We facilitate secure messaging between users and send important service updates.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Information Sharing</h2>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-red-800 mb-3">We Never Sell Your Personal Data</h3>
              <p className="text-red-700">
                SeeYou will never sell, rent, or trade your personal information to third parties for marketing purposes.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800">Limited Sharing Circumstances:</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>With other users (only information you choose to share in your profile)</li>
                <li>With service providers who help operate our platform (under strict confidentiality)</li>
                <li>When required by law or to protect user safety</li>
                <li>In case of business merger or acquisition (with prior notice)</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Your Privacy Controls</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-3">Profile Visibility</h3>
                <ul className="space-y-2 text-green-700">
                  <li>• Control who can see your profile</li>
                  <li>• Hide your profile temporarily</li>
                  <li>• Block specific users</li>
                  <li>• Limit distance visibility</li>
                </ul>
              </div>
              
              <div className="bg-orange-50 p-6 rounded-lg">
                <h3 className="font-semibold text-orange-800 mb-3">Data Management</h3>
                <ul className="space-y-2 text-orange-700">
                  <li>• Download your data</li>
                  <li>• Delete specific information</li>
                  <li>• Control marketing communications</li>
                  <li>• Manage cookie preferences</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Data Security</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-blue-800 mb-3">Security Measures</h3>
              <div className="grid md:grid-cols-2 gap-4 text-blue-700">
                <ul className="space-y-2">
                  <li>• End-to-end encryption for messages</li>
                  <li>• Secure data storage</li>
                  <li>• Regular security audits</li>
                  <li>• Two-factor authentication</li>
                </ul>
                <ul className="space-y-2">
                  <li>• Photo verification system</li>
                  <li>• AI-powered content moderation</li>
                  <li>• 24/7 security monitoring</li>
                  <li>• HTTPS encryption</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Location Information</h2>
            <p className="text-gray-600 mb-4">
              We use your location to show you nearby matches and relevant local features. You can control location 
              sharing in your device settings or app preferences.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800">
                <strong>Note:</strong> Disabling location may limit some features like nearby matches and location-based safety tools.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Data Retention</h2>
            <div className="space-y-4">
              <p className="text-gray-600">
                We retain your information only as long as necessary to provide our services and comply with legal obligations.
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-3">Retention Periods</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• <strong>Active accounts:</strong> Information retained while account is active</li>
                  <li>• <strong>Deleted accounts:</strong> Most data deleted within 30 days</li>
                  <li>• <strong>Legal compliance:</strong> Some data may be retained longer as required by law</li>
                  <li>• <strong>Safety records:</strong> Records of policy violations may be kept for safety purposes</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Your Rights</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Access & Control</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>Request a copy of your data</li>
                  <li>Correct inaccurate information</li>
                  <li>Delete your account and data</li>
                  <li>Object to certain data processing</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Communication</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>Opt out of marketing emails</li>
                  <li>Control push notifications</li>
                  <li>Manage contact preferences</li>
                  <li>Report privacy concerns</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Children's Privacy</h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <p className="text-red-800 font-semibold mb-2">Age Restriction</p>
              <p className="text-red-700">
                SeeYou is intended for users 18 years and older. We do not knowingly collect information from anyone under 18. 
                If you believe a user is under 18, please report them immediately.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. International Users</h2>
            <p className="text-gray-600">
              SeeYou operates globally. By using our service, you consent to the transfer of your information to countries 
              where we operate, which may have different privacy laws than your country of residence.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Changes to This Policy</h2>
            <p className="text-gray-600">
              We may update this Privacy Policy from time to time. We'll notify you of significant changes through the app 
              or by email. Your continued use of SeeYou after changes indicates your acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">12. Contact Us</h2>
            <div className="bg-pink-50 border border-pink-200 rounded-lg p-6">
              <h3 className="font-semibold text-pink-800 mb-3">Privacy Questions?</h3>
              <div className="space-y-2 text-pink-700">
                <p>📧 Email: <a href="mailto:privacy@seeyou.com" className="underline">privacy@seeyou.com</a></p>
                <p>📞 Phone: +1 (555) 123-LOVE</p>
                <p>📍 Address: SeeYou Privacy Team, 123 Love Street, Romance City, RC 12345</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
