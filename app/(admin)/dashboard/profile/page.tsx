import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";
import { getUserData } from "./_data-access/get-user-data";
import { ProfileForm } from "./_components/ProfileForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, CreditCard, Sparkles } from "lucide-react";

export default async function Profile() {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  const userData = await getUserData({ userId: session.user.id });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Clinic Profile
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your clinic information and settings
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant={userData.status ? "default" : "secondary"}
            className="gap-2 px-4 py-2"
          >
            <Shield className="h-4 w-4" />
            {userData.status ? "Active" : "Inactive"}
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        {/* Main Clinic Information */}
        <div className="space-y-6">
          <ProfileForm
            initialData={{
              name: userData.name,
              email: userData.email,
              phone: userData.phone,
              address: userData.address,
              status: userData.status,
              timezone: userData.timezone,
              timeslots: userData.timeslots || [],
            }}
          />
        </div>

        {/* Sidebar with Subscription */}
        <div className="space-y-6">
          <Card className="border-primary/20 bg-gradient-to-br from-background via-background to-primary/5 overflow-hidden p-0 flex flex-col">
            <CardHeader className="border-b border-primary/10 bg-primary/10 rounded-t-xl px-6 pt-6 pb-6">
              <CardTitle className="flex items-center gap-2 text-primary">
                <Sparkles className="h-5 w-5" />
                Subscription
              </CardTitle>
              <CardDescription>Your current plan</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 px-6 pb-6">
              {userData.subscription ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-primary/10 border border-primary/20">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Plan
                      </p>
                      <p className="text-2xl font-bold text-primary capitalize mt-1">
                        {userData.subscription.plan}
                      </p>
                    </div>
                    <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
                      <CreditCard className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <span className="text-sm font-medium text-muted-foreground">
                      Status
                    </span>
                    <Badge variant="default" className="capitalize">
                      {userData.subscription.status}
                    </Badge>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-sm text-muted-foreground">
                    No active subscription
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
