"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { motion } from "framer-motion";
import { Building, People, Timer, Medal } from "iconsax-react";


export default function AboutPage() {
  const sectionRefs = {
    hero: useRef<HTMLDivElement>(null),
    mission: useRef<HTMLDivElement>(null),
    stats: useRef<HTMLDivElement>(null),
    values: useRef<HTMLDivElement>(null),
  };
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Hero Animation
      gsap.from(sectionRefs.hero.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      });

      // Mission Section Animation
      gsap.from(sectionRefs.mission.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRefs.mission.current,
          start: "top bottom-=100",
        },
      });

      // Stats Animation
      const statItems = sectionRefs.stats.current?.querySelectorAll('.stat-item');
      statItems?.forEach((item, index) => {
        gsap.from(item, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          delay: index * 0.2,
          scrollTrigger: {
            trigger: sectionRefs.stats.current,
            start: "top center+=100",
          },
        });
      });

      // Values Animation
      const valueItems = sectionRefs.values.current?.querySelectorAll('.value-item');
      valueItems?.forEach((item, index) => {
        gsap.from(item, {
          opacity: 0,
          x: index % 2 === 0 ? -30 : 30,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRefs.values.current,
            start: "top center+=100",
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const stats = [
    { icon: <Building size="32" variant="Bold" />, number: "1000+", label: "Properties Listed" },
    { icon: <People size="32" variant="Bold" />, number: "50k+", label: "Happy Users" },
    { icon: <Timer size="32" variant="Bold" />, number: "24/7", label: "Support Available" },
    { icon: <Medal size="32" variant="Bold" />, number: "99%", label: "Satisfaction Rate" },
  ];

  return (
    <>
      {/* Hero Section */}
      <section
        ref={sectionRefs.hero}
        className="relative min-h-[60vh] font-urbanist bg-[url('../assets/images/heropic.jpg')] bg-no-repeat bg-center bg-cover"
      >
        <div className="absolute inset-0 bg-black bg-opacity-60">
          <div className="container py-10 mx-auto px-4 h-full flex items-center justify-center">
            <div className="text-center text-white max-w-3xl">
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-space-fades">
                About Keyspace
              </h1>
              <p className="text-lg text-space-fades font-playfair">
                Revolutionizing the way people find and list properties
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section ref={sectionRefs.mission} className="py-20 font-urbanist bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8 text-space-darkgreen">Our Mission</h2>
            <p className="text-lg mb-6 text-space-blacks">
              Keyspace is a revolutionary platform connecting property owners with those seeking the perfect space. 
              Whether you're looking for a short-term rental, a long-term lease, or a unique venue for your next event, 
              Keyspace has you covered.
            </p>
            <p className="text-lg text-space-blacks">
              Our mission is to make the process of finding and listing spaces as simple and efficient as possible, 
              providing a seamless experience for both property owners and seekers.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={sectionRefs.stats} className="pb-16 pt-8 bg-space-darkgreen text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item text-center">
                <div className="flex justify-center mb-4 text-space-greens">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold mb-2">{stat.number}</h3>
                <p className="text-space-fades">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={sectionRefs.values} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-space-darkgreen">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Innovation",
                description: "Continuously evolving our platform with cutting-edge technology",
                icon: "🚀",
              },
              {
                title: "Trust",
                description: "Building lasting relationships through transparency and reliability",
                icon: "🤝",
              },
              {
                title: "Excellence",
                description: "Maintaining the highest standards in service and property listings",
                icon: "⭐",
              },
              {
                title: "Community",
                description: "Creating meaningful connections between property owners and seekers",
                icon: "🏘️",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                className="value-item p-8 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-space-darkgreen">{value.title}</h3>
                <p className="text-space-blacks">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
  
  