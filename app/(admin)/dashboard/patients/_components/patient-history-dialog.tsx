"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslations } from "@/hooks/use-translations";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  Clock,
  DollarSign,
  FileText,
  TrendingUp,
  Activity,
  Search,
  Download,
  Award,
  BarChart3,
  X,
} from "lucide-react";
import dayjs from "dayjs";
import type { PatientWithRelations } from "@/lib/types";
import type { Appointment, Service } from "@/lib/types";
import { formatDateByLanguage } from "@/lib/utils/date-formatter";
import { useSession } from "next-auth/react";
import {
  getStatusVariant,
  getStatusIcon,
  getStatusLabel,
} from "../../appointments/_utils/appointment-helpers";

interface AppointmentWithService extends Appointment {
  service: Service;
}

interface PatientHistoryDialogProps {
  patient: PatientWithRelations;
  appointments: AppointmentWithService[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PatientHistoryDialog({
  patient,
  appointments,
  open,
  onOpenChange,
}: PatientHistoryDialogProps) {
  const t = useTranslations();
  const { data: session } = useSession();
  const language = (session?.user?.systemLanguage as "en" | "pt-BR") || "en";
  const [isMounted, setIsMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [yearFilter, setYearFilter] = useState<string>("all");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = appointments.length;
    const completed = appointments.filter(
      (apt) => apt.status === "COMPLETED"
    ).length;
    const cancelled = appointments.filter(
      (apt) => apt.status === "CANCELLED"
    ).length;
    const upcoming = appointments.filter((apt) =>
      dayjs(apt.appointmentDate).isAfter(dayjs())
    ).length;
    const pending = appointments.filter(
      (apt) => apt.status === "PENDING"
    ).length;

    const totalSpent =
      appointments
        .filter((apt) => apt.status === "COMPLETED" && apt.service)
        .reduce((sum, apt) => sum + (apt.service?.price || 0), 0) / 100;

    const avgAppointmentValue = completed > 0 ? totalSpent / completed : 0;

    // Find most common service
    const serviceCounts: Record<string, number> = {};
    appointments.forEach((apt) => {
      if (apt.service) {
        serviceCounts[apt.service.name] =
          (serviceCounts[apt.service.name] || 0) + 1;
      }
    });
    const mostCommonService = Object.entries(serviceCounts).sort(
      (a, b) => b[1] - a[1]
    )[0]?.[0];

    // Calculate completion rate
    const completionRate = total > 0 ? (completed / total) * 100 : 0;

    return {
      total,
      completed,
      cancelled,
      upcoming,
      pending,
      totalSpent,
      avgAppointmentValue,
      mostCommonService,
      completionRate,
    };
  }, [appointments]);

  // Get unique years for filter
  const availableYears = useMemo(() => {
    const years = new Set(
      appointments.map((apt) => dayjs(apt.appointmentDate).year().toString())
    );
    return Array.from(years).sort((a, b) => Number(b) - Number(a));
  }, [appointments]);

  // Filter appointments
  const filteredAppointments = useMemo(() => {
    return appointments.filter((apt) => {
      // Search filter
      const matchesSearch =
        !searchQuery ||
        apt.service?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        apt.service?.description
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        formatDateByLanguage(apt.appointmentDate, language, "numeric")
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        formatDateByLanguage(apt.appointmentDate, language, "full")
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      // Status filter
      const matchesStatus =
        statusFilter === "all" || apt.status === statusFilter;

      // Year filter
      const matchesYear =
        yearFilter === "all" ||
        dayjs(apt.appointmentDate).year().toString() === yearFilter;

      return matchesSearch && matchesStatus && matchesYear;
    });
  }, [appointments, searchQuery, statusFilter, yearFilter]);

  // Group filtered appointments by year and month
  const groupedAppointments = useMemo(() => {
    return filteredAppointments.reduce(
      (acc, apt) => {
        const dateKey = formatDateByLanguage(apt.appointmentDate, language, "full");

        if (!acc[dateKey]) {
          acc[dateKey] = [];
        }
        acc[dateKey].push(apt);
        return acc;
      },
      {} as Record<string, AppointmentWithService[]>
    );
  }, [filteredAppointments, language]);

  // Export functionality
  const handleExport = () => {
    const csvContent = [
      ["Date", "Time", "Service", "Price", "Duration", "Status"].join(","),
      ...filteredAppointments.map((apt) =>
        [
          formatDateByLanguage(apt.appointmentDate, language, "numeric"),
          apt.appointmentTime,
          apt.service?.name || "N/A",
          `$${((apt.service?.price || 0) / 100).toFixed(2)}`,
          `${apt.service?.duration || 0} min`,
          apt.status,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${patient.name}-history-${formatDateByLanguage(new Date(), language, "numeric")}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (!isMounted) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl w-[95vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl">{t.appointments.patientHistory}</DialogTitle>
              <DialogDescription>
                {t.appointments.completeHistory} {patient.name}
              </DialogDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              className="shrink-0"
            >
              <Download className="h-4 w-4 mr-2" />
              {t.appointments.exportCSV}
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Enhanced Statistics Cards */}
          <div className="grid grid-cols-2 gap-4">
            {/* Total Card */}
            <div className="relative group overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform duration-300" />
              <div className="relative p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Activity className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    {t.patients.total}
                  </p>
                  <p className="text-3xl font-bold text-primary tracking-tight">
                    {stats.total}
                  </p>
                  <p className="text-xs text-muted-foreground">{t.appointments.appointments}</p>
                </div>
              </div>
            </div>

            {/* Completed Card */}
            <div className="relative group overflow-hidden rounded-xl bg-gradient-to-br from-primary/15 via-primary/8 to-transparent border border-primary/25 hover:border-primary/45 transition-all duration-300 hover:shadow-lg hover:shadow-primary/15">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/8 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform duration-300" />
              <div className="relative p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 bg-primary/15 rounded-lg group-hover:bg-primary/25 transition-colors">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    {t.patients.completed}
                  </p>
                  <p className="text-3xl font-bold text-primary tracking-tight">
                    {stats.completed}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {stats.completionRate.toFixed(0)}% {t.appointments.rate}
                  </p>
                </div>
              </div>
            </div>

            {/* Upcoming Card */}
            <div className="relative group overflow-hidden rounded-xl bg-gradient-to-br from-primary/12 via-primary/6 to-transparent border border-primary/22 hover:border-primary/42 transition-all duration-300 hover:shadow-lg hover:shadow-primary/12">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/6 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform duration-300" />
              <div className="relative p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 bg-primary/12 rounded-lg group-hover:bg-primary/22 transition-colors">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    {t.patients.upcoming}
                  </p>
                  <p className="text-3xl font-bold text-primary tracking-tight">
                    {stats.upcoming}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {stats.pending} {t.appointments.pending}
                  </p>
                </div>
              </div>
            </div>

            {/* Revenue Card */}
            <div className="relative group overflow-hidden rounded-xl bg-gradient-to-br from-primary/18 via-primary/9 to-transparent border border-primary/28 hover:border-primary/48 transition-all duration-300 hover:shadow-lg hover:shadow-primary/18">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/9 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform duration-300" />
              <div className="relative p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 bg-primary/18 rounded-lg group-hover:bg-primary/28 transition-colors">
                    <DollarSign className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    {t.appointments.revenue}
                  </p>
                  <p className="text-3xl font-bold text-primary tracking-tight">
                    ${stats.totalSpent.toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    ${stats.avgAppointmentValue.toFixed(2)} {t.appointments.avg}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Insights */}
          {stats.mostCommonService && (
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t.appointments.mostCommonService}
                    </p>
                    <p className="font-semibold text-lg">
                      {stats.mostCommonService}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Separator />

          {/* Filters and Search */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">{t.appointments.filters}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t.appointments.searchAppointments}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>

              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder={t.appointments.filterByStatus} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.appointments.allStatuses}</SelectItem>
                  <SelectItem value="COMPLETED">{t.appointments.status.completed}</SelectItem>
                  <SelectItem value="CONFIRMED">{t.appointments.status.confirmed}</SelectItem>
                  <SelectItem value="PENDING">{t.appointments.status.pending}</SelectItem>
                  <SelectItem value="CANCELLED">{t.appointments.status.cancelled}</SelectItem>
                </SelectContent>
              </Select>

              {/* Year Filter */}
              <Select value={yearFilter} onValueChange={setYearFilter}>
                <SelectTrigger>
                  <SelectValue placeholder={t.appointments.filterByYear} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.appointments.allYears}</SelectItem>
                  {availableYears.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {(searchQuery ||
              statusFilter !== "all" ||
              yearFilter !== "all") && (
              <div className="flex items-center justify-between text-sm">
                <p className="text-muted-foreground">
                  {t.appointments.showingResults} {filteredAppointments.length} {t.patients.of} {appointments.length}{" "}
                  {t.appointments.appointments}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchQuery("");
                    setStatusFilter("all");
                    setYearFilter("all");
                  }}
                >
                  {t.appointments.clearFilters}
                </Button>
              </div>
            )}
          </div>

          <Separator />

          {/* Timeline */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              {t.appointments.appointmentTimeline}
            </h3>

            {filteredAppointments.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <Calendar className="h-12 w-12 text-muted-foreground/50 mb-4" />
                  <p className="text-muted-foreground font-medium">
                    {searchQuery ||
                    statusFilter !== "all" ||
                    yearFilter !== "all"
                      ? t.appointments.noAppointmentsMatch
                      : t.appointments.noAppointmentsFound}
                  </p>
                  {(searchQuery ||
                    statusFilter !== "all" ||
                    yearFilter !== "all") && (
                    <Button
                      variant="link"
                      className="mt-2"
                      onClick={() => {
                        setSearchQuery("");
                        setStatusFilter("all");
                        setYearFilter("all");
                      }}
                    >
                      {t.appointments.clearAllFilters}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {Object.entries(groupedAppointments).map(
                  ([yearMonth, apts]) => (
                    <div key={yearMonth}>
                      <div className="flex items-center gap-2 mb-3">
                        <Calendar className="h-4 w-4 text-primary" />
                        <h4 className="font-semibold text-primary">
                          {yearMonth}
                        </h4>
                        <div className="h-px flex-1 bg-border"></div>
                      </div>

                      <div className="space-y-3">
                        {apts.map((appointment) => (
                          <Card
                            key={appointment.id}
                            className="border-l-4 hover:bg-muted/50 hover:shadow-md transition-all duration-200 group"
                            style={{
                              borderLeftColor:
                                appointment.status === "COMPLETED"
                                  ? "rgb(34, 197, 94)"
                                  : appointment.status === "CANCELLED"
                                    ? "rgb(239, 68, 68)"
                                    : appointment.status === "CONFIRMED"
                                      ? "rgb(59, 130, 246)"
                                      : "rgb(234, 179, 8)",
                            }}
                          >
                            <CardContent className="p-5">
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 space-y-3">
                                  {/* Date and Time */}
                                  <div className="flex items-center gap-4 flex-wrap">
                                    <div className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-md">
                                      <Calendar className="h-4 w-4 text-primary" />
                                      <span className="font-medium text-sm">
                                        {formatDateByLanguage(
                                          appointment.appointmentDate,
                                          language,
                                          "numeric"
                                        )}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Clock className="h-4 w-4 text-muted-foreground" />
                                      <span className="text-sm text-muted-foreground font-medium">
                                        {appointment.appointmentTime}
                                      </span>
                                    </div>
                                  </div>

                                  {/* Service */}
                                  {appointment.service && (
                                    <div className="space-y-1">
                                      <p className="font-semibold text-lg group-hover:text-primary transition-colors">
                                        {appointment.service.name}
                                      </p>
                                      {appointment.service.description && (
                                        <p className="text-sm text-muted-foreground line-clamp-2">
                                          {appointment.service.description}
                                        </p>
                                      )}
                                      <div className="flex items-center gap-3 mt-2">
                                        <div className="flex items-center gap-1.5 bg-green-500/10 text-green-700 dark:text-green-400 px-2.5 py-1 rounded-md">
                                          <DollarSign className="h-3.5 w-3.5" />
                                          <span className="text-sm font-semibold">
                                            {(
                                              appointment.service.price / 100
                                            ).toFixed(2)}
                                          </span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-muted-foreground">
                                          <Clock className="h-3.5 w-3.5" />
                                          <span className="text-xs font-medium">
                                            {appointment.service.duration} min
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>

                                {/* Status Badge */}
                                <Badge
                                  variant={getStatusVariant(appointment.status)}
                                  className="shrink-0 text-xs px-3 py-1"
                                >
                                  {getStatusIcon(appointment.status)}
                                  {getStatusLabel(appointment.status)}
                                </Badge>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t.patients.close}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
