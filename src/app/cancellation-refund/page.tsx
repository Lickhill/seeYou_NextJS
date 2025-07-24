import React from 'react';

export default function CancellationRefund() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Cancellation & Refund Policy</h1>
          <p className="text-lg text-gray-600">
            Understanding your subscription and refund options
          </p>
        </div>

        <div className="prose max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Subscription Cancellation</h2>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-green-800 mb-3">How to Cancel Your Subscription</h3>
              <ol className="list-decimal pl-6 space-y-2 text-green-700">
                <li>Log into your SeeYou account</li>
                <li>Go to Account Settings</li>
                <li>Select &ldquo;Subscription Management&rdquo;</li>
                <li>Click &ldquo;Cancel Subscription&rdquo;</li>
                <li>Follow the confirmation prompts</li>
              </ol>
            </div>
            <p className="text-gray-600">
              You can cancel your subscription at any time. Your premium features will remain active until the end of your current billing period.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Refund Policy</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-3">Eligible for Refund</h3>
                <ul className="space-y-2 text-blue-700">
                  <li>✓ Technical issues preventing service use</li>
                  <li>✓ Accidental double charges</li>
                  <li>✓ Unauthorized charges</li>
                  <li>✓ Service not as described</li>
                </ul>
              </div>
              
              <div className="bg-red-50 p-6 rounded-lg">
                <h3 className="font-semibold text-red-800 mb-3">Not Eligible for Refund</h3>
                <ul className="space-y-2 text-red-700">
                  <li>✗ Change of mind</li>
                  <li>✗ Partial month usage</li>
                  <li>✗ Account suspension for violations</li>
                  <li>✗ Not finding matches</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Refund Timeline</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-pink-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Request Submitted</h4>
                    <p className="text-gray-600">We'll acknowledge your refund request within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Review Process</h4>
                    <p className="text-gray-600">Our team reviews your request within 3-5 business days</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">3</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Refund Processing</h4>
                    <p className="text-gray-600">If approved, refunds are processed within 7-10 business days</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Premium Features & Gifts</h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-pink-500 pl-6">
                <h3 className="font-semibold text-gray-800 mb-2">Virtual Gifts</h3>
                <p className="text-gray-600">
                  Virtual gifts sent to other users are non-refundable once delivered. Physical gifts may be eligible 
                  for refund if not yet shipped.
                </p>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="font-semibold text-gray-800 mb-2">Boost Features</h3>
                <p className="text-gray-600">
                  Profile boosts and super likes that have been used cannot be refunded. Unused boosts may be 
                  eligible for refund in certain circumstances.
                </p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="font-semibold text-gray-800 mb-2">Premium Subscriptions</h3>
                <p className="text-gray-600">
                  Subscription refunds are only provided for the current billing period and only under specific circumstances 
                  outlined in our refund policy.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">How to Request a Refund</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="font-semibold text-yellow-800 mb-3">Refund Request Process</h3>
              <div className="space-y-3 text-yellow-700">
                <p>1. Email us at <strong>refunds@seeyou.com</strong> with the following information:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Your account email address</li>
                  <li>Order/Transaction ID</li>
                  <li>Reason for refund request</li>
                  <li>Supporting documentation (if applicable)</li>
                </ul>
                <p>2. Our team will review your request and respond within 3-5 business days</p>
                <p>3. If approved, the refund will be processed to your original payment method</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Free Trial Cancellation</h2>
            <p className="text-gray-600 mb-4">
              If you&apos;re on a free trial, you can cancel anytime during the trial period without being charged. 
              Make sure to cancel at least 24 hours before the trial ends to avoid automatic billing.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800">
                <strong>Tip:</strong> Set a reminder to cancel your trial if you don&apos;t want to continue with a paid subscription.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Support</h2>
            <p className="text-gray-600">
              If you have questions about cancellations or refunds, please contact our support team:
            </p>
            <div className="mt-4 space-y-2">
              <p className="text-gray-600">📧 Email: <a href="mailto:support@seeyou.com" className="text-pink-600 hover:underline">support@seeyou.com</a></p>
              <p className="text-gray-600">📞 Phone: +1 (555) 123-LOVE</p>
              <p className="text-gray-600">💬 Live Chat: Available 24/7 on our website</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
