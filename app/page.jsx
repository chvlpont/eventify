import React from "react";
import Navbar from "@/components/navbar";
import Link from "next/link";
import { SignedOut } from "@clerk/nextjs";
import Footer from "@/components/footer";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-col justify-center items-center flex-grow relative">
        <video
          className="absolute top-0 left-0 z-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          preload="none"
        >
          <source src="/video/sweden.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="nunito font-bold flex flex-col justify-center items-center text-8xl gap-5 z-10">
          <div className="underline">Welcome</div>
          <div className="underline">To</div>
          <div className="text-white p-1 underline">Eventify</div>
          <SignedOut>
            <Link href="/sign-in">
              <div className="cursor-pointer text-lg flex gap-1.5 mt-10 px-3 py-1 border border-white hover:bg-white hover:text-black duration-300">
                <span>Sign in</span>
                <span>to browse events</span>
              </div>
            </Link>
          </SignedOut>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
