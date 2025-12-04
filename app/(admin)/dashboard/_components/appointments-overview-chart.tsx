"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface MonthlyRevenueData {
  month: string;
  revenue: number;
  appointments: number;
}

interface AppointmentsOverviewChartProps {
  data: MonthlyRevenueData[];
}

export function AppointmentsOverviewChart({
  data,
}: AppointmentsOverviewChartProps) {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            className="stroke-muted"
          />
          <XAxis
            dataKey="month"
            className="text-xs"
            tick={{ fill: "hsl(var(--muted-foreground))" }}
          />
          <YAxis
            className="text-xs"
            tick={{ fill: "hsl(var(--muted-foreground))" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "var(--radius)",
            }}
          />
          <Legend />
          <Bar
            dataKey="appointments"
            fill="hsl(var(--chart-2))"
            name="Appointments"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="revenue"
            fill="hsl(var(--chart-1))"
            name="Revenue ($)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

