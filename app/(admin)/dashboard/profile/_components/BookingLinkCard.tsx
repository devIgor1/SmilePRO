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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link2, Copy, CheckCircle2, ExternalLink, QrCode, Download } from "lucide-react";
import { toast } from "sonner";

interface BookingLinkCardProps {
  userId: string;
}

export function BookingLinkCard({ userId }: BookingLinkCardProps) {
  const [copied, setCopied] = useState(false);
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  
  // Get the base URL from the browser
  const bookingUrl = typeof window !== "undefined" 
    ? `${window.location.origin}/clinic/${userId}`
    : "";

  const qrCodeUrl = bookingUrl 
    ? `/api/qr-code/generate?url=${encodeURIComponent(bookingUrl)}`
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

  const downloadQRCode = () => {
    if (!qrCodeUrl) return;
    
    const link = document.createElement("a");
    link.href = qrCodeUrl;
    link.download = `qr-code-clinic-${userId}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("QR Code downloaded successfully!");
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

        {/* QR Code Section */}
        <div className="space-y-2">
          <Dialog open={qrDialogOpen} onOpenChange={setQrDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                <QrCode className="mr-2 h-4 w-4" />
                View QR Code
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>QR Code for Booking</DialogTitle>
                <DialogDescription>
                  Share this QR code for patients to book appointments
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col items-center space-y-4 py-4">
                {/* QR Code Image */}
                <div className="p-4 bg-white rounded-lg border-2 border-primary/20">
                  {qrCodeUrl && (
                    <img
                      src={qrCodeUrl}
                      alt="Booking QR Code"
                      className="w-64 h-64"
                    />
                  )}
                </div>

                {/* Download Button */}
                <Button
                  onClick={downloadQRCode}
                  className="w-full"
                  variant="default"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download QR Code
                </Button>

                {/* Usage Tips */}
                <div className="w-full p-3 rounded-lg bg-primary/5 border border-primary/10">
                  <p className="text-xs text-muted-foreground">
                    <strong className="text-foreground">💡 Usage Tips:</strong>
                    <br />
                    • Print and display at reception
                    <br />
                    • Add to business cards
                    <br />
                    • Share on social media
                    <br />• Include in email signatures
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}

