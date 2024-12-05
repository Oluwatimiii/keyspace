"use client";
import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-space-darkgreen text-gray-300 font-urbanist py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top section with logo and tagline */}
        <div className="mb-8">
          <div className="flex mb-5">
            <Link href="/" className="flex-shrink-0 flex items-center gap-1">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#CEFF47"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#CEFF47"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
              </div>

              <span className="text-2xl font-semibold tracking-wider text-space-fades">
                Keyspace
              </span>
            </Link>
          </div>
          <p className="text-sm md:text-base max-w-md">
            Where Your Dream Space Becomes Reality. Building Futures, One
            Property at a Time.
          </p>
        </div>

        {/* Middle section with navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Explore Column */}
          <div>
            <h3 className="text-white font-semibold tracking-wider mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/buy"
                  className="hover:text-white transition-colors"
                >
                  Buy
                </Link>
              </li>
              <li>
                <Link
                  href="/rent"
                  className="hover:text-white transition-colors"
                >
                  Rent
                </Link>
              </li>
              <li>
                <Link
                  href="/short-term"
                  className="hover:text-white transition-colors"
                >
                  Short Term
                </Link>
              </li>
              <li>
                <Link
                  href="/new-projects"
                  className="hover:text-white transition-colors"
                >
                  New Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/list-property"
                  className="hover:text-white transition-colors"
                >
                  List Your Property
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-white font-semibold tracking-wider mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/property-management"
                  className="hover:text-white transition-colors"
                >
                  Property Management
                </Link>
              </li>
              <li>
                <Link
                  href="/property-valuation"
                  className="hover:text-white transition-colors"
                >
                  Property Valuation
                </Link>
              </li>
              <li>
                <Link
                  href="/property-exchange"
                  className="hover:text-white transition-colors"
                >
                  Property Exchange
                </Link>
              </li>
              <li>
                <Link
                  href="/legal-agreements"
                  className="hover:text-white transition-colors"
                >
                  Legal Agreements
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-white font-semibold tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/blogs"
                  className="hover:text-white transition-colors"
                >
                  Blogs
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-white transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/reviews"
                  className="hover:text-white transition-colors"
                >
                  Reviews
                </Link>
              </li>
            </ul>
          </div>

          {/* Email Subscribe Section */}
          <div>
            <h3 className="text-white tracking-wider font-semibold mb-4">
              Are you finding a home?
            </h3>
            <div className="flex">
              <input
                type="email"
                placeholder="Email address"
                className="bg-transparent border-b border-space-greens focus:border-white outline-none px-2 py-1 flex-grow"
              />
              <button className="ml-2 p-2">
                <svg
                  className="w-6 h-6 transform -rotate-45"
                  fill="none"
                  stroke="#ceff47"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom section with copyright and policies */}
        <div className="pt-8 border-t-[0.1px] border-space-greens/5 font-urbanist flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm">&copy; 2024 Keyspace. All right reserved</p>
          <div className="flex space-x-6 text-sm">
            <Link
              href="/privacy-policy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/country-sitemap"
              className="hover:text-white transition-colors"
            >
              Country Sitemap
            </Link>
            <Link
              href="/cookie-policy"
              className="hover:text-white transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
