"use client";

import { useState } from "react";
import OrderForm from "@/components/OrderForm";
import OrderList from "@/components/OrderList";
import AccountInfo from "@/components/AccountInfo";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function DashboardPage() {
  const [selectedAccount, setSelectedAccount] = useState(null);

  return (
    <ProtectedRoute>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <AccountInfo onSelectAccount={setSelectedAccount} />
        <OrderList accountNo={selectedAccount} />
        <OrderForm />
      </div>
    </ProtectedRoute>
  );
}
