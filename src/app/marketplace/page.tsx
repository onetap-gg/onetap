"use client";
import { CouponCard } from "@/components/CouponCard";
import { useUser } from "@/context/user";
import { useState, useEffect } from "react";

interface CouponData {
  item_id: number;
  available_instances: number;
  marketplace_ids: number[];
  points_to_redeem: number;
  gameId: number;
  archived: boolean;
  itemName: string;
  itemType: string;
  itemValue: string[] | null;
  extraDetails: {
    description: string;
    points_to_redeem: string | number;
  };
}

export default function Marketplace() {
  const [coupons, setCoupons] = useState<CouponData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [filter, setFilter] = useState<number>(0);
  const { userData, setUserData } = useUser();

  useEffect(() => {
    async function fetchCoupons() {
      try {
        const response = await fetch("/api/marketplace/getAllCoupons");
        if (!response.ok) {
          throw new Error("Failed to fetch coupons");
        }
        const data = await response.json();
        setCoupons(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }
    const fetchUserInfo = async () => {
      try {
        const response = await fetch("/api/user/getUserInfo");

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserData(data);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load user data");
      }
    };

    fetchUserInfo();
    fetchCoupons();
  }, [setUserData]);

  const filteredCoupons = () => {
    if (filter === 0) return coupons;
    return coupons.filter((coupon) => coupon.gameId === filter);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(Number(event.target.value));
  };

  const filterOptions = {
    1: "Dota 2",
    2: "Valorant",
    3: "COD Warzone",
    4: "PUBG",
    5: "Fall Guys",
    6: "Fortnite",
    7: "Hearthstone",
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-6 flex items-center justify-center">
        <div className="text-xl">Loading coupons...</div>
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
    <div className="min-h-screen bg-black text-white p-6 pl-10">
      <div className="flex justify-between items-center mb-6">
        <h1
          className="text-4xl font-bold pl-4"
          style={{
            fontSize: "48px",
            fontFamily: "Impact",
            fontStyle: "normal",
            fontWeight: "400",
          }}
        >
          Marketplace
        </h1>
        <div>
          <div className="m-2 ml-0">Balance: {userData?.balance} 🪙</div>
          <div className="border border-gray-600 rounded-md px-4 py-2 cursor-pointer">
            <span>Filter</span>
            <select
              className="bg-black text-white ml-2"
              onChange={handleFilterChange}
              value={filter}
            >
              <option value={0}>No filter</option>
              {Object.entries(filterOptions).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {showSuccess && (
        <div className="mb-4 p-4 bg-green-500 text-white rounded">
          {successMessage}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCoupons().map((coupon) => {
          return (
            <CouponCard
              key={coupon.item_id}
              itemId={coupon.item_id}
              name={coupon.itemName}
              description={
                JSON.parse(coupon.extraDetails as unknown as string).description
              }
              points={coupon.points_to_redeem}
              gameId={coupon.gameId}
              availableInstances={coupon.available_instances}
              onSuccess={(message) => {
                setSuccessMessage(message);
                setShowSuccess(true);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
