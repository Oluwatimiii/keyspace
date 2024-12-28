import type { Metadata } from "next";
import "./globals.css";
import {
  allura,
  bebas_neue,
  inter,
  playfair_display,
  roboto_mono,
  urbanist,
} from "@/utils/fonts/fonts";
import Navbar from "@/components/Custom/Navbar";
import LenisProvider from "@/components/Animations/LenisProvider";
import Footer from "@/components/LandingPage/Footer";
import { AuthProvider } from "@/components/Auth/AuthProvider";
import { createClient } from "@/utils/supabase/server";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Keyspace",
  description: "Find your perfect space or list your property",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${roboto_mono.variable} ${playfair_display.variable} ${bebas_neue.variable} ${urbanist.variable} ${allura.variable}`}
      >
        <AuthProvider initialUser={user}>
          <LenisProvider>
            <Navbar />
            {children}
            <Footer />
          </LenisProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
