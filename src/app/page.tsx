import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function HomePage() {
  return (
    <main className="">
      <SignedOut>
        <div className="h-full w-full text-center text-2xl">
          Pls sign in to access the app.
        </div>
      </SignedOut>
      <SignedIn>
        {redirect("keys")}
      </SignedIn>
    </main>
  );
}
