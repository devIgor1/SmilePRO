import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";
import AppointmentContent from "./_components/appointment-content";
import { getAppointmentsByDate } from "./_data-access/get-appointments-by-date";
import { getAllServices } from "../services/_data-access/get-all-services";
import { getUserData } from "../profile/_data-access/get-user-data";

export default async function Appointments() {
  const session = await getSession();

  if (!session) {
    redirect("/");
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
