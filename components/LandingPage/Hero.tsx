"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { agents } from "@/assets/data/data";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(heroRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      });
    });

    return () => ctx.revert();
  }, []);

  // Take first 5 agents for the showcase
  const showcaseAgents = agents.slice(0, 5);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[calc(100vh-4rem)] bg-[url('../assets/images/heropic.jpg')] bg-no-repeat bg-cover bg-center"
    >
      <div className="absolute inset-0 bg-black/80"></div>
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center">
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto py-16 space-y-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-space-fades capitalize tracking-wide leading-tight">
            Turning your real estate dream into reality
          </h1>
          
          <p className="text-sm md:text-base max-w-xl mx-auto font-playfair text-space-fades px-4">
            Find your perfect space or list your property with our modern
            platform. Elevate your lifestyle today.
          </p>
          
          {/* Find Property CTA Button */}
          <div className="mt-6 mb-10">
            <Link href="/find-space">
              <button className="bg-space-greens text-space-darkgreen hover:bg-white px-8 py-4 rounded-full font-bold transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Find Property
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
          
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center -space-x-4">
              {showcaseAgents.map((agent) => (
                <div
                  key={agent.id}
                  className="relative w-10 sm:w-12 h-10 sm:h-12 rounded-full border-2 border-white overflow-hidden hover:z-10 transition-all hover:scale-110"
                >
                  <Image
                    src={agent.profilePictureUrl}
                    alt={`Agent ${agent.name}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <p className="text-space-fades text-sm">
              Join <span className="font-bold">2,000+</span> property owners who trust Keyspace
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
