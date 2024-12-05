"use client";
import { useState, ChangeEvent, MouseEvent } from "react";

export default function EstimateValue() {
  const [address, setAddress] = useState<string>("");

  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handleEstimateSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Address for estimation:", address);
    // Add your estimation logic here
  };

  return (
    <div className="relative min-h-[70vh] bg-[url('../assets/images/estimatebg.jpg')] bg-no-repeat bg-center bg-cover">
      <div className="w-full h-full mx-auto px-4 py-20 relative z-10 bg-black bg-opacity-60">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="space-y-5 font-inter text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-space-fades capitalize tracking-wide">
              Get Your Property Value Estimate
            </h2>
            <p className="text-sm md:text-base mx-auto max-w-2xl text-space-fades">
              Enter your property address to receive an instant estimate based on current market data
              and recent sales in your area.
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-4 w-full rounded-[11px] p-2 bg-white">
              <input
                type="text"
                value={address}
                onChange={handleAddressChange}
                placeholder="Enter your property address..."
                className="p-4 focus:outline-none bg-transparent w-full md:w-[70%] placeholder-gray-400"
              />
              <button
                onClick={handleEstimateSubmit}
                className="flex items-center gap-2 rounded-[11px] w-full md:w-[30%] justify-center bg-space-darkgreen text-white text-sm py-4 px-6 hover:bg-space-darkgreen/90 transition-all duration-75"
              >
                Get Estimate
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                    />
                  </svg>
                </span>
              </button>
            </div>
            <p className="text-white text-sm mt-4 text-center">
              Get an instant estimate and detailed market analysis for your property
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
