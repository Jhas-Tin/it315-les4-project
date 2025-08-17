import Link from "next/link";
import { Button } from "~/components/ui/button";
import { BookOpen, Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { Input } from "~/components/ui/input";
import CopyButton from "~/components/copy-button";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";



export default async function KeysPage() {
  
  const { userId } = await auth();
    if (!userId) redirect("/");

  const sampleApiKey = "sfbeuteojsfyelwvvwkasf"; 
  return (
  <div className="min-h-screen w-full bg-slate-200 flex flex-col">

    <div className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-12 space-y-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mt-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
            Manage Your API Keys
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mt-2">
            Secure, generate, and manage your API keys with ease. Keep your keys safe and ready for integration.
          </p>
        </div>

        <div className="flex justify-center sm:justify-end w-full sm:w-auto">
          <Link href={"/docs"}>
            <Button
              variant="secondary"
              className="flex items-center gap-2 rounded-full px-6 py-2 shadow-md hover:shadow-lg transition"
            >
              <BookOpen className="w-5 h-5" />
              API Documentation
            </Button>
          </Link>
        </div>
      </div>

      <Card className="w-full bg-white/90 shadow-lg border border-slate-200 rounded-2xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold text-slate-900">
            🔑 Generate a New API Key
          </CardTitle>
          <p className="text-sm text-slate-600">
            Give your API key a name and click <span className="font-semibold">Create</span> to get started.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              placeholder="My New API Key"
              className="flex-1 rounded-full px-4 py-2 border border-slate-300 shadow-sm"
            />
            <Button className="flex items-center gap-2 rounded-full px-6 py-2">
              <Plus className="w-4 h-4" />
              Create
            </Button>
          </div>

          <div className="rounded-xl border border-slate-200 p-5 bg-slate-50 shadow-sm">
            <p className="text-sm font-medium text-slate-600 mb-3">Your new API key:</p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <code className="text-sm break-all font-mono bg-slate-900 text-white px-3 py-2 rounded-md">
                {sampleApiKey}
              </code>
              <CopyButton value={sampleApiKey} />
            </div>
            <p className="text-xs text-slate-500 mt-3">
              ⚠️ Save this key securely — it won’t be shown again.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full bg-white/90 shadow-lg border border-slate-200 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-900">📂 Your Keys</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table className="w-full min-w-[700px]">
            <TableHeader>
              <TableRow className="bg-slate-100">
                <TableHead className="py-3 text-slate-800">Name</TableHead>
                <TableHead className="text-slate-800">Key</TableHead>
                <TableHead className="text-slate-800">Created</TableHead>
                <TableHead className="text-slate-800">Status</TableHead>
                <TableHead className="text-right text-slate-800">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {/* <TableRow className="hover:bg-slate-50 transition">
                <TableCell className="font-semibold text-sm">Name of API Key</TableCell>
                <TableCell>
                  <code className="px-2 py-1 rounded bg-slate-900 text-white font-mono text-xs break-all">
                    {sampleApiKey}
                  </code>
                </TableCell>
                <TableCell className="text-sm text-slate-600">08/15/2025</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
                    Revoked
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="destructive" size="sm" className="rounded-full px-4 py-1">
                    Revoke
                  </Button>
                </TableCell>
              </TableRow> */}
              <TableRow className="hover:bg-white/5 transition">
                <TableCell
                  colSpan={5}
                  className="text-muted-foreground text-center text-sm py-6"
                >
                  🚫 No API keys yet. Create one above to get started.
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="w-full bg-white/90 border border-slate-200 rounded-2xl shadow p-6">
        <p className="text-sm text-slate-600 text-center sm:text-left">
          💡 Pro Tip: Use your <code className="font-mono">API</code> key in the{" "}
          <span className="font-semibold">Authorization</span> header.  
          Learn more in the{" "}
          <Link href={"/docs"} className="font-medium text-cyan-600 hover:underline">
            Docs
          </Link>.
        </p>
      </Card>
    </div>
  </div>
);


}
