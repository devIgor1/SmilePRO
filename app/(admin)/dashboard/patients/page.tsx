import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";
import { getAllPatients } from "./_data-access/get-all-patients";
import { getPatientStats } from "./_data-access/get-patient-stats";
import PatientsContent from "./_components/patients-content";
import { hasAccess } from "@/utils/permissions/has-access";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

export default async function PatientsPage() {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  // Check if user has access (active subscription or trial)
  const accessStatus = await hasAccess(session);

  // If no access, show access denied message
  if (!accessStatus.hasAccess) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Patients
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your clinic patients
          </p>
        </div>
        <Card className="border-red-500/50 bg-red-500/10">
          <CardContent className="pt-6 pb-6 px-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-500 mt-0.5" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-red-900 dark:text-red-100 mb-2">
                  Access Restricted
                </CardTitle>
                <CardDescription className="text-red-800 dark:text-red-200 mb-4">
                  You need an active subscription or trial plan to access
                  patients. Please upgrade to a paid plan to continue using this
                  feature.
                </CardDescription>
                <Button
                  asChild
                  className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                >
                  <Link href="/dashboard/plans">View Plans</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const [patients, stats] = await Promise.all([
    getAllPatients(session.user.id),
    getPatientStats(session.user.id),
  ]);

  return (
    <PatientsContent
      userId={session.user.id}
      initialPatients={patients}
      stats={stats}
    />
  );
}
