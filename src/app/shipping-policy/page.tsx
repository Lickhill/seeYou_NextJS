import React from 'react';

export default function ShippingPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Shipping Policy</h1>
          <p className="text-lg text-gray-600">
            Information about our premium gift and merchandise delivery
          </p>
        </div>

        <div className="prose max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Premium Gifts & Merchandise</h2>
            <p className="text-gray-600 mb-4">
              SeeYou offers premium gifts and branded merchandise that can be sent to your matches or purchased for yourself. 
              All physical items are subject to our shipping policy outlined below.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Shipping Zones & Delivery Times</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-pink-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-3">Domestic Shipping (US)</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Standard: 3-5 business days</li>
                  <li>• Express: 1-2 business days</li>
                  <li>• Same Day (select cities): Within 4 hours</li>
                  <li>• Gift delivery with message card included</li>
                </ul>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-3">International Shipping</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Canada: 5-7 business days</li>
                  <li>• Europe: 7-10 business days</li>
                  <li>• Australia/Asia: 10-14 business days</li>
                  <li>• Customs duties may apply</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Gift Delivery Options</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-pink-500 pl-4">
                <h3 className="font-semibold text-gray-800">Anonymous Gift Delivery</h3>
                <p className="text-gray-600">Send gifts anonymously with only your first name and a custom message.</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="font-semibold text-gray-800">Scheduled Delivery</h3>
                <p className="text-gray-600">Schedule gift delivery for special occasions or surprise dates.</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-gray-800">Premium Packaging</h3>
                <p className="text-gray-600">All gifts come in beautiful SeeYou branded packaging with romantic touches.</p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Shipping Costs</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div>
                  <h4 className="font-semibold text-gray-800">Standard</h4>
                  <p className="text-2xl font-bold text-pink-600">$5.99</p>
                  <p className="text-gray-600">3-5 days</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Express</h4>
                  <p className="text-2xl font-bold text-purple-600">$12.99</p>
                  <p className="text-gray-600">1-2 days</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Same Day</h4>
                  <p className="text-2xl font-bold text-blue-600">$24.99</p>
                  <p className="text-gray-600">4 hours</p>
                </div>
              </div>
              <p className="text-center text-gray-600 mt-4">*Free shipping on orders over $50</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Order Processing</h2>
            <p className="text-gray-600 mb-4">
              Orders are processed Monday through Friday, 9 AM to 6 PM EST. Orders placed after 2 PM EST 
              will be processed the next business day. Weekend and holiday orders will be processed on the next business day.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Privacy & Discretion</h2>
            <p className="text-gray-600 mb-4">
              We understand the importance of privacy in dating. All packages are shipped in discreet packaging 
              without any external branding that indicates the nature of our service. Only the recipient's information 
              is visible on the package.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
            <p className="text-gray-600">
              For questions about your order or shipping, please contact our support team at 
              <a href="mailto:shipping@seeyou.com" className="text-pink-600 hover:underline ml-1">shipping@seeyou.com</a> 
              or call us at +1 (555) 123-LOVE.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
