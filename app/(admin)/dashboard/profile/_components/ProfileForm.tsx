"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { updateUserData } from "../_data-access/update-user-data";
import { User, Mail, Phone, MapPin, Check, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { formatPhoneNumber } from "@/lib/utils";

interface ProfileFormProps {
  initialData: {
    name: string | null;
    email: string | null;
    phone: string | null;
    address: string | null;
  };
}

export function ProfileForm({ initialData }: ProfileFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [formData, setFormData] = useState({
    name: initialData.name || "",
    phone: initialData.phone ? formatPhoneNumber(initialData.phone) : "",
    address: initialData.address || "",
  });
  const [isDirty, setIsDirty] = useState(false);

  const handleChange = (field: string, value: string) => {
    if (field === "phone") {
      const formatted = formatPhoneNumber(value);
      setFormData((prev) => ({ ...prev, [field]: formatted }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
    setIsDirty(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      try {
        await updateUserData(formData);
        setIsDirty(false);
        router.refresh();
      } catch (error) {
        console.error("Failed to update profile:", error);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="border-primary/20 !bg-gradient-to-br from-background via-background to-primary/5 shadow-lg overflow-hidden p-0 flex flex-col">
        <CardHeader className="border-b border-primary/10 bg-primary/10 rounded-t-xl px-6 pt-6 pb-6">
          <CardTitle className="flex items-center gap-2 text-primary text-2xl">
            <User className="h-6 w-6" />
            Clinic Information
          </CardTitle>
          <CardDescription className="text-base">
            Update your clinic's contact details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6 px-6 pb-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                Name
              </label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Enter your name"
                className="bg-background border-primary/20 focus-visible:border-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                Email
              </label>
              <Input
                type="email"
                value={initialData.email || ""}
                disabled
                className="bg-muted/50 text-muted-foreground cursor-not-allowed border-primary/10"
              />
              <p className="text-xs text-muted-foreground">
                Email cannot be changed
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                Phone
              </label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="21 99999-9999"
                maxLength={15}
                className="bg-background border-primary/20 focus-visible:border-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Address
              </label>
              <Input
                type="text"
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
                placeholder="Enter your address"
                className="bg-background border-primary/20 focus-visible:border-primary"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 flex items-center justify-end gap-4">
        {isDirty && (
          <p className="text-sm text-muted-foreground">
            You have unsaved changes
          </p>
        )}
        <Button
          type="submit"
          disabled={!isDirty || isPending}
          className="min-w-[120px]"
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Check className="h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
