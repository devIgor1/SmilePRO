"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link2, Copy, CheckCircle2, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface BookingLinkCardProps {
  userId: string;
}

export function BookingLinkCard({ userId }: BookingLinkCardProps) {
  const [copied, setCopied] = useState(false);
  
  // Get the base URL from the browser
  const bookingUrl = typeof window !== "undefined" 
    ? `${window.location.origin}/clinic/${userId}`
    : "";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(bookingUrl);
      setCopied(true);
      toast.success("Booking link copied to clipboard!");
      
      // Reset the icon after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  const openInNewTab = () => {
    window.open(bookingUrl, "_blank");
  };

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-background via-background to-primary/5 overflow-hidden p-0 flex flex-col">
      <CardHeader className="border-b border-primary/10 bg-primary/10 rounded-t-xl px-6 pt-6 pb-6">
        <CardTitle className="flex items-center gap-2 text-primary">
          <Link2 className="h-5 w-5" />
          Public Booking Link
        </CardTitle>
        <CardDescription>
          Share this link with your patients for online booking
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 px-6 pb-6 space-y-4">
        {/* URL Display */}
        <div className="relative">
          <Input
            value={bookingUrl}
            readOnly
            className="pr-10 bg-muted/50 font-mono text-sm"
            onClick={(e) => e.currentTarget.select()}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <Link2 className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={copyToClipboard}
            className="flex-1"
            variant="default"
          >
            {copied ? (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" />
                Copy Link
              </>
            )}
          </Button>
          <Button
            onClick={openInNewTab}
            variant="outline"
            size="icon"
            title="Open in new tab"
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>

        {/* Info */}
        <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong className="text-foreground">💡 Tip:</strong> Share this link
            on your website, social media, or via email to allow patients to book
            appointments directly with your clinic.
          </p>
        </div>

        {/* QR Code Suggestion (Optional Enhancement) */}
        <div className="p-3 rounded-lg bg-muted/50 border border-muted">
          <p className="text-xs text-muted-foreground text-center">
            💡 Want to generate a QR code for this link?{" "}
            <a
              href={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(bookingUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              Click here
            </a>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

