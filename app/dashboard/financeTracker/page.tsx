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
    <div className="max-w-4xl mx-auto p-2 sm:p-4 space-y-4 sm:space-y-8 text-black">
      {loading && (
        <div className="text-center text-gray-500">{loadingMessage}</div>
      )}

      <Card className="mx-auto shadow-lg w-full bg-slate-50">
        <CardHeader className="bg-blue-600 text-white p-3 sm:p-4 rounded-t-lg">
          <CardTitle className="text-base sm:text-lg font-semibold">
            Add New Transaction
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-6 space-y-4 sm:space-y-6">
          <form onSubmit={addTransaction} className="space-y-3 sm:space-y-4">
            <div className="flex space-x-2 sm:space-x-4">
              <select
                value={type}
                onChange={(e) =>
                  setType(e.target.value as "income" | "expense")
                }
                className="block w-full py-1 sm:py-2 px-2 sm:px-3 text-sm sm:text-base border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
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
              className="w-full py-1 sm:py-2 px-2 sm:px-3 text-sm sm:text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
            <Input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full py-1 sm:py-2 px-2 sm:px-3 text-sm sm:text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full py-1 sm:py-2 px-2 sm:px-3 text-sm sm:text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
            <Button
              type="submit"
              className="w-full bg-[#03addc] hover:bg-[#03addc] text-black py-1 sm:py-2 px-3 sm:px-4 text-sm sm:text-base rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#03addc] focus:ring-opacity-50"
              disabled={loading}
            >
              <Plus className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> Add
              Transaction
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Cards for totals */}
      <div className="grid gap-2 sm:gap-4 grid-cols-1 sm:grid-cols-3">
        <Card className="bg-slate-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">
              Total Income
            </CardTitle>
            <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-2xl font-bold text-green-600">
              shs.{calculateTotal("income")}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">
              Total Expenses
            </CardTitle>
            <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-2xl font-bold text-red-600">
              shs.{calculateTotal("expense")}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">
              Balance
            </CardTitle>
            <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div
              className={`text-lg sm:text-2xl font-bold ${
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
          <CardTitle className="text-base sm:text-lg">
            Recent Transactions
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs sm:text-sm">Date</TableHead>
                <TableHead className="text-xs sm:text-sm">Type</TableHead>
                <TableHead className="text-xs sm:text-sm">Category</TableHead>
                <TableHead className="text-xs sm:text-sm text-right">
                  Amount
                </TableHead>
                <TableHead className="text-xs sm:text-sm text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center text-gray-500 text-xs sm:text-sm"
                  >
                    No transactions available.
                  </TableCell>
                </TableRow>
              ) : (
                transactions.map((transaction) => (
                  <TableRow key={transaction._id}>
                    <TableCell className="text-xs sm:text-sm">
                      {transaction.date}
                    </TableCell>
                    <TableCell>
                      {transaction.type === "income" ? (
                        <TrendingUp className="text-green-600 h-3 w-3 sm:h-4 sm:w-4" />
                      ) : (
                        <TrendingDown className="text-red-600 h-3 w-3 sm:h-4 sm:w-4" />
                      )}
                    </TableCell>
                    <TableCell className="text-xs sm:text-sm">
                      {transaction.category}
                    </TableCell>
                    <TableCell className="text-xs sm:text-sm text-right">
                      shs.{transaction.amount.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => deleteTransaction(transaction._id)}
                        disabled={loading}
                        className="bg-red-600 border-none p-1 sm:p-2"
                      >
                        <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
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
