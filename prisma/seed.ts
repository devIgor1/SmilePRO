import { config } from "dotenv";
import {
  PrismaClient,
  AppointmentStatus,
} from "../lib/generated/prisma/client";

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
        price: 15000,
        duration: 60,
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
        price: 20000,
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
        price: 80000,
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
        price: 10000,
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
        price: 50000,
        duration: 90,
        isActive: true,
        userId: user.id,
      },
    }),
  ]);

  console.log(`Created ${services.length} services`);

  // Create patients
  const patientsData = [
    {
      id: "patient-1",
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "21 99999-1111",
      dateOfBirth: new Date("1990-05-15"),
    },
    {
      id: "patient-2",
      name: "Michael Chen",
      email: "m.chen@email.com",
      phone: "21 99999-2222",
      dateOfBirth: new Date("1985-08-22"),
    },
    {
      id: "patient-3",
      name: "Emma Williams",
      email: "emma.w@email.com",
      phone: "21 99999-3333",
      dateOfBirth: new Date("1992-03-10"),
    },
    {
      id: "patient-4",
      name: "James Brown",
      email: "j.brown@email.com",
      phone: "21 99999-4444",
      dateOfBirth: new Date("1988-11-30"),
    },
    {
      id: "patient-5",
      name: "Lisa Anderson",
      email: "lisa.a@email.com",
      phone: "21 99999-5555",
      dateOfBirth: new Date("1995-07-18"),
    },
    {
      id: "patient-6",
      name: "John Smith",
      email: "john.s@email.com",
      phone: "21 98888-1111",
      dateOfBirth: new Date("1987-02-25"),
    },
    {
      id: "patient-7",
      name: "Maria Garcia",
      email: "maria.g@email.com",
      phone: "21 98888-2222",
      dateOfBirth: new Date("1993-09-14"),
    },
    {
      id: "patient-8",
      name: "Robert Taylor",
      email: "robert.t@email.com",
      phone: "21 98888-3333",
      dateOfBirth: new Date("1991-06-08"),
    },
  ];

  const patients = await Promise.all(
    patientsData.map((data) =>
      prisma.patient.upsert({
        where: { id: data.id },
        update: {},
        create: {
          ...data,
          userId: user.id,
        },
      })
    )
  );

  console.log(`Created ${patients.length} patients`);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const formatTime = (hour: number, minute: number) => {
    return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
  };

  const appointmentData = [
    { patientId: "patient-1", serviceIndex: 0 },
    { patientId: "patient-2", serviceIndex: 1 },
    { patientId: "patient-3", serviceIndex: 2 },
    { patientId: "patient-4", serviceIndex: 3 },
    { patientId: "patient-5", serviceIndex: 4 },
  ];

  let currentTime = 9 * 60;
  const appointments = [];

  for (let i = 0; i < appointmentData.length; i++) {
    const data = appointmentData[i];
    const service = services[data.serviceIndex];
    const patient = patients.find((p) => p.id === data.patientId);

    if (!patient) continue;

    const hour = Math.floor(currentTime / 60);
    const minute = currentTime % 60;
    const timeString = formatTime(hour, minute);

    const appointment = await prisma.appointment.upsert({
      where: { id: `apt-${i + 1}` },
      update: {},
      create: {
        id: `apt-${i + 1}`,
        patientId: patient.id,
        appointmentDate: today,
        appointmentTime: timeString,
        status: AppointmentStatus.CONFIRMED,
        serviceId: service.id,
        userId: user.id,
      },
    });

    appointments.push(appointment);
    console.log(`Created appointment: ${patient.name} at ${timeString} (${service.name}, ${service.duration} min)`);
    currentTime += service.duration + 30;
  }

  console.log(`Created ${appointments.length} appointments for today`);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const tomorrowAppointmentData = [
    { patientId: "patient-6", serviceIndex: 0 },
    { patientId: "patient-7", serviceIndex: 1 },
    { patientId: "patient-8", serviceIndex: 3 },
  ];

  let tomorrowTime = 9 * 60;
  const tomorrowAppointments = [];

  for (let i = 0; i < tomorrowAppointmentData.length; i++) {
    const data = tomorrowAppointmentData[i];
    const service = services[data.serviceIndex];
    const patient = patients.find((p) => p.id === data.patientId);

    if (!patient) continue;

    const hour = Math.floor(tomorrowTime / 60);
    const minute = tomorrowTime % 60;
    const timeString = formatTime(hour, minute);

    const appointment = await prisma.appointment.create({
      data: {
        patientId: patient.id,
        appointmentDate: tomorrow,
        appointmentTime: timeString,
        status: i === 0 ? AppointmentStatus.CONFIRMED : AppointmentStatus.PENDING,
        serviceId: service.id,
        userId: user.id,
      },
    });

    tomorrowAppointments.push(appointment);
    console.log(`Created appointment: ${patient.name} at ${timeString} (${service.name}, ${service.duration} min)`);
    tomorrowTime += service.duration + 30;
  }

  console.log(`Created ${tomorrowAppointments.length} appointments for tomorrow`);
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
