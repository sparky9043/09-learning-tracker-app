import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "../ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../ui/chart";
import type { MonthlyData } from "@/types/types";

export const description = "A bar chart";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

interface BarChartsProps {
  dates: MonthlyData[];
}

const BarCharts = ({ dates }: BarChartsProps) => {
  const chartData = [...dates.slice(-6)];

  const totalTimeSpent = dates.reduce((prev, curr) => prev + curr.minutes_spent, 0);

  const totalHours = Math.floor(totalTimeSpent / 60);
  const totalMinutes = totalTimeSpent % 60;

  return (
    <Card className="w-3/4">
      <CardHeader>
        <CardTitle>Hours Tracker</CardTitle>
        <CardDescription>Progress: Last 6 Months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              // tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="minutes_spent" fill="var(--color-desktop)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {totalTimeSpent > 0 &&
          <div className="flex gap-2 leading-none font-medium">
            <TrendingUp className="h-4 w-4" />
            Total Time: {totalHours} hours {totalMinutes} minutes
          </div>
        }
        <div className="leading-none text-muted-foreground">
          Showing hours spent learning for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}

export default BarCharts;