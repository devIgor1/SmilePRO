"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { updateUserData } from "../_data-access/update-user-data";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Check,
  Loader2,
  Globe,
  ToggleLeft,
  Clock,
  Info,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { formatPhoneNumber } from "@/lib/utils";
import {
  profileFormSchema,
  type ProfileFormData,
} from "../_schemas/profile-form-schema";
import { TimeSlotsDialog } from "./TimeSlotsDialog";
import { getTimezoneOptions } from "@/lib/config/timezones";

interface ProfileFormProps {
  initialData: {
    name: string | null;
    email: string | null;
    phone: string | null;
    address: string | null;
    status: boolean;
    timezone: string | null;
    timeslots: string[];
  };
}

const TIMEZONE_OPTIONS = getTimezoneOptions();

export function ProfileForm({ initialData }: ProfileFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [formData, setFormData] = useState({
    name: initialData.name || "",
    phone: initialData.phone ? formatPhoneNumber(initialData.phone) : "",
    address: initialData.address || "",
    status: initialData.status ?? true,
    timezone: initialData.timezone || "",
    timeslots: initialData.timeslots || [],
  });
  const [isDirty, setIsDirty] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string | boolean) => {
    if (field === "phone") {
      const formatted = formatPhoneNumber(value as string);
      setFormData((prev) => ({ ...prev, [field]: formatted }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
    setIsDirty(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    const validationResult = profileFormSchema.safeParse(formData);

    if (!validationResult.success) {
      const fieldErrors: Record<string, string> = {};
      validationResult.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0].toString()] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    startTransition(async () => {
      try {
        await updateUserData(validationResult.data);
        setIsDirty(false);
        setErrors({});
        router.refresh();
      } catch (error) {
        console.error("Failed to update profile:", error);
        setErrors({ submit: "Failed to update profile. Please try again." });
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
                className={`bg-background border-primary/20 focus-visible:border-primary ${
                  errors.name ? "border-destructive" : ""
                }`}
              />
              {errors.name && (
                <p className="text-xs text-destructive">{errors.name}</p>
              )}
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
                className={`bg-background border-primary/20 focus-visible:border-primary ${
                  errors.phone ? "border-destructive" : ""
                }`}
              />
              {errors.phone && (
                <p className="text-xs text-destructive">{errors.phone}</p>
              )}
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
              {errors.address && (
                <p className="text-xs text-destructive">{errors.address}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Globe className="h-4 w-4 text-primary" />
                Timezone
              </label>
              <Select
                value={formData.timezone || ""}
                onValueChange={(value) => handleChange("timezone", value)}
              >
                <SelectTrigger
                  className={`w-full bg-background border-primary/20 focus:border-primary ${
                    errors.timezone ? "border-destructive" : ""
                  }`}
                >
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  {TIMEZONE_OPTIONS.map((tz) => (
                    <SelectItem key={tz.value} value={tz.value}>
                      {tz.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.timezone && (
                <p className="text-xs text-destructive">{errors.timezone}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                <ToggleLeft className="h-4 w-4 text-primary" />
                Status
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button type="button" className="inline-flex">
                      <Info className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground transition-colors" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Indicates whether your clinic is open or closed</p>
                  </TooltipContent>
                </Tooltip>
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleChange("status", !formData.status)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                    formData.status ? "bg-primary" : "bg-muted"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      formData.status ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
                <span className="text-sm text-muted-foreground">
                  {formData.status ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                Available Times
              </label>
              <TimeSlotsDialog
                selectedTimes={formData.timeslots}
                onTimesChange={(times) => {
                  setFormData((prev) => ({ ...prev, timeslots: times }));
                  setIsDirty(true);
                  if (errors.timeslots) {
                    setErrors((prev) => {
                      const newErrors = { ...prev };
                      delete newErrors.timeslots;
                      return newErrors;
                    });
                  }
                }}
              />
              {formData.timeslots.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.timeslots.slice(0, 5).map((time) => (
                    <span
                      key={time}
                      className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
                    >
                      {time}
                    </span>
                  ))}
                  {formData.timeslots.length > 5 && (
                    <span className="text-xs text-muted-foreground px-2 py-1">
                      +{formData.timeslots.length - 5} more
                    </span>
                  )}
                </div>
              )}
              {errors.timeslots && (
                <p className="text-xs text-destructive">{errors.timeslots}</p>
              )}
            </div>
          </div>
          {errors.submit && (
            <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3">
              <p className="text-sm text-destructive">{errors.submit}</p>
            </div>
          )}
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
