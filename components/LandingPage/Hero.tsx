"use client";
import { useEffect, useRef, useState, ChangeEvent, MouseEvent } from "react";
import { gsap } from "gsap";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState<string>("");

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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(inputValue);
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-[calc(100vh-4rem)] bg-[url('../assets/images/heropic.jpg')] bg-no-repeat bg-top bg-cover"
    >
      <div className="w-full max-w-[7xl] h-screen mx-auto px-4 relative z-10 bg-black bg-opacity-60">
        <div className="pt-[4rem] space-y-5 font-inter">
          <h1 className="text-5xl lg:text-6xl font-bold text-center md:text-start text-space-fades md:max-w-[65%] capitalize tracking-wide leading-[3.8rem]">
            Turning your real estate dream into reality
          </h1>
          <p className="text-sm md:text-base mb-12 max-w-sm md:max-w-md mx-auto md:mx-0 font-playfair text-center md:text-start text-space-fades">
            Find your perfect space or list your property with our modern
            platform. Elevate your lifestyle today.
          </p>
          <div className="flex items-center gap-4 md:max-w-[60%] w-[95%] mx-auto md:mx-0 lg:max-w-[50%] rounded-[11px] p-2 bg-white">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Browse keyspace properties..."
              className="p-4 focus:outline-none bg-transparent w-[60%] placeholder-gray-400"
            />
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 rounded-[11px] w-[40%] justify-center bg-space-darkgreen text-white text-sm py-3 px-2 hover:bg-space-darkgreen/90 transition-all duration-75"
            >
              Search a space
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.2}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
