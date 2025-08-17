import {  KeyRound} from "lucide-react";
import Link from "next/link";
import { Separator } from "node_modules/@radix-ui/react-separator/dist";
import { Button } from "~/components/ui/button";

export default function DocsPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
    <div className="flex  items-center justify-between">
        <h1 className="text-lg font-medium">API Guide</h1>
        <div className="flex gap-2">
            <Link href={"/keys"}>
                <Button variant={"outline"} className="flex items-center gap-2" aria-label="Open Api Guide">
                    <KeyRound />
                    Keys Dashboard
                </Button>
            </Link> 
        </div>
      </div>
      <Separator />
        <p>
        GO back to API Keys Dashboard to
        See the <Link href={"/keys"} className="underline">API keys</Link> 
        </p>
      </div>
  );
}
 