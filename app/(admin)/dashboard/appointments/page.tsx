import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";
import AppointmentContent from "./_components/appointment-content";
import { getAppointmentsByDate } from "./_data-access/get-appointments-by-date";
import { getAllServices } from "../services/_data-access/get-all-services";
import { getUserData } from "../profile/_data-access/get-user-data";
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
export default async function Appointments() {
  const session = await getSession();

  if (!session?.user.id) {
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
            Agendamentos
          </h1>
          <p className="text-muted-foreground mt-2">Agendamentos</p>
        </div>
        <Card className="border-red-500/50 bg-red-500/10">
          <CardContent className="pt-6 pb-6 px-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-500 mt-0.5" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-red-900 dark:text-red-100 mb-2">
                  Acesso Restrito
                </CardTitle>
                <CardDescription className="text-red-800 dark:text-red-200 mb-4">
                  Você precisa de uma assinatura ativa ou plano de teste para
                  acessar este recurso. Por favor, faça upgrade para um plano
                  pago para continuar usando este recurso.
                </CardDescription>
                <Button
                  asChild
                  className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                >
                  <Link href="/dashboard/plans">Ver Planos</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const today = new Date();
  const [appointments, services, userData] = await Promise.all([
    getAppointmentsByDate({ userId: session.user.id, date: today }),
    getAllServices(session.user.id),
    getUserData({ userId: session.user.id }),
  ]);

  return (
    <AppointmentContent
      userId={session.user.id}
      initialAppointments={appointments}
      initialServices={services}
      initialDate={today}
      userTimeslots={userData.timeslots || []}
    />
  );
}
