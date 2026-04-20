import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-10">
      <div className="max-w-[1400px] mx-auto px-6 py-10
        grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        <div>
          <h2 className="font-semibold text-lg mb-4">About Us</h2>
          <p className="text-gray-600 text-sm leading-6">
            Discover beauty, skincare, dresses, and fashion essentials at
            TheLuvia. We bring trend-led collections with secure checkout
            and smooth delivery.
          </p>
          <Link to="/about" className="inline-block mt-4 text-sm font-semibold hover:text-black">
            Read More
          </Link>
        </div>

        <div>
          <h2 className="font-semibold text-lg mb-4">
            HELP & SUPPORT
          </h2>

          <ul className="space-y-2 text-sm text-gray-600">
            <li><Link to="/customer-care" className="hover:text-black">Shipping Info</Link></li>
            <li><Link to="/customer-care" className="hover:text-black">Free Return - 15 Days</Link></li>
            <li><Link to="/customer-care" className="hover:text-black">Refund Policy</Link></li>
            <li><Link to="/customer-care" className="hover:text-black">How To Order</Link></li>
            <li><Link to="/orders" className="hover:text-black">Track Order</Link></li>
            <li><Link to="/customer-care" className="hover:text-black">Size Guide</Link></li>
            <li><Link to="/customer-care" className="hover:text-black">Privacy Policy</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-lg mb-4">
            TheLuvia Info
          </h2>

          <ul className="space-y-2 text-sm text-gray-600">
            <li><Link to="/about" className="hover:text-black">About Us</Link></li>
            <li>Beauty Blog</li>
            <li>Fashion Edit</li>
            <li>Style Guide</li>
            <li>Careers</li>
            <li>Affiliate Program</li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-lg mb-4">
            FIND US ON
          </h2>

          <div className="flex gap-4 mb-5">
            <Facebook className="cursor-pointer hover:text-black" />
            <Instagram className="cursor-pointer hover:text-black" />
            <Twitter className="cursor-pointer hover:text-black" />
            <Youtube className="cursor-pointer hover:text-black" />
          </div>

          <p className="text-sm text-gray-600 leading-6">
            6th Floor, House No.10 <br />
            Delhi, India - 698003 <br />
            <Link to="/contact" className="hover:text-black">Contact Us</Link>: +91 787-996-3210 <br />
            Email: shivanikapoor5588@gmail.com
          </p>

          <div className="flex gap-3 mt-5">
            <img src="/paypal.png" className="h-6" />
            <img src="/visa.png" className="h-6" />
            <img src="/mastercard.png" className="h-6" />
          </div>
        </div>

      </div>

      <div className="border-t text-center py-4 text-sm text-gray-600">
        Copyright | TheLuvia | All Rights Reserved
      </div>

    </footer>
  );
}
