"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import PropertyCard from "../Custom/PropertyCard";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { exclusiveProperties } from "@/assets/data/data";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Properties() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const headingElement = sectionRef.current?.querySelector("h2");
    let animation: gsap.Context;

    if (headingElement) {
      // Creating a GSAP context
      animation = gsap.context(() => {
        gsap.from(headingElement, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom-=100",
          },
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
        });
      }, sectionRef);
    }

    // Cleanup function
    return () => {
      if (animation) {
        animation.revert(); // Revert all animations created in the context
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Arrow animation variants for framer-motion
  const arrowVariants = {
    initial: { opacity: 0, x: -5 },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  };

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 font-urbanist">
          <h2 className="text-3xl md:text-4xl text-space-darkgreen font-bold mb-4">
            Exclusive Properties By Keyspace
          </h2>
          <p className="text-space-blacks max-w-xl md:max-w-2xl mx-auto">
            Discover our handpicked selection of the most prestigious properties
            available in prime locations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {exclusiveProperties.slice(0, 6).map((property) => (
            <PropertyCard key={property.id} property={property}  />
          ))}
        </div>

        <div className="flex justify-center items-center mt-9">
          <motion.button
            className="bg-space-blacks text-space-greens font-bold py-4 px-5 text-sm md:text-base rounded-full transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.8 }}
          >
            <Link
              href="/find-space"
              className="flex items-center gap-3 font-playfair"
            >
              View All
              {[0, 1, 2].map((index) => (
                <motion.span
                  key={index}
                  variants={arrowVariants}
                  initial="initial"
                  animate="animate"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  →
                </motion.span>
              ))}
            </Link>
          </motion.button>
        </div>
      </div>
    </section>
  );
}
