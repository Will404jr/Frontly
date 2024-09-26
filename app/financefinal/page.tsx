"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Dashboard from "./Dashboard";
import ExpenseTracker from "./ExpenseTracker";
import IncomeManager from "./IncomeManager";
import BudgetPlanner from "./BudgetPlanner";
import FinancialOverview from "./FinancialOverview";

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Financial Management App</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="income">Income</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
          <TabsTrigger value="overview">Overview</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard">
          <Dashboard />
        </TabsContent>
        <TabsContent value="expenses">
          <ExpenseTracker />
        </TabsContent>
        <TabsContent value="income">
          <IncomeManager />
        </TabsContent>
        <TabsContent value="budget">
          <BudgetPlanner />
        </TabsContent>
        <TabsContent value="overview">
          <FinancialOverview />
        </TabsContent>
      </Tabs>
    </div>
  );
}
