import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
// import Footer from "@/components/footer";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | My Mood",
    default: "Mood",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${raleway.className} antialisaed`}>
        <Navbar />
        <main className="bg-gray-50 min-h-screen">{children}</main>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
