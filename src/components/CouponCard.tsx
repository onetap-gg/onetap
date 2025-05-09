import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Image from "next/image";
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

  return (
    <div className="rounded bg-[#222222] min-w-[20rem] h-[40vh] flex flex-col justify-between">
      <div className="flex">
        <div className="p-2">
          <img className="" src={`/images/${gameId}.png`} alt="" />
          <p className="text-2xl font-Impact">{points} Points</p>
        </div>
      </div>
      <div className="p-2">
        <h2>{name}</h2>
        <p>{description}</p>
        <div>
          <Button onClick={() => setIsModalOpen(true)} className="w-full">
            Redeem Now
          </Button>
        </div>
      </div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-[#3D3D3D] text-white max-w-xs sm:max-w-md sm:mb-10 mt-0 overflow-auto">
          <div className="relative w-full flex items-center justify-center">
            <Image
              style={{ width: "380px" }}
              src={`/images/${gameId}.png`}
              alt={name}
              width={500}
              height={250}
            />
          </div>

          <h2
            className="sm:text-[20px] font-bold mt-1 text-center sm:text-left"
            style={{
              fontFamily: "Impact",
              fontWeight: "400",
              fontSize: "25px",
            }}
          >
            {name}
          </h2>

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
              className={`px-4 py-2 text-sm font-medium ${
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
              className={`px-4 py-2 text-sm font-medium ${
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
                fontFamily: "Poppins",
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

          <p className="text-gray-300 mt-4">
            The code will be sent to the following email ID
          </p>
          <Input
            defaultValue="jakejonas@gmail.com"
            className="mt-0 p-2 rounded bg-gray-700 text-white w-full"
          />

          <DialogFooter>
            <Button
              className="w-full bg-gradient-to-r from-[#692CCD] to-[#B87FF6] text-white font-bold py-2 mt-4 hover:opacity-90"
              onClick={() => {
                onSuccess(
                  `Successfully redeemed ${name} for ${points} points!`
                );
                setIsModalOpen(false);
              }}
            >
              Claim Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
