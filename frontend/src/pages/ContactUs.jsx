import React from "react";
import Footer from "../components/Footer";

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <main className="max-w-5xl mx-auto px-6 py-12">
        <section className="bg-white border border-gray-200 rounded-2xl p-8 md:p-10 mb-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-gray-600 leading-7">
            Need help with an order, payment, return, or account issue? Reach us using the details below.
          </p>
        </section>

        <section className="grid md:grid-cols-2 gap-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 className="font-semibold mb-2">Customer Support</h2>
            <p className="text-sm text-gray-600">Email: shivanikapoor5588@gmail.com</p>
            <p className="text-sm text-gray-600">Phone: +91 787-996-3210</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 className="font-semibold mb-2">Business Hours</h2>
            <p className="text-sm text-gray-600">Monday - Saturday</p>
            <p className="text-sm text-gray-600">9:00 AM - 7:00 PM</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 md:col-span-2">
            <h2 className="font-semibold mb-2">Office Address</h2>
            <p className="text-sm text-gray-600 leading-6">
              TheLuvia Commerce Hub
              <br />
              6th Floor, House No. 10
              <br />
              Delhi, India - 698003
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
