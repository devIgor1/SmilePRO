import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";
import ServiceContent from "./_components/service-content";
import { getAllServices } from "./_data-access/get-all-services";

export default async function Services() {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  const services = await getAllServices(session.user.id);

  return <ServiceContent userId={session.user.id} initialServices={services} />;
}
