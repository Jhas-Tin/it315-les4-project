"use client";

import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.replace("/keys"); 
    }
  }, [isSignedIn, router]);

  return (
    <main className="">
      <SignedOut>
        <div className="text-center text-2xl">
          Please sign in to access the site.
        </div>
      </SignedOut>
      <SignedIn>
        <div className="h-screen flex items-center justify-center text-lg">Redirecting...</div>
      </SignedIn>
    </main>
  );
}
