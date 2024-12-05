import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight } from "iconsax-react";

const Contact = () => {
  return (
    <section className="bg-space-blacks md:p-10 w-full">
      <div className="w-full relative h-full flex items-center p-10 md:p-0 justify-center mx-auto md:rounded-3xl min-h-[600px] lg:min-h-[728px] bg-cover bg-top bg-no-repeat bg-[url('../assets/images/prop6.jpg')]">
        <div className="w-full absolute top-0 left-0 h-full bg-black opacity-40" />

        {/* contact card */}
        <div className="font-urbanist space-y-4 bg-white z-20 p-8 rounded-3xl max-w-lg md:absolute md:top-9 md:right-9">
          <h1 className="capitalize font-bold text-space-darkgreen text-center md:text-start text-2xl lg:text-3xl">
            What makes us your ideal real estate partner?
          </h1>
          <p className="text-space-blacks text-sm text-center md:text-start">
            Choosing Keyspace means partnering with a team that understands that
            real estate is more than just a property sorting scheme. It is about
            your dreams, your investments, and your future. We combine decades
            of market expertise with innovative technology to deliver
            personalized solutions that match your unique needs. With
            Keyspace, you're not just getting an agent; you're gaining a trusted
            advisor who will guide you through every step of your real estate
            journey.
          </p>
          <Button
            asChild
            className="text-space-greens flex items-center md:inline-flex justify-center bg-space-darkgreen hover:text-white transition-all duration-100 rounded-full"
          >
            <Link href="/contact">
              Contact Us
              <span style={{ transform: "rotate(-45deg)" }}>
                <ArrowRight size="32" color="#ceff47" />
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
