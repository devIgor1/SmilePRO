import { getAllServices } from "../_data-access/get-all-services";

interface ServiceContentProps {
  userId: string;
}

export default async function ServiceContent({ userId }: ServiceContentProps) {
  const services = await getAllServices(userId);

  return (
    <div>
      <h1>Services</h1>
    </div>
  );
}
