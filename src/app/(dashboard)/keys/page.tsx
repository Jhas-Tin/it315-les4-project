"use client";

import Link from "next/link";
import { Button } from "~/components/ui/button";
import { BookOpen, Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import CopyButton from "~/components/copy-button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Badge } from "~/components/ui/badge";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { redirect, useRouter } from "next/navigation";

type KeyItem = {
  id: string;
  name: string;
  masked: string;
  createdAt: string;
  revoked: boolean;
};

export default function KeysPage() {

  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/");
    }
  }, [isLoaded, isSignedIn, router]);
  if (!isLoaded) {
    return null;
  }
  if (!isSignedIn) {
    return null;
  }

  
  const [name, setName] = useState("My API Key");
  const [justCreated, setJustCreatedKey] = useState<{
    key: string;
    id: string;
  } | null>(null);
  const [loading, setIsLoading] = useState(false);
  const [items, setItems] = useState<KeyItem[]>([]);

  async function createKey() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      if (res.ok) {
        setJustCreatedKey({ key: data.key, id: data.id });
        await load();
      } else {
        alert(data.error ?? "Failed to create key");
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function load() {
  const res = await fetch("/api/keys", { cache: "no-store" });
  const data = await res.json();
  setItems(data.items ?? []);
  }

  async function revokeKey(id: string) {
    const res = await fetch(`/api/keys?keyId=${id}`, { method: "DELETE" });

    const data = await res.json();
    if (!res.ok) alert(data.error ?? "Failed to revoke");
    await load();
  }
  useEffect(() => {
    load();
  }, [createKey, revokeKey]);


  return (
    <div className="min-h-screen w-full bg-slate-200 flex flex-col">
      <div className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-12 space-y-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mt-4">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
              Manage Your API Keys
            </h1>
            <p className="text-slate-600 text-sm sm:text-base max-w-xl mt-2">
              Secure, generate, and manage your API keys with ease. Keep your
              keys safe and ready for integration.
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

        {/* Create Key */}
        <Card className="w-full bg-white/90 shadow-lg border border-slate-200 rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-bold text-slate-900">
              🔑 Generate a New API Key
            </CardTitle>
            <p className="text-sm text-slate-600">
              Give your API key a name and click{" "}
              <span className="font-semibold">Create</span> to get started.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                placeholder="My New API Key"
                className="flex-1 rounded-full px-4 py-2 border border-slate-300 shadow-sm"
                aria-label="API Key Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Button
                className="flex items-center gap-2 rounded-full px-6 py-2"
                onClick={createKey}
                disabled={loading}
                aria-label="Create API Key"
              >
                <Plus className="w-4 h-4" />
                Create
              </Button>
            </div>

            {justCreated && (
              <div className="rounded-xl border border-slate-200 p-5 bg-slate-50 shadow-sm">
                <p className="text-sm font-medium text-slate-600 mb-3">
                  Your new API key:
                </p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <code className="text-sm break-all font-mono bg-slate-900 text-white px-3 py-2 rounded-md">
                    {justCreated.key}
                  </code>
                  <CopyButton value={justCreated.key} />
                </div>
                <p className="text-xs text-slate-500 mt-3">
                  ⚠️ Save this key securely — it won’t be shown again.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Keys Table */}
        <Card className="w-full bg-white/90 shadow-lg border border-slate-200 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-slate-900">
              📂 Your Keys
            </CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table className="w-full min-w-[700px]">
              <TableHeader>
                <TableRow className="bg-slate-100">
                  <TableHead className="py-3 text-slate-800">Name</TableHead>
                  <TableHead className="text-slate-800">Key</TableHead>
                  <TableHead className="text-slate-800">Created</TableHead>
                  <TableHead className="text-slate-800">Status</TableHead>
                  <TableHead className="text-right text-slate-800">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.length > 0 ? (
                  items.map((row) => (
                    <TableRow
                      className="hover:bg-slate-50 transition"
                      key={row.id}
                    >
                      <TableCell className="font-semibold text-sm">
                        {row.name}
                      </TableCell>
                      <TableCell>
                        <code className="px-2 py-1 rounded bg-slate-900 text-white font-mono text-xs break-all">
                          {row.masked}
                        </code>
                      </TableCell>
                      <TableCell className="text-sm text-slate-600">
                        {new Date(
                          typeof row.createdAt === "number"
                            ? row.createdAt
                            : Date.parse(row.createdAt)
                        ).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {row.revoked ? (
                          <Badge className="rounded-full px-3 py-1 text-xs" 
                          >
                            Disabled
                          </Badge>
                        ) : (
                          <Badge className="rounded-full px-3 py-1 text-xs">
                            Active
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="destructive"
                          size="sm"
                          className="rounded-full px-4 py-1"
                          onClick={() => revokeKey(row.id)}
                          disabled={row.revoked}
                        >
                          Disable
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={10}
                      className="text-muted-foreground text-center text-sm py-6"
                    >
                      🚫 No API keys yet. Create one above to get started.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
