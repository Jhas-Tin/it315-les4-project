import { auth } from "@clerk/nextjs/server";
import {  KeyRound} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Separator } from "node_modules/@radix-ui/react-separator/dist";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";

export default async function DocsPage() {
  const { userId } = await auth();
  
   if (!userId) redirect("/");
  return (
  <div className="min-h-screen w-full bg-slate-200 flex flex-col">
    <div className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-12 space-y-12">
      
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
          API Guide
        </h1>
        <div className="flex gap-2">
          <Link href={"/keys"}>
            <Button
              variant="secondary"
              className="flex items-center gap-2 rounded-full px-6 py-2 shadow-md hover:shadow-lg transition"
            >
              <KeyRound className="w-5 h-5" />
              Keys Dashboard
            </Button>
          </Link>
        </div>
      </div>

      <Card className="w-full bg-white/90 shadow-lg border border-slate-200 rounded-2xl p-6">
        <p className="text-slate-700 text-sm sm:text-base">
          Go back to your API Keys Dashboard to manage your keys.{" "}
          <Link
            href={"/keys"}
            className="font-medium text-cyan-600 hover:underline"
          >
            View API Keys
          </Link>
        </p>
      </Card>

      <Card className="w-full bg-white/90 border border-slate-200 rounded-2xl shadow p-6">
        <p className="text-sm text-slate-600 text-center sm:text-left">
          💡 Pro Tip: Keep your API keys safe and never share them publicly.
        </p>
      </Card>
    </div>
  </div>
);


}
 