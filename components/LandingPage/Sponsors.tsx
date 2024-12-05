"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  AttachCircle,
  BitcoinRefresh,
  Cardano,
  CloudAdd,
  Convert,
  SmartHome,
} from "iconsax-react";

export default function Sponsors() {
  const sponsorsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sponsorsRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      });
    });

    return () => ctx.revert();
  }, []);

  const sponsors = [
    { name: "Tag Homes", logo: <AttachCircle size="32" color="#0c3122" /> },
    { name: "Wealth Lease", logo: <Convert size="32" color="#0c3122" /> },
    { name: "Freeway", logo: <Cardano size="32" color="#0c3122" /> },
    { name: "Spacious", logo: <CloudAdd size="32" color="#0c3122" /> },
    { name: "Oracle", logo: <BitcoinRefresh size="32" color="#0c3122" /> },
    { name: "Adron", logo: <SmartHome size="32" color="#0c3122" /> },
  ];

  return (
    <section ref={sponsorsRef} className="bg-space-greens">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="py-[3rem] font-urbanist">
          <h2 className="text-xl md:text-3xl font-bold text-center mb-7 text-space-darkgreen capitalize tracking-wide">
            Trusted by leading companies
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 place-items-center lg:grid-cols-6 gap-4">
            {sponsors.map((sponsor, index) => (
              <div
                key={index}
                className="flex items-center justify-center border-[1px] border-space-darkgreen gap-2 bg-white/30 backdrop-blur-md rounded-lg p-4"
              >
                <div>{sponsor.logo}</div>
                <div>
                  <p className="font-inter font-semibold text-space-dsarkgreen text-base md:text-[18px]">
                    {sponsor.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
