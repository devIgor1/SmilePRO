import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";
import { getAllPatients } from "./_data-access/get-all-patients";
import { getPatientStats } from "./_data-access/get-patient-stats";
import PatientsContent from "./_components/patients-content";

export default async function PatientsPage() {
  const session = await getSession();

  if (!session) {
    redirect("/");
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
