"use server";

import prisma from "@/lib/prisma";

export interface ActiveClinic {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  image: string | null;
  _count: {
    services: number;
    appointments: number;
  };
}

/**
 * Get active clinics for public display on home page
 * Only shows clinics that are active and have services available
 */
export async function getActiveClinics(): Promise<ActiveClinic[]> {
  try {
    const clinics = await prisma.user.findMany({
      where: {
        status: true, // Only active clinics
        services: {
          some: {
            isActive: true, // Has at least one active service
          },
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        image: true,
        _count: {
          select: {
            services: {
              where: {
                isActive: true,
              },
            },
            appointments: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
      take: 6, // Limit to 6 clinics for the home page
    });

    return clinics.map((clinic) => ({
      id: clinic.id,
      name: clinic.name || "Dental Clinic",
      email: clinic.email || "",
      phone: clinic.phone || "",
      address: clinic.address || "",
      image: clinic.image,
      _count: clinic._count,
    }));
  } catch (error) {
    console.error("Error fetching active clinics:", error);
    return [];
  }
}

