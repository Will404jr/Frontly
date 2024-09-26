import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Chart from "chart.js/auto";

export default function FinancialOverview() {
  const incomeChartRef = useRef<HTMLCanvasElement | null>(null);
  const expenseChartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!incomeChartRef.current || !expenseChartRef.current) return;

    const incomeChart = new Chart(incomeChartRef.current, {
      type: "bar",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Income",
            data: [3000, 3200, 3100, 3400, 3300, 3500],
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    const expenseChart = new Chart(expenseChartRef.current, {
      type: "pie",
      data: {
        labels: [
          "Housing",
          "Food",
          "Transportation",
          "Utilities",
          "Entertainment",
        ],
        datasets: [
          {
            data: [950, 450, 180, 200, 100],
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
            ],
          },
        ],
      },
    });

    return () => {
      incomeChart.destroy();
      expenseChart.destroy();
    };
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Financial Overview</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Income Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <canvas ref={incomeChartRef}></canvas>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <canvas ref={expenseChartRef}></canvas>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
