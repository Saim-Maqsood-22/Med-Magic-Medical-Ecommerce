import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";
import Whatsapp from "./components/Whatsapp";
import VoiceControl from "./components/Voice";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import SeasonalHealthAlert from "./components/SeasonalAlerts";
import AiEducator from "./components/AiEducator";
import SkinCare from "./components/SkinCare";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "medMagic - Home",
  description: "One stop solution for all your medical needs",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
           <header className="flex justify-end items-center p-4 gap-4 h-16 text-white">
            <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <div className="bg-white rounded-lg">
              <UserButton showName />
              </div>
            </SignedIn>
          </header>
        <Navbar />
        <SeasonalHealthAlert/>
        {children}
        <ChatBot />
        <AiEducator />
        <SkinCare />
        <Whatsapp />
        <VoiceControl />
        <Footer />
        </body>
      </html>
      </ClerkProvider>
  );
}
