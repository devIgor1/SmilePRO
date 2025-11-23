import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-primary/5">
      <div className="text-center space-y-6 p-8">
        <AlertCircle className="h-24 w-24 text-muted-foreground mx-auto" />
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Clinic Not Found</h1>
          <p className="text-muted-foreground max-w-md">
            The clinic you're looking for doesn't exist or is no longer active.
          </p>
        </div>
        <Button asChild>
          <Link href="/">Go to Homepage</Link>
        </Button>
      </div>
    </div>
  );
}

