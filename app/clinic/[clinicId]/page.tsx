import { notFound } from "next/navigation";
import { getClinicInfo } from "./_data-access/get-clinic-info";
import { ClinicHeader } from "./_components/clinic-header";
import { ServicesList } from "./_components/services-list";
import { BookingForm } from "./_components/booking-form";

interface PageProps {
  params: Promise<{
    clinicId: string;
  }>;
}

export default async function ClinicBookingPage({ params }: PageProps) {
  const { clinicId } = await params;
  const clinic = await getClinicInfo(clinicId);

  if (!clinic) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Clinic Header */}
        <ClinicHeader clinic={clinic} />

        {/* Services List */}
        <ServicesList services={clinic.services} />

        {/* Booking Form */}
        {clinic.services.length > 0 && clinic.timeslots.length > 0 ? (
          <BookingForm clinic={clinic} />
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>
              {clinic.services.length === 0
                ? "This clinic has no services available for booking at this time."
                : "This clinic has no available time slots configured."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

