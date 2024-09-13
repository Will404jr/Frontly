"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { DollarSignIcon, MinusIcon, PlusIcon } from "./icons"; // Assuming you've moved the icons to a separate file

interface Transaction {
  _id: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  date: string;
}

export default function Finance() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/financeTracker");
        const data = await res.json();
        setTransactions(data); // Ensure that 'data' matches the 'Transaction[]' type
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const calculateTotal = (type: "income" | "expense") => {
    return transactions
      .filter((t: Transaction) => t.type === type) // Explicitly declare 't' as 'Transaction'
      .reduce((sum, t) => sum + t.amount, 0)
      .toFixed(2);
  };

  const totalIncome = calculateTotal("income");
  const totalExpenses = calculateTotal("expense");
  const balance = (parseFloat(totalIncome) - parseFloat(totalExpenses)).toFixed(
    2
  );

  return (
    <Card className="w-full max-w-xl p-6 grid gap-6 bg-slate-50 text-black">
      {loading && <div>Loading...</div>}
      {!loading && (
        <div className="grid gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-green-500 rounded-md p-3 flex items-center justify-center">
              <DollarSignIcon className="w-6 h-6 text-green-500-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Income</p>
              <p className="text-2xl font-semibold text-green-500">
                ${totalIncome}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-red-500 rounded-md p-3 flex items-center justify-center">
              <MinusIcon className="w-6 h-6 text-red-500-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Expenses</p>
              <p className="text-2xl font-semibold text-red-500">
                ${totalExpenses}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-blue-500 rounded-md p-3 flex items-center justify-center">
              <PlusIcon className="w-6 h-6 text-blue-500-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Balance</p>
              <p className="text-2xl font-semibold text-blue-500">${balance}</p>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
