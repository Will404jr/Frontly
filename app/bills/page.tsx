"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { CheckIcon, TrashIcon, PlusIcon, SearchIcon } from "lucide-react";

interface Bill {
  id: number;
  dueDate: string;
  description: string;
  lastCharge: string;
  amount: number;
}

export default function Component() {
  const [bills, setBills] = useState<Bill[]>([
    {
      id: 1,
      dueDate: "May 15",
      description: "Figma - Yearly Plan",
      lastCharge: "14 May, 2022",
      amount: 150,
    },
    {
      id: 2,
      dueDate: "Jun 16",
      description: "Adobe Inc - Yearly Plan",
      lastCharge: "17 Jun, 2022",
      amount: 559,
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newBill, setNewBill] = useState<Omit<Bill, "id">>({
    dueDate: "",
    description: "",
    lastCharge: "",
    amount: 0,
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddBill = () => {
    setBills([...bills, { ...newBill, id: Date.now() }]);
    setNewBill({ dueDate: "", description: "", lastCharge: "", amount: 0 });
    setIsDialogOpen(false);
  };

  const handleClearBill = (id: number) => {
    setBills(
      bills.map((bill) => (bill.id === id ? { ...bill, amount: 0 } : bill))
    );
  };

  const handleDeleteBill = (id: number) => {
    setBills(bills.filter((bill) => bill.id !== id));
  };

  const filteredBills = bills.filter((bill) =>
    bill.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Upcoming Bills</h1>
        <div className="flex items-center space-x-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusIcon className="mr-2 h-4 w-4" /> Add Bill
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Bill</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Input
                    id="description"
                    value={newBill.description}
                    onChange={(e) =>
                      setNewBill({ ...newBill, description: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="amount" className="text-right">
                    Amount
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    value={newBill.amount}
                    onChange={(e) =>
                      setNewBill({
                        ...newBill,
                        amount: parseFloat(e.target.value),
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="lastCharge" className="text-right">
                    Last Charge
                  </Label>
                  <Input
                    id="lastCharge"
                    type="date"
                    value={newBill.lastCharge}
                    onChange={(e) =>
                      setNewBill({ ...newBill, lastCharge: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="dueDate" className="text-right">
                    Due Date
                  </Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newBill.dueDate}
                    onChange={(e) =>
                      setNewBill({ ...newBill, dueDate: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
              </div>
              <Button onClick={handleAddBill}>Add Bill</Button>
            </DialogContent>
          </Dialog>
          <div className="relative">
            <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search bills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Due Date</TableHead>
            <TableHead>Item Description</TableHead>
            <TableHead>Last Charge</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Options</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredBills.map((bill) => (
            <TableRow key={bill.id}>
              <TableCell>{bill.dueDate}</TableCell>
              <TableCell>{bill.description}</TableCell>
              <TableCell>{bill.lastCharge}</TableCell>
              <TableCell>${bill.amount}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleClearBill(bill.id)}
                >
                  <CheckIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteBill(bill.id)}
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
