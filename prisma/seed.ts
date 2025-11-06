import { config } from "dotenv";
import { PrismaClient } from "../lib/generated/prisma/client";

// Load environment variables
config();

const prisma = new PrismaClient();

async function main() {
  console.log("Starting seed...");

  // Get the first user (you'll need to be logged in first)
  const user = await prisma.user.findFirst();

  if (!user) {
    console.error("No user found. Please sign up first, then run the seed.");
    return;
  }

  console.log(`Found user: ${user.email}`);

  // Create services
  const services = await Promise.all([
    prisma.service.upsert({
      where: { id: "service-1" },
      update: {},
      create: {
        id: "service-1",
        name: "Routine Checkup",
        description: "Regular dental checkup and cleaning",
        price: 15000, // R$ 150.00
        duration: 60, // 60 minutes
        isActive: true,
        userId: user.id,
      },
    }),
    prisma.service.upsert({
      where: { id: "service-2" },
      update: {},
      create: {
        id: "service-2",
        name: "Teeth Cleaning",
        description: "Professional teeth cleaning and polishing",
        price: 20000, // R$ 200.00
        duration: 45,
        isActive: true,
        userId: user.id,
      },
    }),
    prisma.service.upsert({
      where: { id: "service-3" },
      update: {},
      create: {
        id: "service-3",
        name: "Root Canal",
        description: "Root canal treatment",
        price: 80000, // R$ 800.00
        duration: 120,
        isActive: true,
        userId: user.id,
      },
    }),
    prisma.service.upsert({
      where: { id: "service-4" },
      update: {},
      create: {
        id: "service-4",
        name: "Consultation",
        description: "Initial consultation and diagnosis",
        price: 10000, // R$ 100.00
        duration: 30,
        isActive: true,
        userId: user.id,
      },
    }),
    prisma.service.upsert({
      where: { id: "service-5" },
      update: {},
      create: {
        id: "service-5",
        name: "Teeth Whitening",
        description: "Professional teeth whitening treatment",
        price: 50000, // R$ 500.00
        duration: 90,
        isActive: true,
        userId: user.id,
      },
    }),
  ]);

  console.log(`Created ${services.length} services`);

  // Create appointments for today with proper spacing
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Helper function to format time
  const formatTime = (hour: number, minute: number) => {
    return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
  };

  // Schedule appointments with 30-minute buffer between sessions
  const appointmentData = [
    {
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "21 99999-1111",
      serviceIndex: 0,
    },
    {
      name: "Michael Chen",
      email: "m.chen@email.com",
      phone: "21 99999-2222",
      serviceIndex: 1,
    },
    {
      name: "Emma Williams",
      email: "emma.w@email.com",
      phone: "21 99999-3333",
      serviceIndex: 2,
    },
    {
      name: "James Brown",
      email: "j.brown@email.com",
      phone: "21 99999-4444",
      serviceIndex: 3,
    },
    {
      name: "Lisa Anderson",
      email: "lisa.a@email.com",
      phone: "21 99999-5555",
      serviceIndex: 4,
    },
  ];

  let currentTime = 9 * 60; // Start at 9:00 AM (in minutes)
  const appointments = [];

  for (let i = 0; i < appointmentData.length; i++) {
    const data = appointmentData[i];
    const service = services[data.serviceIndex];

    const hour = Math.floor(currentTime / 60);
    const minute = currentTime % 60;
    const timeString = formatTime(hour, minute);

    const appointment = await prisma.appointment.upsert({
      where: { id: `apt-${i + 1}` },
      update: {},
      create: {
        id: `apt-${i + 1}`,
        name: data.name,
        email: data.email,
        phone: data.phone,
        appointmentDate: today,
        appointmentTime: timeString,
        serviceId: service.id,
        userId: user.id,
      },
    });

    appointments.push(appointment);
    console.log(
      `Created appointment: ${data.name} at ${timeString} (${service.name}, ${service.duration} min)`
    );

    // Add service duration + 30 minute buffer
    currentTime += service.duration + 30;
  }

  console.log(`Created ${appointments.length} appointments for today`);

  // Create appointments for tomorrow with proper spacing
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const tomorrowAppointmentData = [
    {
      name: "John Smith",
      email: "john.s@email.com",
      phone: "21 98888-1111",
      serviceIndex: 0,
    },
    {
      name: "Maria Garcia",
      email: "maria.g@email.com",
      phone: "21 98888-2222",
      serviceIndex: 1,
    },
    {
      name: "Robert Taylor",
      email: "robert.t@email.com",
      phone: "21 98888-3333",
      serviceIndex: 3,
    },
  ];

  let tomorrowTime = 9 * 60; // Start at 9:00 AM
  const tomorrowAppointments = [];

  for (const data of tomorrowAppointmentData) {
    const service = services[data.serviceIndex];

    const hour = Math.floor(tomorrowTime / 60);
    const minute = tomorrowTime % 60;
    const timeString = formatTime(hour, minute);

    const appointment = await prisma.appointment.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        appointmentDate: tomorrow,
        appointmentTime: timeString,
        serviceId: service.id,
        userId: user.id,
      },
    });

    tomorrowAppointments.push(appointment);
    console.log(
      `Created appointment: ${data.name} at ${timeString} (${service.name}, ${service.duration} min)`
    );

    // Add service duration + 30 minute buffer
    tomorrowTime += service.duration + 30;
  }

  console.log(
    `Created ${tomorrowAppointments.length} appointments for tomorrow`
  );

  console.log("Seed completed successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
