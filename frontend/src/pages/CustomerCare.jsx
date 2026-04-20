import React from "react";
import Footer from "../components/Footer";

const faqs = [
  {
    title: "How can I track my order?",
    description: "Go to your Orders page in your account to see the latest order status."
  },
  {
    title: "How do returns work?",
    description: "Eligible products can be returned within the return policy period."
  },
  {
    title: "How can I contact support?",
    description: "You can call us or email shivanikapoor@gmail.com for help."
  }
];

export default function CustomerCare() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <main className="max-w-5xl mx-auto px-6 py-12">
        <section className="bg-white border border-gray-200 rounded-2xl p-8 md:p-10 mb-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Customer Service</h1>
          <p className="text-gray-600 leading-7">
            We are here to help with orders, refunds, delivery, and account support.
          </p>
        </section>

        <section className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 className="font-semibold mb-2">Call Us</h2>
            <p className="text-sm text-gray-600">+91 787-996-3210</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 className="font-semibold mb-2">Email Us</h2>
            <p className="text-sm text-gray-600">shivanikapoor5588@gmail.com</p>
          </div>
        </section>

        <section className="space-y-3">
          {faqs.map((faq) => (
            <div key={faq.title} className="bg-white border border-gray-200 rounded-2xl p-6">
              <h3 className="font-semibold mb-2">{faq.title}</h3>
              <p className="text-sm text-gray-600">{faq.description}</p>
            </div>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}
