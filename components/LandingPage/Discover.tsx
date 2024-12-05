"use client";

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight } from "iconsax-react";
import { Card, Carousel } from "../ui/apple-cards-carousel";
import { data } from "../Custom/DiscoverCard";


export default function Discover() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} layout={true} />
  ));

  return (
    <div className="w-full mx-auto px-10 py-10 md:py-14">
      <div className="flex items-center justify-between mb-4 font-urbanist">
        <h2 className="text-3xl md:text-4xl text-space-darkgreen font-bold max-w-lg mb-4">
          Find Your Dream Home or List Your Property
        </h2>
        <Button
          asChild
          className="text-space-greens bg-space-darkgreen hover:text-white transition-all duration-100 rounded-full"
        >
          <Link href="/list-property">
            Visit Listing
            <span style={{ transform: "rotate(-45deg)" }}>
              <ArrowRight size="32" color="#ceff47" />
            </span>
          </Link>
        </Button>
      </div>

      <div className="w-full mb-4">
        <Carousel items={cards} />
      </div>
    </div>
  );
}
