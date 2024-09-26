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

export default function IncomeManager() {
  const [incomes, setIncomes] = useState([
    { id: 1, date: "2023-09-01", source: "Salary", amount: 3000.0 },
    { id: 2, date: "2023-09-15", source: "Freelance", amount: 500.0 },
  ]);
  const [newIncome, setNewIncome] = useState({
    date: "",
    source: "",
    amount: "",
  });

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    setNewIncome({ ...newIncome, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIncomes([
      ...incomes,
      {
        id: incomes.length + 1,
        ...newIncome,
        amount: parseFloat(newIncome.amount),
      },
    ]);
    setNewIncome({ date: "", source: "", amount: "" });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Income Manager</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              type="date"
              id="date"
              name="date"
              value={newIncome.date}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="source">Source</Label>
            <Input
              type="text"
              id="source"
              name="source"
              value={newIncome.source}
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
              value={newIncome.amount}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <Button type="submit">Add Income</Button>
      </form>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {incomes.map((income) => (
            <TableRow key={income.id}>
              <TableCell>{income.date}</TableCell>
              <TableCell>{income.source}</TableCell>
              <TableCell>${income.amount.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
