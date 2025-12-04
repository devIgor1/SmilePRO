"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface AppointmentStatusData {
  status: string;
  count: number;
}

interface AppointmentStatusChartProps {
  data: AppointmentStatusData[];
  pendingCount: number;
  completedCount: number;
}

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export function AppointmentStatusChart({
  data,
  pendingCount,
  completedCount,
}: AppointmentStatusChartProps) {
  return (
    <>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data as Array<{
                status: string;
                count: number;
                [key: string]: any;
              }>}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name}: ${percent ? (percent * 100).toFixed(0) : 0}%`
              }
              outerRadius={80}
              fill="#8884d8"
              dataKey="count"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-muted-foreground">Pending: </span>
          <span className="font-semibold">{pendingCount}</span>
        </div>
        <div>
          <span className="text-muted-foreground">Completed: </span>
          <span className="font-semibold">{completedCount}</span>
        </div>
      </div>
    </>
  );
}

