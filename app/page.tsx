import { ScrollToTop } from "@/components/Custom/ScrollToTop";
import Accordion from "@/components/LandingPage/Accordion";
import Contact from "@/components/LandingPage/Contact";
import Discover from "@/components/LandingPage/Discover";
import Hero from "@/components/LandingPage/Hero";
import Highlights from "@/components/LandingPage/Highlights";
import Properties from "@/components/LandingPage/Properties";
import Sponsors from "@/components/LandingPage/Sponsors";
import TestimonialCarousel from "@/components/LandingPage/Testimonial";
import { UserProvider } from "@/hooks/Providers/UserProvider";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("userdata", user)

  return (
    <UserProvider user={user}>
      <main className="pt-16">
        <Hero />
        <Sponsors />
        <Properties />
        <Highlights />
        <Discover />
        <Contact />
        <Accordion />
        <TestimonialCarousel />
        <ScrollToTop />
      </main>
    </UserProvider>
  );
}
