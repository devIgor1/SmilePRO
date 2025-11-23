"use server";

import prisma from "@/lib/prisma";

export interface ClinicInfo {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  image: string | null;
  timezone: string | null;
  timeslots: string[];
  services: Array<{
    id: string;
    name: string;
    description: string | null;
    price: number;
    duration: number;
  }>;
}

/**
 * Get public clinic information including services and available timeslots
 * This is accessible without authentication
 */
export async function getClinicInfo(
  clinicId: string
): Promise<ClinicInfo | null> {
  try {
    const clinic = await prisma.user.findUnique({
      where: {
        id: clinicId,
        status: true, // Only active clinics
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        image: true,
        timezone: true,
        timeslots: true,
        services: {
          where: {
            isActive: true,
          },
          select: {
            id: true,
            name: true,
            description: true,
            price: true,
            duration: true,
          },
          orderBy: {
            name: "asc",
          },
        },
      },
    });

    if (!clinic) {
      return null;
    }

    return {
      id: clinic.id,
      name: clinic.name || "Clinic",
      email: clinic.email || "",
      phone: clinic.phone || "",
      address: clinic.address || "",
      image: clinic.image,
      timezone: clinic.timezone,
      timeslots: clinic.timeslots,
      services: clinic.services,
    };
  } catch (error) {
    console.error("Error fetching clinic info:", error);
    return null;
  }
}

