export type Language = "en" | "pt-BR";

export interface Translations {
  __language?: Language;
  // Common
  common: {
    loading: string;
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    create: string;
    search: string;
    filter: string;
    actions: string;
    close: string;
    confirm: string;
    yes: string;
    no: string;
  };

  // Navigation
  nav: {
    home: string;
    features: string;
    professionals: string;
    pricing: string;
    dashboard: string;
    appointments: string;
    patients: string;
    services: string;
    plans: string;
    profile: string;
    logOut: string;
    signIn: string;
    getStarted: string;
    navigation: string;
  };

  // Home Page
  home: {
    hero: {
      badge: string;
      titlePart1: string;
      titlePart2: string;
      subtitle: string;
      cta: string;
      trialText: string;
    };
    features: {
      title: string;
      subtitle: string;
      smartScheduling: {
        title: string;
        description: string;
      };
      patientManagement: {
        title: string;
        description: string;
      };
      analytics: {
        title: string;
        description: string;
      };
      serviceManagement: {
        title: string;
        description: string;
      };
      secure: {
        title: string;
        description: string;
      };
      easyToUse: {
        title: string;
        description: string;
      };
    };
    professionals: {
      title: string;
      subtitle: string;
      noClinics: string;
      services: string;
      activeClinic: string;
      appointmentsCompleted: string;
      bookAppointment: string;
      showing: string;
      featured: string;
      clinic: string;
      clinics: string;
      acceptingBookings: string;
    };
    pricing: {
      title: string;
      subtitle: string;
      dashboardTitle: string;
      dashboardSubtitle: string;
      mostPopular: string;
      perMonth: string;
      activateSubscription: string;
      redirectingToCheckout: string;
      planNames: {
        basic: string;
        professional: string;
      };
    };
    cta: {
      title: string;
      subtitle: string;
      button: string;
    };
  };

  // Dashboard
  dashboard: {
    title: string;
    welcome: string;
    stats: {
      totalAppointments: string;
      totalPatients: string;
      totalServices: string;
      revenue: string;
    };
    trial: {
      onTrial: string;
      daysRemaining: string;
      day: string;
      days: string;
      trialEnded: string;
      enjoyAccess: string;
      upgradeToKeep: string;
      upgradeNow: string;
      upgradeContinue: string;
    };
    accessRestricted: {
      title: string;
      description: string;
      viewPlans: string;
    };
  };

  // Appointments
  appointments: {
    title: string;
    subtitle: string;
    scheduleTitle: string;
    scheduleSubtitle: string;
    upcoming: string;
    past: string;
    status: {
      pending: string;
      confirmed: string;
      cancelled: string;
      completed: string;
    };
    noAppointments: string;
    newAppointment: string;
    scheduleNew: string;
    scheduleDescription: string;
    patientName: string;
    patientNamePlaceholder: string;
    emailPlaceholder: string;
    phoneNumber: string;
    phonePlaceholder: string;
    selectService: string;
    appointmentDate: string;
    appointmentTime: string;
    notes: string;
    notesPlaceholder: string;
    schedule: string;
    scheduledSuccess: string;
    confirmedSuccess: string;
    cancelledSuccess: string;
    completedSuccess: string;
    confirmAppointment: string;
    cancelAppointment: string;
    completeAppointment: string;
    cancelConfirm: string;
    cancelConfirmDescription: string;
    noTimeslots: string;
    noTimeslotsDescription: string;
    configureTimeslots: string;
    selectDate: string;
    pickDate: string;
    required: string;
    allFieldsRequired: string;
    availableTimeSlots: string;
    timeSlotsDescription: string;
    timeSlotsDescriptionNoConfig: string;
    noTimeSlotsConfigured: string;
    goToProfile: string;
    viewDetails: string;
    editAppointment: string;
    yesCancel: string;
    cancelling: string;
    patient: string;
    service: string;
    date: string;
    time: string;
    scheduled: string;
    patientHistory: string;
    completeHistory: string;
    exportCSV: string;
    revenue: string;
    avg: string;
    mostCommonService: string;
    filters: string;
    searchAppointments: string;
    filterByStatus: string;
    allStatuses: string;
    filterByYear: string;
    allYears: string;
    showingResults: string;
    clearFilters: string;
    appointmentTimeline: string;
    noAppointmentsMatch: string;
    noAppointmentsFound: string;
    clearAllFilters: string;
    appointments: string;
    appointment: string;
    rate: string;
    pending: string;
  };

  // Patients
  patients: {
    title: string;
    subtitle: string;
    addPatient: string;
    editPatient: string;
    deletePatient: string;
    noPatients: string;
    name: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    address: string;
    notes: string;
    totalPatients: string;
    activePatients: string;
    newThisMonth: string;
    avgVisits: string;
    thisMonth: string;
    ofTotal: string;
    fromLastMonth: string;
    perPatient: string;
    allPatients: string;
    active: string;
    inactive: string;
    searchPlaceholder: string;
    patientRecords: string;
    recordsDescription: string;
    noPatientsFound: string;
    noPatientsRegistered: string;
    table: {
      patient: string;
      contact: string;
      age: string;
      lastVisit: string;
      nextAppointment: string;
      status: string;
      actions: string;
    };
    actions: {
      viewDetails: string;
      editPatient: string;
      viewHistory: string;
      scheduleAppointment: string;
      deletePatient: string;
    };
    noVisits: string;
    notScheduled: string;
    deleteConfirm: string;
    deleteConfirmDescription: string;
    deleteConfirmWarning: string;
    deleting: string;
    failedToLoadHistory: string;
    personalInformation: string;
    appointmentSummary: string;
    recentAppointments: string;
    patientSince: string;
    lastUpdated: string;
    yearsOld: string;
    showing: string;
    of: string;
    close: string;
    total: string;
    completed: string;
    upcoming: string;
    at: string;
  };

  // Services
  services: {
    title: string;
    subtitle: string;
    addService: string;
    editService: string;
    deleteService: string;
    noServices: string;
    name: string;
    description: string;
    price: string;
    duration: string;
    active: string;
    inactive: string;
    newService: string;
    upgradeToCreate: string;
    redirectingToPlans: string;
    noServicesYet: string;
    createFirstService: string;
    createFirstServiceDescription: string;
    status: string;
    edit: string;
    delete: string;
    deleteConfirm: string;
    deleteConfirmDescription: string;
    deleting: string;
    redirecting: string;
    upgradeToViewAll: string;
    planLimitMessage: string;
    createService: string;
    updateService: string;
    createServiceDescription: string;
    updateServiceDescription: string;
    serviceName: string;
    serviceNamePlaceholder: string;
    descriptionPlaceholder: string;
    priceLabel: string;
    pricePlaceholder: string;
    durationLabel: string;
    durationTooltip: string;
    durationPlaceholder: string;
    saving: string;
    serviceCreated: string;
    serviceUpdated: string;
    failedToSave: string;
  };

  // Profile
  profile: {
    title: string;
    subtitle: string;
    clinicProfile: string;
    manageInfo: string;
    active: string;
    inactive: string;
    subscription: string;
    currentPlan: string;
    plan: string;
    status: string;
    noActiveSubscription: string;
    personalInfo: string;
    contactInfo: string;
    timezone: string;
    timeSlots: string;
    language: string;
    saveChanges: string;
    updatePatient: string;
    updatePatientDescription: string;
    patientUpdated: string;
    failedToUpdate: string;
    pickDate: string;
    addressPlaceholder: string;
    notesPlaceholder: string;
    clinicInformation: string;
    updateContactDetails: string;
    enterName: string;
    emailCannotBeChanged: string;
    enterAddress: string;
    selectTimezone: string;
    statusTooltip: string;
    availableTimes: string;
    timeSlotsDialogTitle: string;
    timeSlotsDialogDescription: string;
    timeSlotsSelected: string;
    timeSlotsSave: string;
    timeSlotsSelectButton: string;
    timeSlotsSelectedButton: string;
    timeSlotsSelectedButtonPlural: string;
    more: string;
    unsavedChanges: string;
    saving: string;
    subscribedSince: string;
    subscriptionActive: string;
    subscriptionActiveDescription: string;
    mostPopular: string;
    manageSubscription: string;
    planFeatures: {
      upToServices: string;
      unlimitedAppointments: string;
      support: string;
      prioritySupport: string;
      reports: string;
    };
  };

  // Booking
  booking: {
    title: string;
    selectDate: string;
    selectTime: string;
    yourInfo: string;
    name: string;
    email: string;
    phone: string;
    book: string;
    bookingSuccess: string;
    publicBookingLink: string;
    shareLinkDescription: string;
    copied: string;
    copyLink: string;
    openInNewTab: string;
    tip: string;
    tipDescription: string;
    viewQRCode: string;
    qrCodeForBooking: string;
    qrCodeDescription: string;
    downloadQRCode: string;
    usageTips: string;
    usageTip1: string;
    usageTip2: string;
    usageTip3: string;
    usageTip4: string;
    linkCopied: string;
    failedToCopy: string;
    qrCodeDownloaded: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    common: {
      loading: "Loading...",
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit",
      create: "Create",
      search: "Search",
      filter: "Filter",
      actions: "Actions",
      close: "Close",
      confirm: "Confirm",
      yes: "Yes",
      no: "No",
    },
    nav: {
      home: "Home",
      features: "Features",
      professionals: "Professionals",
      pricing: "Pricing",
      dashboard: "Dashboard",
      appointments: "Appointments",
      patients: "Patients",
      services: "Services",
      plans: "Plans",
      profile: "Profile",
      logOut: "Log out",
      signIn: "Sign In",
      getStarted: "Get Started",
      navigation: "Navigation",
    },
    home: {
      hero: {
        badge: "Trusted by 500+ dental clinics",
        titlePart1: "Modern Practice Management for ",
        titlePart2: "Dental Clinics",
        subtitle:
          "Streamline appointments, manage patients, and grow your practice with our all-in-one platform designed specifically for dental professionals.",
        cta: "Start Free Trial",
        trialText: "No credit card required • 3-day free trial",
      },
      features: {
        title: "Everything you need to run your clinic",
        subtitle:
          "Powerful features designed to save time and improve patient care",
        smartScheduling: {
          title: "Smart Scheduling",
          description:
            "Intuitive calendar view with easy appointment management and public online booking for your patients",
        },
        patientManagement: {
          title: "Patient Management",
          description:
            "Complete patient profiles with contact information, notes, photos, and full appointment history",
        },
        analytics: {
          title: "Analytics & Insights",
          description:
            "Track revenue trends, monitor appointment statistics, and view key performance metrics",
        },
        serviceManagement: {
          title: "Service Management",
          description:
            "Create and manage your clinic services with pricing, duration, and availability settings",
        },
        secure: {
          title: "Secure & Reliable",
          description:
            "Secure authentication, data protection, and reliable infrastructure to keep your clinic data safe",
        },
        easyToUse: {
          title: "Easy to Use",
          description:
            "Simple, intuitive interface designed for dental professionals. Get started in minutes with no training needed",
        },
      },
      professionals: {
        title: "Featured Dental Clinics",
        subtitle:
          "Book appointments with verified dental professionals near you",
        noClinics:
          "No clinics available for booking at this time. Check back soon!",
        services: "service",
        activeClinic: "Active clinic",
        appointmentsCompleted: "appointments completed",
        bookAppointment: "Book Appointment",
        showing: "Showing",
        featured: "featured",
        clinic: "clinic",
        clinics: "clinics",
        acceptingBookings: "accepting online bookings",
      },
      pricing: {
        title: "Simple, transparent pricing",
        subtitle: "Choose the plan that fits your practice size",
        dashboardTitle: "Simple, transparent pricing",
        dashboardSubtitle: "Choose the plan that fits your practice size",
        mostPopular: "Most Popular",
        perMonth: "/month",
        activateSubscription: "Activate subscription",
        redirectingToCheckout: "Redirecting to checkout...",
        planNames: {
          basic: "Basic",
          professional: "Professional",
        },
      },
      cta: {
        title: "Ready to transform your clinic?",
        subtitle:
          "Join hundreds of dental clinics already using SmilePro to streamline their operations",
        button: "Start Free Trial",
      },
    },
    dashboard: {
      title: "Dashboard",
      welcome: "Welcome back",
      stats: {
        totalAppointments: "Total Appointments",
        totalPatients: "Total Patients",
        totalServices: "Total Services",
        revenue: "Revenue",
      },
      trial: {
        onTrial: "You're on a free trial!",
        daysRemaining: "remaining",
        day: "day",
        days: "days",
        trialEnded: "Your trial has ended",
        enjoyAccess:
          "Enjoy full access to all features. Upgrade to keep using SmilePRO after your trial ends.",
        upgradeToKeep: "Upgrade to keep using SmilePRO after your trial ends.",
        upgradeNow: "Upgrade Now",
        upgradeContinue:
          "Upgrade now to continue using all features and manage your clinic seamlessly.",
      },
      accessRestricted: {
        title: "Access Restricted",
        description:
          "You need an active subscription or trial plan to access this feature. Please upgrade to a paid plan to continue using this feature.",
        viewPlans: "View Plans",
      },
    },
    appointments: {
      title: "Appointments",
      subtitle: "Manage your clinic appointments",
      scheduleTitle: "Appointment Schedule",
      scheduleSubtitle: "Manage and schedule patient appointments",
      upcoming: "Upcoming",
      past: "Past",
      status: {
        pending: "Pending",
        confirmed: "Confirmed",
        cancelled: "Cancelled",
        completed: "Completed",
      },
      noAppointments: "No appointments found",
      newAppointment: "New Appointment",
      scheduleNew: "Schedule New Appointment",
      scheduleDescription:
        "Fill in the details to schedule a new appointment for a patient.",
      patientName: "Patient Name",
      patientNamePlaceholder: "Enter patient name",
      emailPlaceholder: "patient@example.com",
      phoneNumber: "Phone Number",
      phonePlaceholder: "21 99999-9999",
      selectService: "Select service",
      appointmentDate: "Appointment Date",
      appointmentTime: "Appointment Time",
      notes: "Notes",
      notesPlaceholder: "Additional notes (optional)",
      schedule: "Schedule Appointment",
      scheduledSuccess: "Appointment scheduled and confirmed successfully!",
      confirmedSuccess: "Appointment confirmed successfully!",
      cancelledSuccess: "Appointment cancelled successfully",
      completedSuccess: "Appointment marked as completed!",
      confirmAppointment: "Confirm Appointment",
      cancelAppointment: "Cancel Appointment",
      completeAppointment: "Mark as Completed",
      cancelConfirm: "Cancel Appointment",
      cancelConfirmDescription:
        "Are you sure you want to cancel this appointment? This action cannot be undone.",
      noTimeslots: "No time slots configured",
      noTimeslotsDescription:
        "Please configure your available time slots in your profile settings before scheduling appointments.",
      configureTimeslots: "Configure Time Slots",
      selectDate: "Select Date",
      pickDate: "Pick a date",
      required: "*",
      allFieldsRequired: "All fields marked with * are required.",
      availableTimeSlots: "Available Time Slots",
      timeSlotsDescription: "Quick view of available and booked time slots for",
      timeSlotsDescriptionNoConfig:
        "Configure your available times in your profile to start accepting appointments",
      noTimeSlotsConfigured: "No available time slots configured",
      goToProfile: "Go to your profile to set up your clinic's available hours",
      viewDetails: "View Details",
      editAppointment: "Edit Appointment",
      yesCancel: "Yes, cancel appointment",
      cancelling: "Cancelling...",
      patient: "Patient",
      service: "Service",
      date: "Date",
      time: "Time",
      scheduled: "scheduled",
      patientHistory: "Patient History",
      completeHistory: "Complete appointment history for",
      exportCSV: "Export CSV",
      revenue: "Revenue",
      avg: "avg",
      mostCommonService: "Most Common Service",
      filters: "Filters",
      searchAppointments: "Search appointments...",
      filterByStatus: "Filter by status",
      allStatuses: "All Statuses",
      filterByYear: "Filter by year",
      allYears: "All Years",
      showingResults: "Showing",
      clearFilters: "Clear filters",
      appointmentTimeline: "Appointment Timeline",
      noAppointmentsMatch: "No appointments match your filters",
      noAppointmentsFound: "No appointments found for this patient",
      clearAllFilters: "Clear all filters",
      appointments: "appointments",
      appointment: "appointment",
      rate: "rate",
      pending: "pending",
    },
    patients: {
      title: "Patients",
      subtitle: "Manage your patient records and information",
      addPatient: "Add Patient",
      editPatient: "Edit Patient",
      deletePatient: "Delete Patient",
      noPatients: "No patients found",
      name: "Name",
      email: "Email",
      phone: "Phone",
      dateOfBirth: "Date of Birth",
      address: "Address",
      notes: "Notes",
      totalPatients: "Total Patients",
      activePatients: "Active Patients",
      newThisMonth: "New This Month",
      avgVisits: "Avg. Visits",
      thisMonth: "this month",
      ofTotal: "of total",
      fromLastMonth: "from last month",
      perPatient: "per patient",
      allPatients: "All Patients",
      active: "Active",
      inactive: "Inactive",
      searchPlaceholder: "Search patients...",
      patientRecords: "Patient Records",
      recordsDescription: "Complete list of all registered patients",
      noPatientsFound: "No patients found matching your search",
      noPatientsRegistered: "No patients registered yet",
      table: {
        patient: "Patient",
        contact: "Contact",
        age: "Age",
        lastVisit: "Last Visit",
        nextAppointment: "Next Appointment",
        status: "Status",
        actions: "Actions",
      },
      actions: {
        viewDetails: "View Details",
        editPatient: "Edit Patient",
        viewHistory: "View History",
        scheduleAppointment: "Schedule Appointment",
        deletePatient: "Delete Patient",
      },
      noVisits: "No visits",
      notScheduled: "Not scheduled",
      deleteConfirm: "Delete Patient",
      deleteConfirmDescription:
        "This will permanently delete {name} and all associated data.",
      deleteConfirmWarning:
        "Warning: This will also delete {count} appointment{plural} associated with this patient.",
      deleting: "Deleting...",
      failedToLoadHistory: "Failed to load patient history",
      personalInformation: "Personal Information",
      appointmentSummary: "Appointment Summary",
      recentAppointments: "Recent Appointments",
      patientSince: "Patient since",
      lastUpdated: "Last updated",
      yearsOld: "years old",
      showing: "Showing",
      of: "of",
      close: "Close",
      total: "Total",
      completed: "Completed",
      upcoming: "Upcoming",
      at: "at",
    },
    services: {
      title: "Services",
      subtitle: "Manage your clinic services and pricing",
      addService: "Add Service",
      editService: "Edit Service",
      deleteService: "Delete Service",
      noServices: "No services found",
      name: "Name",
      description: "Description",
      price: "Price",
      duration: "Duration (minutes)",
      active: "Active",
      inactive: "Inactive",
      newService: "New Service",
      upgradeToCreate: "Upgrade to create more services",
      redirectingToPlans: "Redirecting to plans...",
      noServicesYet: "No services yet",
      createFirstService: "Create Your First Service",
      createFirstServiceDescription:
        "Create your first service to start accepting appointments. Add services like consultations, cleanings, and treatments.",
      status: "Status",
      edit: "Edit",
      delete: "Delete",
      deleteConfirm: "Are you sure? This will permanently delete the service",
      deleteConfirmDescription: "This action cannot be undone.",
      deleting: "Deleting...",
      redirecting: "Redirecting...",
      upgradeToViewAll: "Upgrade to view all services",
      planLimitMessage:
        "You have {count} services, but your plan only allows viewing {max} services.",
      createService: "Create Service",
      updateService: "Update Service",
      createServiceDescription: "Add a new service to your clinic",
      updateServiceDescription: "Update the service details below",
      serviceName: "Service Name",
      serviceNamePlaceholder: "e.g., Teeth Cleaning",
      descriptionPlaceholder: "Brief description of the service",
      priceLabel: "Price (R$)",
      pricePlaceholder: "150.00",
      durationLabel: "Duration (min)",
      durationTooltip:
        "Enter the appointment duration in minutes. Common values: 30, 45, 60, 90, 120",
      durationPlaceholder: "60",
      saving: "Saving...",
      serviceCreated: "Service created successfully",
      serviceUpdated: "Service updated successfully",
      failedToSave: "Failed to save service. Please try again.",
    },
    profile: {
      title: "Profile",
      subtitle: "Manage your clinic information and settings",
      clinicProfile: "Clinic Profile",
      manageInfo: "Manage your clinic information and settings",
      active: "Active",
      inactive: "Inactive",
      subscription: "Subscription",
      currentPlan: "Your current plan",
      plan: "Plan",
      status: "Status",
      noActiveSubscription: "No active subscription",
      personalInfo: "Personal Information",
      contactInfo: "Contact Information",
      timezone: "Timezone",
      timeSlots: "Time Slots",
      language: "Language",
      saveChanges: "Save Changes",
      updatePatient: "Edit Patient",
      updatePatientDescription:
        "Update patient information. All fields marked with * are required.",
      patientUpdated: "Patient updated successfully",
      failedToUpdate: "Failed to update patient",
      pickDate: "Pick a date",
      addressPlaceholder: "123 Main St, City, State, ZIP",
      notesPlaceholder: "Any additional information about the patient...",
      clinicInformation: "Clinic Information",
      updateContactDetails: "Update your clinic's contact details",
      enterName: "Enter your name",
      emailCannotBeChanged: "Email cannot be changed",
      enterAddress: "Enter your address",
      selectTimezone: "Select timezone",
      statusTooltip: "Indicates whether your clinic is open or closed",
      availableTimes: "Available Times",
      timeSlotsDialogTitle: "Available Times",
      timeSlotsDialogDescription:
        "Select the time slots when your clinic is available for appointments",
      timeSlotsSelected: "Selected:",
      timeSlotsSave: "Save Times",
      timeSlotsSelectButton: "Select available times",
      timeSlotsSelectedButton: "{count} time selected",
      timeSlotsSelectedButtonPlural: "{count} times selected",
      more: "more",
      unsavedChanges: "You have unsaved changes",
      saving: "Saving...",
      subscribedSince: "Subscribed since",
      subscriptionActive: "Your Subscription is Active",
      subscriptionActiveDescription:
        "You're all set! Enjoy all the features of your plan.",
      mostPopular: "Most Popular",
      manageSubscription: "Manage Subscription",
      planFeatures: {
        upToServices: "Up to {count} services",
        unlimitedAppointments: "Unlimited appointments",
        support: "Support",
        prioritySupport: "Priority support",
        reports: "Reports",
      },
    },
    booking: {
      title: "Book Appointment",
      selectDate: "Select Date",
      selectTime: "Select Time",
      yourInfo: "Your Information",
      name: "Name",
      email: "Email",
      phone: "Phone",
      book: "Book Appointment",
      bookingSuccess: "Appointment booked successfully!",
      publicBookingLink: "Public Booking Link",
      shareLinkDescription:
        "Share this link with your patients for online booking",
      copied: "Copied!",
      copyLink: "Copy Link",
      openInNewTab: "Open in new tab",
      tip: "Tip:",
      tipDescription:
        "Share this link on your website, social media, or via email to allow patients to book appointments directly with your clinic.",
      viewQRCode: "View QR Code",
      qrCodeForBooking: "QR Code for Booking",
      qrCodeDescription: "Share this QR code for patients to book appointments",
      downloadQRCode: "Download QR Code",
      usageTips: "Usage Tips:",
      usageTip1: "Print and display at reception",
      usageTip2: "Add to business cards",
      usageTip3: "Share on social media",
      usageTip4: "Include in email signatures",
      linkCopied: "Booking link copied to clipboard!",
      failedToCopy: "Failed to copy link",
      qrCodeDownloaded: "QR Code downloaded successfully!",
    },
  },
  "pt-BR": {
    common: {
      loading: "Carregando...",
      save: "Salvar",
      cancel: "Cancelar",
      delete: "Excluir",
      edit: "Editar",
      create: "Criar",
      search: "Buscar",
      filter: "Filtrar",
      actions: "Ações",
      close: "Fechar",
      confirm: "Confirmar",
      yes: "Sim",
      no: "Não",
    },
    nav: {
      home: "Início",
      features: "Recursos",
      professionals: "Profissionais",
      pricing: "Preços",
      dashboard: "Painel",
      appointments: "Agendamentos",
      patients: "Pacientes",
      services: "Serviços",
      plans: "Planos",
      profile: "Perfil",
      logOut: "Sair",
      signIn: "Entrar",
      getStarted: "Começar",
      navigation: "Navegação",
    },
    home: {
      hero: {
        badge: "Confiado por mais de 500 clínicas odontológicas",
        titlePart1: "Gestão Moderna para ",
        titlePart2: "Consultórios Odontológicos",
        subtitle:
          "Simplifique agendamentos, gerencie pacientes e expanda sua prática com nossa plataforma completa projetada especificamente para profissionais odontológicos.",
        cta: "Iniciar Teste Grátis",
        trialText: "Sem cartão de crédito • Teste grátis de 3 dias",
      },
      features: {
        title: "Tudo que você precisa para administrar sua clínica",
        subtitle:
          "Recursos poderosos projetados para economizar tempo e melhorar o atendimento ao paciente",
        smartScheduling: {
          title: "Agendamento Inteligente",
          description:
            "Visualização intuitiva do calendário com gerenciamento fácil de agendamentos e reserva online pública para seus pacientes",
        },
        patientManagement: {
          title: "Gestão de Pacientes",
          description:
            "Perfis completos de pacientes com informações de contato, observações, fotos e histórico completo de agendamentos",
        },
        analytics: {
          title: "Análises e Insights",
          description:
            "Acompanhe tendências de receita, monitore estatísticas de agendamentos e visualize métricas-chave de desempenho",
        },
        serviceManagement: {
          title: "Gestão de Serviços",
          description:
            "Crie e gerencie os serviços da sua clínica com preços, duração e configurações de disponibilidade",
        },
        secure: {
          title: "Seguro e Confiável",
          description:
            "Autenticação segura, proteção de dados e infraestrutura confiável para manter os dados da sua clínica seguros",
        },
        easyToUse: {
          title: "Fácil de Usar",
          description:
            "Interface simples e intuitiva projetada para profissionais odontológicos. Comece em minutos sem necessidade de treinamento",
        },
      },
      professionals: {
        title: "Clínicas Odontológicas em Destaque",
        subtitle:
          "Agende consultas com profissionais odontológicos verificados perto de você",
        noClinics:
          "Nenhuma clínica disponível para agendamento no momento. Volte em breve!",
        services: "serviço",
        activeClinic: "Clínica ativa",
        appointmentsCompleted: "agendamentos concluídos",
        bookAppointment: "Agendar Consulta",
        showing: "Mostrando",
        featured: "em destaque",
        clinic: "clínica",
        clinics: "clínicas",
        acceptingBookings: "aceitando agendamentos online",
      },
      pricing: {
        title: "Preços simples e transparentes",
        subtitle: "Escolha o plano que se adequa ao tamanho da sua prática",
        dashboardTitle: "Preços simples e transparentes",
        dashboardSubtitle:
          "Escolha o plano que se adequa ao tamanho da sua prática",
        mostPopular: "Mais Popular",
        perMonth: "/mês",
        activateSubscription: "Ativar assinatura",
        redirectingToCheckout: "Redirecionando para o checkout...",
        planNames: {
          basic: "Básico",
          professional: "Profissional",
        },
      },
      cta: {
        title: "Pronto para transformar sua clínica?",
        subtitle:
          "Junte-se a centenas de clínicas odontológicas que já usam o SmilePro para simplificar suas operações",
        button: "Iniciar Teste Grátis",
      },
    },
    dashboard: {
      title: "Painel",
      welcome: "Bem-vindo de volta",
      stats: {
        totalAppointments: "Total de Agendamentos",
        totalPatients: "Total de Pacientes",
        totalServices: "Total de Serviços",
        revenue: "Receita",
      },
      trial: {
        onTrial: "Você está em um teste grátis!",
        daysRemaining: "restantes",
        day: "dia",
        days: "dias",
        trialEnded: "Seu teste expirou",
        enjoyAccess:
          "Aproveite acesso completo a todos os recursos. Faça upgrade para continuar usando o SmilePRO após o término do teste.",
        upgradeToKeep:
          "Faça upgrade para continuar usando o SmilePRO após o término do teste.",
        upgradeNow: "Fazer Upgrade Agora",
        upgradeContinue:
          "Faça upgrade agora para continuar usando todos os recursos e gerenciar sua clínica sem problemas.",
      },
      accessRestricted: {
        title: "Acesso Restrito",
        description:
          "Você precisa de uma assinatura ativa ou plano de teste para acessar este recurso. Por favor, faça upgrade para um plano pago para continuar usando este recurso.",
        viewPlans: "Ver Planos",
      },
    },
    appointments: {
      title: "Agendamentos",
      subtitle: "Gerencie os agendamentos da sua clínica",
      scheduleTitle: "Agenda de Agendamentos",
      scheduleSubtitle: "Gerencie e agende consultas de pacientes",
      upcoming: "Próximos",
      past: "Passados",
      status: {
        pending: "Pendente",
        confirmed: "Confirmado",
        cancelled: "Cancelado",
        completed: "Concluído",
      },
      noAppointments: "Nenhum agendamento encontrado",
      newAppointment: "Novo Agendamento",
      scheduleNew: "Agendar Nova Consulta",
      scheduleDescription:
        "Preencha os detalhes para agendar uma nova consulta para um paciente.",
      patientName: "Nome do Paciente",
      patientNamePlaceholder: "Digite o nome do paciente",
      emailPlaceholder: "paciente@exemplo.com",
      phoneNumber: "Número de Telefone",
      phonePlaceholder: "21 99999-9999",
      selectService: "Selecionar serviço",
      appointmentDate: "Data do Agendamento",
      appointmentTime: "Horário do Agendamento",
      notes: "Observações",
      notesPlaceholder: "Observações adicionais (opcional)",
      schedule: "Agendar Consulta",
      scheduledSuccess: "Agendamento agendado e confirmado com sucesso!",
      confirmedSuccess: "Agendamento confirmado com sucesso!",
      cancelledSuccess: "Agendamento cancelado com sucesso",
      completedSuccess: "Agendamento marcado como concluído!",
      confirmAppointment: "Confirmar Agendamento",
      cancelAppointment: "Cancelar Agendamento",
      completeAppointment: "Marcar como Concluído",
      cancelConfirm: "Cancelar Agendamento",
      cancelConfirmDescription:
        "Tem certeza de que deseja cancelar este agendamento? Esta ação não pode ser desfeita.",
      noTimeslots: "Nenhum horário configurado",
      noTimeslotsDescription:
        "Por favor, configure seus horários disponíveis nas configurações do perfil antes de agendar consultas.",
      configureTimeslots: "Configurar Horários",
      selectDate: "Selecionar Data",
      pickDate: "Escolher uma data",
      required: "*",
      allFieldsRequired: "Todos os campos marcados com * são obrigatórios.",
      availableTimeSlots: "Horários Disponíveis",
      timeSlotsDescription:
        "Visualização rápida dos horários disponíveis e reservados para",
      timeSlotsDescriptionNoConfig:
        "Configure seus horários disponíveis no seu perfil para começar a aceitar agendamentos",
      noTimeSlotsConfigured: "Nenhum horário disponível configurado",
      goToProfile:
        "Vá ao seu perfil para configurar os horários disponíveis da sua clínica",
      viewDetails: "Ver Detalhes",
      editAppointment: "Editar Agendamento",
      yesCancel: "Sim, cancelar agendamento",
      cancelling: "Cancelando...",
      patient: "Paciente",
      service: "Serviço",
      date: "Data",
      time: "Horário",
      scheduled: "agendado",
      patientHistory: "Histórico do Paciente",
      completeHistory: "Histórico completo de agendamentos para",
      exportCSV: "Exportar CSV",
      revenue: "Receita",
      avg: "média",
      mostCommonService: "Serviço Mais Comum",
      filters: "Filtros",
      searchAppointments: "Buscar agendamentos...",
      filterByStatus: "Filtrar por status",
      allStatuses: "Todos os Status",
      filterByYear: "Filtrar por ano",
      allYears: "Todos os Anos",
      showingResults: "Mostrando",
      clearFilters: "Limpar filtros",
      appointmentTimeline: "Linha do Tempo de Agendamentos",
      noAppointmentsMatch: "Nenhum agendamento corresponde aos seus filtros",
      noAppointmentsFound: "Nenhum agendamento encontrado para este paciente",
      clearAllFilters: "Limpar todos os filtros",
      appointments: "agendamentos",
      appointment: "agendamento",
      rate: "taxa",
      pending: "pendente",
    },
    patients: {
      title: "Pacientes",
      subtitle: "Gerencie os registros e informações dos seus pacientes",
      addPatient: "Adicionar Paciente",
      editPatient: "Editar Paciente",
      deletePatient: "Excluir Paciente",
      noPatients: "Nenhum paciente encontrado",
      name: "Nome",
      email: "E-mail",
      phone: "Telefone",
      dateOfBirth: "Data de Nascimento",
      address: "Endereço",
      notes: "Observações",
      totalPatients: "Total de Pacientes",
      activePatients: "Pacientes Ativos",
      newThisMonth: "Novos Este Mês",
      avgVisits: "Média de Visitas",
      thisMonth: "este mês",
      ofTotal: "do total",
      fromLastMonth: "do mês passado",
      perPatient: "por paciente",
      allPatients: "Todos os Pacientes",
      active: "Ativo",
      inactive: "Inativo",
      searchPlaceholder: "Buscar pacientes...",
      patientRecords: "Registros de Pacientes",
      recordsDescription: "Lista completa de todos os pacientes registrados",
      noPatientsFound: "Nenhum paciente encontrado com sua busca",
      noPatientsRegistered: "Nenhum paciente registrado ainda",
      table: {
        patient: "Paciente",
        contact: "Contato",
        age: "Idade",
        lastVisit: "Última Visita",
        nextAppointment: "Próximo Agendamento",
        status: "Status",
        actions: "Ações",
      },
      actions: {
        viewDetails: "Ver Detalhes",
        editPatient: "Editar Paciente",
        viewHistory: "Ver Histórico",
        scheduleAppointment: "Agendar Consulta",
        deletePatient: "Excluir Paciente",
      },
      noVisits: "Sem visitas",
      notScheduled: "Não agendado",
      deleteConfirm: "Excluir Paciente",
      deleteConfirmDescription:
        "Isso excluirá permanentemente {name} e todos os dados associados.",
      deleteConfirmWarning:
        "Aviso: Isso também excluirá {count} agendamento{plural} associado{plural} a este paciente.",
      deleting: "Excluindo...",
      failedToLoadHistory: "Falha ao carregar histórico do paciente",
      personalInformation: "Informações Pessoais",
      appointmentSummary: "Resumo de Agendamentos",
      recentAppointments: "Agendamentos Recentes",
      patientSince: "Paciente desde",
      lastUpdated: "Última atualização",
      yearsOld: "anos",
      showing: "Mostrando",
      of: "de",
      close: "Fechar",
      total: "Total",
      completed: "Concluído",
      upcoming: "Próximos",
      at: "às",
    },
    services: {
      title: "Serviços",
      subtitle: "Gerencie os serviços e preços da sua clínica",
      addService: "Adicionar Serviço",
      editService: "Editar Serviço",
      deleteService: "Excluir Serviço",
      noServices: "Nenhum serviço encontrado",
      name: "Nome",
      description: "Descrição",
      price: "Preço",
      duration: "Duração (minutos)",
      active: "Ativo",
      inactive: "Inativo",
      newService: "Novo Serviço",
      upgradeToCreate: "Faça upgrade para criar mais serviços",
      redirectingToPlans: "Redirecionando para planos...",
      noServicesYet: "Nenhum serviço ainda",
      createFirstService: "Criar Seu Primeiro Serviço",
      createFirstServiceDescription:
        "Crie seu primeiro serviço para começar a aceitar agendamentos. Adicione serviços como consultas, limpezas e tratamentos.",
      status: "Status",
      edit: "Editar",
      delete: "Excluir",
      deleteConfirm: "Tem certeza? Isso excluirá permanentemente o serviço",
      deleteConfirmDescription: "Esta ação não pode ser desfeita.",
      deleting: "Excluindo...",
      redirecting: "Redirecionando...",
      upgradeToViewAll: "Faça upgrade para ver todos os serviços",
      planLimitMessage:
        "Você tem {count} serviços, mas seu plano permite visualizar apenas {max} serviços.",
      createService: "Criar Serviço",
      updateService: "Atualizar Serviço",
      createServiceDescription: "Adicione um novo serviço à sua clínica",
      updateServiceDescription: "Atualize os detalhes do serviço abaixo",
      serviceName: "Nome do Serviço",
      serviceNamePlaceholder: "ex: Limpeza Dentária",
      descriptionPlaceholder: "Breve descrição do serviço",
      priceLabel: "Preço (R$)",
      pricePlaceholder: "150,00",
      durationLabel: "Duração (min)",
      durationTooltip:
        "Digite a duração do agendamento em minutos. Valores comuns: 30, 45, 60, 90, 120",
      durationPlaceholder: "60",
      saving: "Salvando...",
      serviceCreated: "Serviço criado com sucesso",
      serviceUpdated: "Serviço atualizado com sucesso",
      failedToSave: "Falha ao salvar serviço. Por favor, tente novamente.",
    },
    profile: {
      title: "Perfil",
      subtitle: "Gerencie as informações e configurações da sua clínica",
      clinicProfile: "Perfil da Clínica",
      manageInfo: "Gerencie as informações e configurações da sua clínica",
      active: "Ativo",
      inactive: "Inativo",
      subscription: "Assinatura",
      currentPlan: "Seu plano atual",
      plan: "Plano",
      status: "Status",
      noActiveSubscription: "Nenhuma assinatura ativa",
      personalInfo: "Informações Pessoais",
      contactInfo: "Informações de Contato",
      timezone: "Fuso Horário",
      timeSlots: "Horários Disponíveis",
      language: "Idioma",
      saveChanges: "Salvar Alterações",
      updatePatient: "Editar Paciente",
      updatePatientDescription:
        "Atualize as informações do paciente. Todos os campos marcados com * são obrigatórios.",
      patientUpdated: "Paciente atualizado com sucesso",
      failedToUpdate: "Falha ao atualizar paciente",
      pickDate: "Escolher uma data",
      addressPlaceholder: "Rua Principal, 123, Cidade, Estado, CEP",
      notesPlaceholder: "Qualquer informação adicional sobre o paciente...",
      clinicInformation: "Informações da Clínica",
      updateContactDetails: "Atualize os detalhes de contato da sua clínica",
      enterName: "Digite seu nome",
      emailCannotBeChanged: "O email não pode ser alterado",
      enterAddress: "Digite seu endereço",
      selectTimezone: "Selecionar fuso horário",
      statusTooltip: "Indica se sua clínica está aberta ou fechada",
      availableTimes: "Horários Disponíveis",
      timeSlotsDialogTitle: "Horários Disponíveis",
      timeSlotsDialogDescription:
        "Selecione os horários quando sua clínica está disponível para consultas",
      timeSlotsSelected: "Selecionados:",
      timeSlotsSave: "Salvar Horários",
      timeSlotsSelectButton: "Selecionar horários disponíveis",
      timeSlotsSelectedButton: "{count} horário selecionado",
      timeSlotsSelectedButtonPlural: "{count} horários selecionados",
      more: "mais",
      unsavedChanges: "Você tem alterações não salvas",
      saving: "Salvando...",
      subscribedSince: "Assinado desde",
      subscriptionActive: "Sua Assinatura Está Ativa",
      subscriptionActiveDescription:
        "Tudo pronto! Aproveite todos os recursos do seu plano.",
      mostPopular: "Mais Popular",
      manageSubscription: "Gerenciar Assinatura",
      planFeatures: {
        upToServices: "Até {count} serviços",
        unlimitedAppointments: "Agendamentos ilimitados",
        support: "Suporte",
        prioritySupport: "Suporte prioritário",
        reports: "Relatórios",
      },
    },
    booking: {
      title: "Agendar Consulta",
      selectDate: "Selecionar Data",
      selectTime: "Selecionar Horário",
      yourInfo: "Suas Informações",
      name: "Nome",
      email: "E-mail",
      phone: "Telefone",
      book: "Agendar Consulta",
      bookingSuccess: "Consulta agendada com sucesso!",
      publicBookingLink: "Link Público de Agendamento",
      shareLinkDescription:
        "Compartilhe este link com seus pacientes para agendamento online",
      copied: "Copiado!",
      copyLink: "Copiar Link",
      openInNewTab: "Abrir em nova aba",
      tip: "Dica:",
      tipDescription:
        "Compartilhe este link no seu site, redes sociais ou por e-mail para permitir que os pacientes agendem consultas diretamente com sua clínica.",
      viewQRCode: "Ver Código QR",
      qrCodeForBooking: "Código QR para Agendamento",
      qrCodeDescription:
        "Compartilhe este código QR para que os pacientes agendem consultas",
      downloadQRCode: "Baixar Código QR",
      usageTips: "Dicas de Uso:",
      usageTip1: "Imprima e exiba na recepção",
      usageTip2: "Adicione aos cartões de visita",
      usageTip3: "Compartilhe nas redes sociais",
      usageTip4: "Inclua nas assinaturas de e-mail",
      linkCopied: "Link de agendamento copiado para a área de transferência!",
      failedToCopy: "Falha ao copiar link",
      qrCodeDownloaded: "Código QR baixado com sucesso!",
    },
  },
};
