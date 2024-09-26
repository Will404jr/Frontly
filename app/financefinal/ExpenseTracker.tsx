import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState([
    { id: 1, date: "2023-09-01", description: "Groceries", amount: 150.0 },
    { id: 2, date: "2023-09-05", description: "Gas", amount: 45.0 },
    {
      id: 3,
      date: "2023-09-10",
      description: "Electricity Bill",
      amount: 80.0,
    },
  ]);
  const [newExpense, setNewExpense] = useState({
    date: "",
    description: "",
    amount: "",
  });

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    setNewExpense({ ...newExpense, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setExpenses([
      ...expenses,
      {
        id: expenses.length + 1,
        ...newExpense,
        amount: parseFloat(newExpense.amount),
      },
    ]);
    setNewExpense({ date: "", description: "", amount: "" });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Expense Tracker</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              type="date"
              id="date"
              name="date"
              value={newExpense.date}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              type="text"
              id="description"
              name="description"
              value={newExpense.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input
              type="number"
              id="amount"
              name="amount"
              value={newExpense.amount}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <Button type="submit">Add Expense</Button>
      </form>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell>{expense.date}</TableCell>
              <TableCell>{expense.description}</TableCell>
              <TableCell>${expense.amount.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
