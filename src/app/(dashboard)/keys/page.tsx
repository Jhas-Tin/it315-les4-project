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



export default function KeysPage() {

  const sampleApiKey = "sfbeuteojsfyelwvvwkasf"; 
  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      
      <div className="flex  items-center justify-between">
        <h1 className="text-lg font-medium">API Keys</h1>
        <div className="flex gap-2">
            <Link href={"/docs"}>
                <Button variant={"outline"} className="flex items-center gap-2" aria-label="Open Api Guide">
                    <BookOpen />
                    View API Documentation
                </Button>
            </Link>
        </div>
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-8">
          <CardTitle>Generate API Key</CardTitle>
          <Button className="flex items-center gap-2" aria-label="Create API Key">
            <Plus />
            Create
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap--2">
            <Input placeholder="Enter API Key Name" aria-label="API Key Name"/>
          </div>
          {/* Should not visible if no API Key Name is exist */}
          <div className="rounded-md border p-4 bg-muted">
            <p className="text-sm font-medium text-muted-foreground">
              Note: API Keys are used to authenticate requests to the API. Make sure to keep them secure and do not share them publicly. (visible once):
            </p>
            <div className="mt-2 flex items-center gap-2">
              <code className="text-sm break-all">
               {/* API Key Value */}
               {sampleApiKey}
              </code>
              <CopyButton value={sampleApiKey}/>

            </div>
            <p className="text-sm text-muted-foreground mt-2">
                Save this key securely, as it will not be shown again.
              </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Keys</CardTitle>
          
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead >Name</TableHead>
                <TableHead>Key</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* <TableRow>
                <TableCell>Name of API Key</TableCell>
                <TableCell className="font-mono">{sampleApiKey}</TableCell>
                <TableCell>08/15/2025</TableCell>
                <TableCell>
                  
                  <Badge variant={"secondary"}>Revoked</Badge>
                  </TableCell>
                <TableCell className="text-right">
                  <Button variant={"destructive"} size={"sm"} >
                    Revoke
                  </Button>
                </TableCell>
              </TableRow> */}

              <TableRow>
                <TableCell colSpan={5} className="text-muted-foreground text-center text-sm">
                  No API keys found. Please create a new key to get started.
                </TableCell>
                
              </TableRow>

            </TableBody>
          </Table>
        </CardContent>   
      </Card>

      <Separator />
      <p>Tip: Call secured endpoints with your <code>API</code> key in the Authorization header. See{" "}
      <Link href={"/docs"} className="underline">Docs</Link> for more details.</p>
    </div>
  );
}
