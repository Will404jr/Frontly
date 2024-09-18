"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Home,
  Utensils,
  Car,
  Film,
  ShoppingBag,
  MoreHorizontal,
  PlusCircle,
  Pencil,
} from "lucide-react";

interface Goal {
  category: string;
  amount: number;
  icon: React.ReactNode;
}

interface SavingsData {
  date: string;
  amount: number;
}

export default function Component() {
  const [goals, setGoals] = useState<Goal[]>([
    { category: "Housing", amount: 250, icon: <Home className="h-6 w-6" /> },
    { category: "Food", amount: 250, icon: <Utensils className="h-6 w-6" /> },
    {
      category: "Transportation",
      amount: 250,
      icon: <Car className="h-6 w-6" />,
    },
    {
      category: "Entertainment",
      amount: 250,
      icon: <Film className="h-6 w-6" />,
    },
    {
      category: "Shopping",
      amount: 250,
      icon: <ShoppingBag className="h-6 w-6" />,
    },
    {
      category: "Others",
      amount: 250,
      icon: <MoreHorizontal className="h-6 w-6" />,
    },
  ]);

  const [savingsGoal, setSavingsGoal] = useState({
    target: 20000,
    achieved: 12500,
    monthTarget: 2000,
  });

  const [savingsData, setSavingsData] = useState<SavingsData[]>([
    { date: "May 01", amount: 3000 },
    { date: "May 05", amount: 4000 },
    { date: "May 10", amount: 2000 },
    { date: "May 15", amount: 3500 },
    { date: "May 20", amount: 2500 },
    { date: "May 25", amount: 4000 },
    { date: "May 30", amount: 3500 },
  ]);

  const [newGoal, setNewGoal] = useState<Goal>({
    category: "",
    amount: 0,
    icon: null,
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddGoal = () => {
    if (newGoal.category && newGoal.amount) {
      setGoals([...goals, newGoal]);
      setNewGoal({ category: "", amount: 0, icon: null });
      setIsDialogOpen(false);
    }
  };

  const handleAdjustGoal = (index: number, newAmount: number) => {
    const updatedGoals = [...goals];
    updatedGoals[index].amount = newAmount;
    setGoals(updatedGoals);
  };

  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Financial Goals Dashboard</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Goal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Financial Goal</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Select
                  onValueChange={(value) =>
                    setNewGoal({ ...newGoal, category: value })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Housing">Housing</SelectItem>
                    <SelectItem value="Food">Food</SelectItem>
                    <SelectItem value="Transportation">
                      Transportation
                    </SelectItem>
                    <SelectItem value="Entertainment">Entertainment</SelectItem>
                    <SelectItem value="Shopping">Shopping</SelectItem>
                    <SelectItem value="Others">Others</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Amount
                </Label>
                <Input
                  id="amount"
                  type="number"
                  value={newGoal.amount}
                  onChange={(e) =>
                    setNewGoal({
                      ...newGoal,
                      amount: parseFloat(e.target.value),
                    })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <Button onClick={handleAddGoal}>Add Goal</Button>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal, index) => (
          <Card key={goal.category}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {goal.icon}
                <span className="ml-2">{goal.category}</span>
              </CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Adjust {goal.category} Goal</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="adjust-amount" className="text-right">
                        New Amount
                      </Label>
                      <Input
                        id="adjust-amount"
                        type="number"
                        defaultValue={goal.amount}
                        onChange={(e) =>
                          handleAdjustGoal(index, parseFloat(e.target.value))
                        }
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <Button onClick={() => {}}>Save Changes</Button>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${goal.amount}</div>
              <Progress value={50} className="mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Savings Goal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Target Achieved</span>
                <span className="font-bold">${savingsGoal.achieved}</span>
              </div>
              <Progress
                value={(savingsGoal.achieved / savingsGoal.target) * 100}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>$0</span>
                <span>${savingsGoal.target}</span>
              </div>
              <div className="flex justify-between">
                <span>This month's Target</span>
                <span className="font-bold">${savingsGoal.monthTarget}</span>
              </div>
              <Button variant="outline" className="w-full">
                <Pencil className="mr-2 h-4 w-4" /> Adjust Goal
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Savings Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={savingsData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#10b981"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
