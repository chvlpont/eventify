import React from "react";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <div className="w-full h-16 flex items-center justify-between fixed top-0 left-0 z-50 px-4 bg-neutral-900 transition duration-200">
      <div className="nunito text-white text-xl font-bold">Eventify</div>
      <SignedIn>
        <div className="flex gap-8">
          <Link href="/">
            <div className="cursor-pointer font-bold hover:underline text-white">
              Home
            </div>
          </Link>
          <Link href="/events">
            <div className="cursor-pointer font-bold hover:underline text-white">
              Events
            </div>
          </Link>
          <div className="cursor-pointer font-bold hover:underline text-white">
            About
          </div>
        </div>
      </SignedIn>
      <div className="flex gap-8">
        <SignedOut>
          <Link href="/sign-in">
            <div className="cursor-pointer font-bold hover:underline text-white">
              Sign in
            </div>
          </Link>
          <Link href="/sign-up">
            <div className="cursor-pointer font-bold hover:underline text-white">
              Sign up
            </div>
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default Navbar;
