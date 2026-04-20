import React from "react";
import Footer from "../components/Footer";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <main className="max-w-5xl mx-auto px-6 py-12">
        <section className="bg-white border border-gray-200 rounded-2xl p-8 md:p-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">About Us</h1>
          <p className="text-gray-600 leading-7 mb-4">
            TheLuvia is a focused beauty and fashion marketplace where shoppers discover skincare,
            dresses, and style essentials from trusted sellers.
          </p>
          <p className="text-gray-600 leading-7">
            We keep shopping simple with curated beauty and fashion collections, secure checkout,
            and fast customer support.
          </p>
        </section>

        <section className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 className="font-semibold mb-2">Our Mission</h2>
            <p className="text-sm text-gray-600">Make beauty and fashion shopping easy and inspiring.</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 className="font-semibold mb-2">Our Vision</h2>
            <p className="text-sm text-gray-600">Build a trusted destination for trend-led style.</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 className="font-semibold mb-2">Our Promise</h2>
            <p className="text-sm text-gray-600">Quality products, clear service, and reliable support.</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
