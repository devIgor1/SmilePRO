"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Users,
  UserCheck,
  UserPlus,
  FileText,
  Search,
  Filter,
  MoreHorizontal,
  Calendar,
  Mail,
  Phone,
} from "lucide-react";
import dayjs from "dayjs";
import type { PatientWithRelations } from "@/lib/types";
import {
  calculateAge,
  getInitials,
  isPatientActive,
  getNextAppointment,
  getLastVisit,
} from "../_utils/patient-helpers";
import { PatientPhotoUpload } from "./patient-photo-upload";
import { PatientDetailsDialog } from "./patient-details-dialog";

interface PatientStats {
  totalPatients: number;
  activePatients: number;
  activePercentage: number;
  newThisMonth: number;
  percentageChange: number;
  avgVisits: number;
}

interface PatientsContentProps {
  userId: string;
  initialPatients: PatientWithRelations[];
  stats: PatientStats;
}

type FilterType = "all" | "active" | "inactive";

export default function PatientsContent({
  userId,
  initialPatients,
  stats,
}: PatientsContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [isMounted, setIsMounted] = useState(false);
  const [selectedPatient, setSelectedPatient] =
    useState<PatientWithRelations | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Filter patients
  const filteredPatients = initialPatients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.phone.includes(searchQuery);

    const active = isPatientActive(patient);
    const matchesFilter =
      filter === "all" ||
      (filter === "active" && active) ||
      (filter === "inactive" && !active);

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Patients
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage your patient records and information
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Patients
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.totalPatients.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              +{stats.newThisMonth} this month
            </p>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Patients
            </CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.activePatients.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.activePercentage}% of total
            </p>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              New This Month
            </CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.newThisMonth}</div>
            <p
              className={`text-xs mt-1 ${
                stats.percentageChange >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {stats.percentageChange > 0 ? "+" : ""}
              {stats.percentageChange}% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Visits</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgVisits}</div>
            <p className="text-xs text-muted-foreground mt-1">per patient</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
          >
            All Patients
          </Button>
          <Button
            variant={filter === "active" ? "default" : "outline"}
            onClick={() => setFilter("active")}
          >
            Active
          </Button>
          <Button
            variant={filter === "inactive" ? "default" : "outline"}
            onClick={() => setFilter("inactive")}
          >
            Inactive
          </Button>
        </div>

        <div className="flex gap-2">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="text-muted-foreground absolute left-2.5 top-2.5 h-4 w-4" />
            <Input
              placeholder="Search patients..."
              className="pl-8 sm:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Patient Records Table */}
      <Card className="border-primary/20 !bg-gradient-to-br from-background via-background to-primary/5 overflow-hidden p-0">
        <CardHeader className="border-b border-primary/10 bg-primary/10 rounded-t-xl px-6 pt-6 pb-6">
          <CardTitle className="text-primary">Patient Records</CardTitle>
          <CardDescription>
            Complete list of all registered patients
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 px-6 pb-6">
          {filteredPatients.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {searchQuery
                ? "No patients found matching your search"
                : "No patients registered yet"}
            </div>
          ) : (
            <div className="rounded-md border bg-background">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Last Visit</TableHead>
                    <TableHead>Next Appointment</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.map((patient) => {
                    const active = isPatientActive(patient);
                    const nextAppointment = getNextAppointment(patient);
                    const lastVisit = getLastVisit(patient);

                    return (
                      <TableRow key={patient.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <PatientPhotoUpload
                              patientId={patient.id}
                              patientName={patient.name}
                              currentPhotoUrl={patient.photoUrl}
                              initials={getInitials(patient.name)}
                            />
                            <div>
                              <div className="font-medium">{patient.name}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm">
                              <Mail className="h-3 w-3 text-muted-foreground" />
                              {patient.email}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Phone className="h-3 w-3" />
                              {patient.phone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {calculateAge(patient.dateOfBirth)}
                        </TableCell>
                        <TableCell>
                          {lastVisit
                            ? dayjs(lastVisit.appointmentDate).format(
                                "YYYY-MM-DD"
                              )
                            : "No visits"}
                        </TableCell>
                        <TableCell>
                          {nextAppointment ? (
                            <div className="flex items-center gap-2">
                              <Calendar className="h-3 w-3 text-muted-foreground" />
                              {dayjs(nextAppointment.appointmentDate).format(
                                "YYYY-MM-DD"
                              )}
                            </div>
                          ) : (
                            <span className="text-muted-foreground text-sm">
                              Not scheduled
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={active ? "default" : "secondary"}
                            className="capitalize"
                          >
                            {active ? "active" : "inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {isMounted ? (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedPatient(patient);
                                    setDetailsDialogOpen(true);
                                  }}
                                >
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  Edit Patient
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  View History
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  Schedule Appointment
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  Delete Patient
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          ) : (
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Patient Details Dialog */}
      {selectedPatient && (
        <PatientDetailsDialog
          patient={selectedPatient}
          open={detailsDialogOpen}
          onOpenChange={setDetailsDialogOpen}
        />
      )}
    </div>
  );
}
