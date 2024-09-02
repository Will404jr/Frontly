"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";

type Transaction = {
  id: number;
  type: "income" | "expense";
  amount: number;
  description: string;
};

export default function FinanceTracker() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"income" | "expense">("income");

  const addTransaction = () => {
    if (amount && description) {
      const newTransaction: Transaction = {
        id: Date.now(),
        type,
        amount: parseFloat(amount),
        description,
      };
      setTransactions([...transactions, newTransaction]);
      setAmount("");
      setDescription("");
    }
  };

  const calculateBalance = () => {
    return transactions.reduce((acc, transaction) => {
      return transaction.type === "income"
        ? acc + transaction.amount
        : acc - transaction.amount;
    }, 0);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Finance Tracker</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Add Transaction</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div>
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter description"
                />
              </div>
              <RadioGroup
                defaultValue="income"
                onValueChange={(value) =>
                  setType(value as "income" | "expense")
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="income" id="income" />
                  <Label htmlFor="income">Income</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="expense" id="expense" />
                  <Label htmlFor="expense">Expense</Label>
                </div>
              </RadioGroup>
              <Button onClick={addTransaction}>
                <Plus className="mr-2 h-4 w-4" /> Add Transaction
              </Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className={`mb-2 p-2 rounded ${
                    transaction.type === "income"
                      ? "bg-green-500"
                      : "bg-red-400"
                  }`}
                >
                  <p className="font-semibold text-black">
                    {transaction.description}
                  </p>
                  <p className="text-black">
                    {transaction.type === "income" ? "+" : "-"} $
                    {transaction.amount.toFixed(2)}
                  </p>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Current Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">${calculateBalance().toFixed(2)}</p>
        </CardContent>
      </Card>
    </div>
  );
}
