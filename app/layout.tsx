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

export const metadata: Metadata = {
  title: "Keyspace",
  description: "Find your perfect space or list your property",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${roboto_mono.variable} ${playfair_display.variable} ${bebas_neue.variable} ${urbanist.variable} ${allura.variable}`}
      >
        <Navbar />
        <LenisProvider>{children}</LenisProvider>
        <Footer />
      </body>
    </html>
  );
}
