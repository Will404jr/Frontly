import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function BudgetPlanner() {
  const [budgets, setBudgets] = useState([
    { id: 1, category: "Housing", budgeted: 1000, spent: 950 },
    { id: 2, category: "Food", budgeted: 500, spent: 450 },
    { id: 3, category: "Transportation", budgeted: 200, spent: 180 },
  ]);
  const [newBudget, setNewBudget] = useState({ category: "", budgeted: "" });

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    setNewBudget({ ...newBudget, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setBudgets([
      ...budgets,
      {
        id: budgets.length + 1,
        ...newBudget,
        budgeted: parseFloat(newBudget.budgeted),
        spent: 0,
      },
    ]);
    setNewBudget({ category: "", budgeted: "" });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Budget Planner</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="category">Category</Label>
            <Input
              type="text"
              id="category"
              name="category"
              value={newBudget.category}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="budgeted">Budgeted Amount</Label>
            <Input
              type="number"
              id="budgeted"
              name="budgeted"
              value={newBudget.budgeted}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <Button type="submit">Add Budget</Button>
      </form>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Category</TableHead>
            <TableHead>Budgeted</TableHead>
            <TableHead>Spent</TableHead>
            <TableHead>Remaining</TableHead>
            <TableHead>Progress</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {budgets.map((budget) => (
            <TableRow key={budget.id}>
              <TableCell>{budget.category}</TableCell>
              <TableCell>${budget.budgeted.toFixed(2)}</TableCell>
              <TableCell>${budget.spent.toFixed(2)}</TableCell>
              <TableCell>
                ${(budget.budgeted - budget.spent).toFixed(2)}
              </TableCell>
              <TableCell>
                <Progress
                  value={(budget.spent / budget.budgeted) * 100}
                  className="w-[60%]"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
