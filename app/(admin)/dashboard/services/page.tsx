import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";
import ServiceContent from "./_components/service-content";
import { getAllServices } from "./_data-access/get-all-services";
import { canPermission } from "@/utils/permissions/canPermission";

export default async function Services() {
  const session = await getSession();

  if (!session?.user.id) {
    redirect("/");
  }

  const services = await getAllServices(session.user.id);
  const permissions = await canPermission({ type: "service" });

  return (
    <ServiceContent
      userId={session.user.id}
      initialServices={services}
      permissions={permissions}
    />
  );
}
