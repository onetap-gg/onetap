import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useUser } from "@/context/user";
import { useState } from "react";

interface CouponCardProps {
  itemId: number;
  name: string;
  description: string;
  points: number;
  gameId: number;
  availableInstances: number;
  onSuccess: (message: string) => void;
}

export const CouponCard = ({
  itemId,
  name,
  description,
  points,
  gameId,
  availableInstances,
  onSuccess,
}: CouponCardProps) => {
  const [activeTab, setActiveTab] = useState("description");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRedeeming, setIsRedeeming] = useState(false);
  const { userData } = useUser();

  const handleClaim = async () => {
    try {
      setError(null);
      setIsRedeeming(true);

      if (!userData) {
        setError("Please log in to redeem coupons");
        return;
      }

      if (availableInstances <= 0) {
        setError("This coupon is currently sold out");
        return;
      }

      if (userData.balance < points) {
        setError("Insufficient balance to redeem this coupon");
        return;
      }

      const response = await fetch("/api/marketplace/redeemCoupon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemId,
          points,
          userId: userData.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to redeem coupon");
      }

      onSuccess(`Successfully redeemed ${name} for ${points} points!`);
      setIsModalOpen(false);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while redeeming the coupon"
      );
    } finally {
      setIsRedeeming(false);
    }
  };

  return (
    <div className="rounded-[0.45rem] bg-[#222222] w-[14rem] min-h-[40vh] flex flex-col justify-between">
      <div>
        <img
          className="rounded-t-[0.45rem]"
          src={`/images/${gameId}.png`}
          alt={name}
        />
        <p className="text-xl font-[Impact] m-2">{name}</p>
        <p className="ml-2">🪙{points} Points</p>
      </div>
      <div className="p-2">
        <p>{description}</p>
        <div className="m-3">
          <Button
            onClick={() => setIsModalOpen(true)}
            className="w-full rounded-[0.45rem] bg-linear-to-r border-solid border-[1px] border-[#9D9D9D] from-[#692CCD] to-[#B87FF6]"
            disabled={availableInstances <= 0}
          >
            {availableInstances <= 0 ? "Sold Out" : "Redeem Now"}
          </Button>
        </div>
      </div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-[#3D3D3D] text-white max-w-xs sm:max-w-md sm:mb-10 mt-0 overflow-auto">
          <div className="relative w-full flex items-center justify-center">
            <img
              src={`/images/${gameId}.png`}
              alt={name}
              className="max-w-[250px] max-h-[250px]"
            />
          </div>
          <DialogTitle
            className="sm:text-[20px] font-bold text-center sm:text-left"
            style={{
              fontFamily: "Impact",
              fontWeight: "400",
              fontSize: "25px",
            }}
          >
            {name}
          </DialogTitle>

          <div className="flex flex-wrap items-center justify-center sm:justify-start mt-0 text-center sm:text-left">
            <span
              className="text-yellow-400 font-bold"
              style={{ fontSize: "16px" }}
            >
              🪙 {points}
            </span>
          </div>

          <div className="flex border-b border-gray-600">
            <button
              style={{
                fontFamily: "Impact",
                fontWeight: "400",
                fontSize: "20px",
              }}
              className={`px-4 text-sm font-medium ${
                activeTab === "description"
                  ? "text-purple-400 border-b-2 border-purple-400"
                  : "text-gray-400"
              }`}
              onClick={() => setActiveTab("description")}
            >
              Description
            </button>
            <button
              style={{
                fontFamily: "Impact",
                fontWeight: "400",
                fontSize: "20px",
              }}
              className={`px-4 text-sm font-medium ${
                activeTab === "how-to-redeem"
                  ? "text-purple-400 border-b-2 border-purple-400"
                  : "text-gray-400"
              }`}
              onClick={() => setActiveTab("how-to-redeem")}
            >
              How To Redeem
            </button>
          </div>

          {activeTab === "description" && (
            <p
              className="text-gray-300 mt-0 text-center sm:text-left"
              style={{
                fontFamily: "sans-serif",
                fontWeight: "100",
                fontSize: "16px",
                color: "#C6C6C6",
              }}
            >
              {description}
            </p>
          )}
          {activeTab === "how-to-redeem" && (
            <p className="text-gray-300 mt-0 text-center sm:text-left">
              Use the code sent in your inbox
            </p>
          )}

          <p className="text-gray-500">
            The code will be sent to the following email ID
          </p>
          <Input
            defaultValue={userData?.email || ""}
            disabled
            className="mt-0 p-2 rounded bg-gray-700 text-white w-full"
          />

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <DialogFooter>
            <Button
              className="w-full bg-gradient-to-r from-[#692CCD] to-[#B87FF6] text-white font-bold hover:opacity-90"
              onClick={handleClaim}
              disabled={isRedeeming}
            >
              {isRedeeming ? "Processing..." : "Claim Now"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
