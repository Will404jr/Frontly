"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Transaction {
  _id: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  date: string;
}

export default function Finance() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [type, setType] = useState<"income" | "expense">("income");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      setLoadingMessage("Loading transactions...");
      try {
        const res = await fetch("/api/financeTracker");
        const data = await res.json();
        setTransactions(data);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      } finally {
        setLoading(false);
        setLoadingMessage("");
      }
    };

    fetchTransactions();
  }, []);

  const addTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !category || !date) return;

    const newTransaction = {
      type,
      amount: parseFloat(amount),
      category,
      date,
    };

    setLoading(true);
    setLoadingMessage("Adding transaction...");
    try {
      const res = await fetch("/api/financeTracker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTransaction),
      });

      if (res.ok) {
        const data = await res.json();
        setTransactions([
          ...transactions,
          { ...newTransaction, _id: data.transactionId },
        ]);
        setAmount("");
        setCategory("");
        setDate("");
      } else {
        console.error("Failed to add transaction:", await res.json());
      }
    } catch (error) {
      console.error("Failed to add transaction:", error);
    } finally {
      setLoading(false);
      setLoadingMessage("");
    }
  };

  const deleteTransaction = async (id: string) => {
    setLoading(true);
    setLoadingMessage("Deleting transaction...");
    try {
      const res = await fetch(`/api/financeTracker/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setTransactions(transactions.filter((t) => t._id !== id));
      } else {
        console.error("Failed to delete transaction:", await res.json());
      }
    } catch (error) {
      console.error("Failed to delete transaction:", error);
    } finally {
      setLoading(false);
      setLoadingMessage("");
    }
  };

  const calculateTotal = (type: "income" | "expense") => {
    return transactions
      .filter((t) => t.type === type)
      .reduce((sum, t) => sum + t.amount, 0)
      .toFixed(2);
  };

  const balance = (
    parseFloat(calculateTotal("income")) - parseFloat(calculateTotal("expense"))
  ).toFixed(2);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8 text-black">
      {loading && (
        <div className="text-center text-gray-500">{loadingMessage}</div>
      )}

      <Card className="mx-auto shadow-lg w-full bg-slate-50">
        <CardHeader className="bg-blue-600 text-white p-4 rounded-t-lg">
          <CardTitle className="text-lg font-semibold">
            Add New Transaction
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <form onSubmit={addTransaction} className="space-y-4">
            <div className="flex space-x-4">
              <select
                value={type}
                onChange={(e) =>
                  setType(e.target.value as "income" | "expense")
                }
                className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
            <Input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
            <Input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
            <Button
              type="submit"
              className="w-full bg-[#03addc] hover:bg-[#03addc] text-black py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#03addc] focus:ring-opacity-50"
              disabled={loading}
            >
              <Plus className="mr-2 h-4 w-4" /> Add Transaction
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Cards for totals */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card className="bg-slate-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              shs.{calculateTotal("income")}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Expenses
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              shs.{calculateTotal("expense")}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${
                parseFloat(balance) >= 0 ? "text-blue-600" : "text-red-600"
              }`}
            >
              shs.{balance}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent transactions */}
      <Card className="bg-slate-50">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-500">
                    No transactions available.
                  </TableCell>
                </TableRow>
              ) : (
                transactions.map((transaction) => (
                  <TableRow key={transaction._id}>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>
                      {transaction.type === "income" ? (
                        <TrendingUp className="text-green-600" />
                      ) : (
                        <TrendingDown className="text-red-600" />
                      )}
                    </TableCell>
                    <TableCell>{transaction.category}</TableCell>
                    <TableCell className="text-right">
                      shs.{transaction.amount.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => deleteTransaction(transaction._id)}
                        disabled={loading}
                        className="bg-red-600 border-none"
                      >
                        <Trash2 className="h-4 w-4 text-white" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
