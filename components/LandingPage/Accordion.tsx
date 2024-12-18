"use client";
import React, { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { useRouter } from "next/navigation";

type FAQItem = {
  q: string;
  a: string;
};

type FAQCategory = {
  category: string;
  questions: FAQItem[];
};

const faqData: FAQCategory[] = [
  {
    category: "Buying Property",
    questions: [
      {
        q: "What documents do I need to buy a property?",
        a: "To buy a property, you typically need valid ID, proof of income (pay stubs, tax returns), bank statements, and proof of funds for down payment. Additional documents may include employment verification and credit history.",
      },
      {
        q: "How long does the buying process usually take?",
        a: "The property buying process typically takes 15-60 days from offer acceptance to closing. This timeline can vary based on factors like financing, property inspections, and local regulations.",
      },
    ],
  },
  {
    category: "Renting Property",
    questions: [
      {
        q: "What is the standard security deposit amount?",
        a: "The standard security deposit usually equals one to two months' rent. However, this can vary by location, property type, and landlord requirements.",
      },
      {
        q: "Are utilities included in the rent?",
        a: "Utility inclusion varies by property. Some rentals include basic utilities like water and garbage, while others require tenants to pay for all utilities. Check your lease agreement for specific details.",
      },
    ],
  },
  {
    category: "Property Management",
    questions: [
      {
        q: "What services do property managers provide?",
        a: "Property managers handle tenant screening, rent collection, maintenance coordination, property inspections, and legal compliance. They also manage vendor relationships and handle emergency situations.",
      },
      {
        q: "How often is maintenance performed?",
        a: "Regular maintenance is typically performed quarterly, with seasonal checks for HVAC systems. Emergency maintenance is available 24/7, and routine repairs are addressed as needed.",
      },
    ],
  },
];

const Accordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const router = useRouter()

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredFAQ = faqData
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (item) =>
          item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.a.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.questions.length > 0);

  const handleQuestionClick = (index: string) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleContactSupport = () => {
    // Implement contact support functionality
    router.push('/contact')
  };

  return (
    <div className="bg-gray-50 py-16 px-4 md:px-8 font-urbanist">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 mb-8">
            Find answers to common questions about our real estate services
          </p>

          {/* Search Bar */}
          <div className="relative max-w-lg mx-auto">
            <input
              type="text"
              placeholder="Search your question..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-space-greens focus:border-transparent transition-all duration-300"
              aria-label="Search FAQ"
            />
            <Search
              className="absolute left-4 top-3.5 text-gray-400"
              size={20}
            />
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {filteredFAQ.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="bg-space-greens rounded-lg shadow-md overflow-hidden"
            >
              <h3 className="text-xl font-semibold text-space-darkgreen p-6 border-b border-space-grays">
                {category.category}
              </h3>

              {/* Questions */}
              <div className="divide-y divide-gray-100 bg-space-darkgreen ">
                {category.questions.map((item, index) => {
                  const questionId = `${categoryIndex}-${index}`;
                  const isOpen = openIndex === questionId;

                  return (
                    <div
                      key={questionId}
                      className="transition-all duration-300"
                    >
                      <button
                        onClick={() => handleQuestionClick(questionId)}
                        className="w-full px-6 py-4 flex justify-between items-center hover:bg-space-blacks transition-colors"
                        aria-expanded={isOpen}
                        aria-controls={`answer-${questionId}`}
                      >
                        <span className="text-left font-medium text-white">
                          {item.q}
                        </span>
                        <ChevronDown
                          className={`transform transition-transform duration-300 text-space-fades flex-shrink-0 ml-4 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                          size={20}
                          aria-hidden="true"
                        />
                      </button>

                      {/* Answer */}
                      <div
                        id={`answer-${questionId}`}
                        className={`overflow-hidden transition-all duration-300 ${
                          isOpen ? "max-h-96" : "max-h-0"
                        }`}
                        role="region"
                        aria-labelledby={`question-${questionId}`}
                      >
                        <p className="px-6 py-4 text-space-blacks bg-gray-50">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredFAQ.length === 0 && (
          <div className="text-center py-12" role="alert">
            <p className="text-gray-600">
              No questions found matching your search.
            </p>
          </div>
        )}

        {/* Contact Section */}
        <div className="mt-12 text-center font-urbanist bg-space-darkgreen p-8 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-space-greens mb-4">
            Still have questions?
          </h3>
          <p className="text-white mb-6">
            We're here to help. Contact our support team for assistance.
          </p>
          <button
            onClick={handleContactSupport}
            className="bg-space-greens text-space-darkgreen px-6 py-3 rounded-lg hover:bg-space-blacks hover:text-white transition-colors duration-300"
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
