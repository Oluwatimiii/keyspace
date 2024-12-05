"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import Image from "next/image";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  image: string;
  rating: number;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Tom Holland",
    location: "Seattle, WA",
    image: "https://images.unsplash.com/photo-1557862921-37829c790f19?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG1hbnxlbnwwfHwwfHx8MA%3D%3D",
    rating: 5,
    text: "Working with this team was a game-changer! Their expertise and personalized approach made buying my first home a breeze. They took the time to understand my needs and guided me through every step, making the process feel seamless. I felt confident and well-informed, and I couldn't have asked for a better experience.",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    location: "Portland, OR",
    image:
      "https://images.unsplash.com/photo-1615538785945-6625ccdb4b25?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHdvbWFuJTIwc3VpdHxlbnwwfHwwfHx8MA%3D%3D",
    rating: 5,
    text: "Exceptional service from start to finish! The team's deep knowledge of the local market helped us secure our dream home in a competitive situation. Their communication was outstanding, and they made what could have been a stressful process incredibly smooth.",
  },
  {
    id: 3,
    name: "Michael Chang",
    location: "Bellevue, WA",
    image: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fG1hbnxlbnwwfHwwfHx8MA%3D%3D",
    rating: 5,
    text: "As first-time home sellers, we were nervous about the process. The team walked us through everything, from staging to closing. They got us multiple offers above asking price, and their negotiation skills were invaluable. Couldn't recommend them more highly!",
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    location: "Vancouver, WA",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fHdvbWFufGVufDB8fDB8fHww",
    rating: 5,
    text: "I've worked with several real estate agents before, but this team stands out. Their attention to detail and proactive approach made all the difference. They anticipated potential issues before they arose and always had solutions ready. True professionals!",
  },
  {
    id: 5,
    name: "David Kim",
    location: "Tacoma, WA",
    image: "https://images.unsplash.com/photo-1583341612074-ccea5cd64f6a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fG1hbnxlbnwwfHwwfHx8MA%3D%3D",
    rating: 5,
    text: "The level of personal attention we received was amazing. They took the time to understand exactly what we were looking for and found us the perfect home within our budget. Their expertise in the local market was evident throughout the entire process.",
  },
  {
    id: 6,
    name: "Rachel Foster",
    location: "Kirkland, WA",
    image:
      "https://images.unsplash.com/photo-1573166475912-1ed8b4f093d2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fHdvbWFuJTIwc3VpdHxlbnwwfHwwfHx8MA%3D%3D",
    rating: 5,
    text: "Moving from out of state was daunting, but this team made it feel effortless. They went above and beyond, doing video tours and handling everything we could not do in person. Their knowledge of the area helped us find the perfect neighborhood for our family.",
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

const TestimonialCarousel: React.FC = () => {
  const [[currentIndex, direction], setPage] = useState<[number, number]>([
    0, 0,
  ]);

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number): number => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number): void => {
    setPage(([current]) => {
      const newIndex =
        (current + newDirection + testimonials.length) % testimonials.length;
      return [newIndex, newDirection];
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16 overflow-hidden">
      <h1 className="text-3xl lg:text-5xl text-center font-bold text-space-darkgreen font-urbanist mb-8">
        What Our Clients Are Saying
      </h1>

      <div className="relative">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(
              e: MouseEvent | TouchEvent | PointerEvent,
              info: PanInfo
            ) => {
              const swipe = swipePower(info.offset.x, info.velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="bg-gray-50 rounded-lg p-8 grid md:grid-cols-[400px_1fr] gap-12"
          >
            <div className="relative aspect-square">
              <Image
                src={testimonials[currentIndex].image}
                alt={testimonials[currentIndex].name}
                fill
                className="object-cover z-10 inset-0 shadow-lg rounded-xl"
              />
            </div>

            <div className="flex flex-col justify-center max-w-2xl">
              <div className="space-y-4 font-urbanist">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl font-semibold font-urbanist text-space-darkgreen"
                >
                  {testimonials[currentIndex].name}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-space-blacks font-urbanist"
                >
                  {testimonials[currentIndex].location}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex gap-1"
                >
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-6 h-6 text-[#0D1B2A]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-space-blacks font-urbanist font-medium text-md leading-relaxed"
                >
                  {testimonials[currentIndex].text}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-6"
                >
                  <p className="text-sm font-allura text-semibold text-space-darkgreen">
                    {testimonials[currentIndex].name}
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-4 right-4 space-x-4">
          <button
            onClick={() => paginate(-1)}
            className="bg-space-greens text-space-darkgreen rounded-full p-3 shadow-lg hover:bg-gray-50 transition-all"
            type="button"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() => paginate(1)}
            className="bg-space-darkgreen text-white rounded-full p-3 shadow-lg hover:bg-opacity-90 transition-all"
            type="button"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
