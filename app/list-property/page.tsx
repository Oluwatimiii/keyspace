"use client"

import EstimateValue from "@/components/Custom/EstimateValue";
import { Dash, HierarchySquare, MoneySend } from "iconsax-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { getSupabaseClient } from "@/utils/supabase/client";
import { useState } from "react";

export default function ListPropertyPage() {
  const router = useRouter()
  const user = useAuthStore((state) => state.user);
  const [checkingAgent, setCheckingAgent] = useState(false);

  // Handler for the Start Listing button
  const handleStartListing = async () => {
    if (!user) {
      router.push("/login");
      return;
    }
    setCheckingAgent(true);
    const supabase = getSupabaseClient();
    // Check if user is already an agent
    const { data: agent, error } = await supabase
      .from("agents")
      .select("id")
      .eq("userId", user.id)
      .single();
    setCheckingAgent(false);
    if (agent && !error) {
      router.push("/authenticated/dashboard");
    } else {
      router.push("/agent/register");
    }
  };

  return (
    <section className="font-urbanist mx-auto bg-black">
      <div className="min-h-screen w-full bg-[url('../assets/images/heropic.jpg')] bg-no-repeat bg-top bg-cover max-w-7xl mx-auto">
        <div className="w-full h-screen mx-auto px-4 relative z-10 bg-black bg-opacity-80 flex flex-col items-center justify-center text-center">
          <div className="space-y-5 font-inter px-6 md:px-10">
            <h1 className="text-5xl lg:text-6xl font-bold text-center md:max-w-[900px] text-white capitalize tracking-wide leading-[3.8rem]">
              List or Sell Your property With confidence
            </h1>
            <p className="text-sm md:text-base mb-12 mx-auto md:mx-0 text-center text-white">
              List or sell your properties with Keyspace, the modern platform
              for all your real estate needs.
            </p>
          </div>
        </div>
      </div>

      {/* Selling Options Grid */}
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Direct Sale Option */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-shadow">
            <div className="h-16 w-16 bg-space-darkgreen rounded-full flex items-center justify-center mb-6">
              <MoneySend size="34" color="#ceff47" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Get a Cash Offer</h3>
            <p className="text-gray-600 mb-6">
              Receive instant cash offers from Keyspace investors. Quick,
              hassle-free closing on your timeline.
            </p>
            <button className="bg-space-darkgreen text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors">
              Request Cash Offer
            </button>
          </div>

          {/* Agent Option */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-shadow">
            <div className="h-16 w-16 bg-space-darkgreen rounded-full flex items-center justify-center mb-6">
              <Dash size="34" color="#ceff47" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Work with an Agent</h3>
            <p className="text-gray-600 mb-6">
              Connect with top-rated local agents who will guide you through the
              selling process.
            </p>
            <button onClick={() => router.push("/agent")} className="bg-space-darkgreen text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors">
              Find an Agent
            </button>
          </div>

          {/* Self-Listing Option */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-shadow">
            <div className="h-16 w-16 bg-space-darkgreen rounded-full flex items-center justify-center mb-6">
              <HierarchySquare size="34" color="#ceff47" />
            </div>
            <h3 className="text-2xl font-bold mb-4">List it Yourself</h3>
            <p className="text-gray-600 mb-6">
              Become a Keyspace partner and list your property directly on our
              platform.
            </p>
            <button
              onClick={handleStartListing}
              className="bg-space-darkgreen text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors"
              disabled={checkingAgent}
            >
              {checkingAgent ? "Checking..." : "Start Listing"}
            </button>
          </div>
        </div>
      </div>

      {/* Property Value Estimation Section */}
      <EstimateValue />

      {/* FAQ Section */}
      <div className="bg-gray-50 py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid gap-6 max-w-3xl mx-auto">
            {faqItems.map((item, index) => (
              <details
                key={index}
                className="bg-white rounded-lg shadow-md p-6 group"
              >
                <summary className="list-none flex justify-between items-center cursor-pointer">
                  <span className="font-semibold text-lg">{item.question}</span>
                  <span className="transform group-open:rotate-180 transition-transform">
                    ↓
                  </span>
                </summary>
                <p className="mt-4 text-gray-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// FAQ Data
const faqItems = [
  {
    question: "How does selling to Keyspace work?",
    answer:
      "Submit your property details and receive competitive cash offers within 24 hours. Choose your closing date and sell with confidence.",
  },
  {
    question: "What are the benefits of working with a Keyspace agent?",
    answer:
      "Our agents are carefully selected professionals with extensive local market knowledge. They provide full-service support, from pricing strategy to closing.",
  },
  {
    question: "How can I list my property myself on Keyspace?",
    answer:
      "Create a Keyspace partner account, upload your property details and photos, set your price, and reach thousands of potential buyers.",
  },
  {
    question: "What fees are involved?",
    answer:
      "Fees vary based on your chosen selling method. Direct sales to Keyspace have no agent commissions, while traditional listings with agents follow standard market rates.",
  },
];
