"use client";
import { InventoryCard } from "@/components/InventoryCard";
import { useEffect, useState } from "react";
import { useUser } from "@/context/user";

interface InventoryItem {
  id: string;
  createdAt: string;
  amount: number;
  Item: {
    itemName: string;
    itemType: string;
    itemValue: any;
    itemImage?: string;
    gameId: number;
    extraDetails: string;
  };
}

export default function Inventory() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { userData } = useUser();

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch("/api/inventory/getInventory", {
          method: "POST",
          body: JSON.stringify({
            userId: userData?.id,
          }),
        });
        if (!response.ok) {
          throw new Error("Failed to fetch inventory");
        }
        const data = await response.json();
        setInventory(data.inventory);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (userData) {
      fetchInventory();
    }
  }, [userData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-6 flex items-center justify-center">
        <div className="text-xl">Loading inventory...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white p-6 flex items-center justify-center">
        <div className="text-xl text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1
          className="text-4xl font-bold"
          style={{
            fontSize: "48px",
            fontFamily: "Impact",
            fontStyle: "normal",
            fontWeight: "400",
          }}
        >
          Inventory
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {inventory.map((item) => (
          <InventoryCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
