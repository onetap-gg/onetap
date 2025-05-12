"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { DialogTitle } from "@radix-ui/react-dialog";
import Image from "next/image";
import { useState } from "react";

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
    extraDetails: {
      description: string;
      points_to_redeem: number;
    };
  };
}

export const InventoryCard = (item: InventoryItem) => {
  const [activeTab, setActiveTab] = useState("description");
  const defaultImage = "/placeholder-image.png"; // Add a default image path

  return (
    <div key={item.id} className="bg-[#222222] p-4 rounded-lg shadow-lg">
      <Image
        src={`/images/${item.Item.gameId}.png`}
        alt={item.Item.itemName}
        width={300}
        height={200}
        className="rounded-md"
      />
      <h2
        className="text-lg font-semibold mt-2"
        style={{
          fontFamily: " Impact",
          fontWeight: "400",
          fontSize: "20px",
        }}
      >
        {item.Item.itemName}
      </h2>
      <p className="text-sm text-gray-300">
        Purchased on: {new Date(item.createdAt).toLocaleDateString()}
      </p>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full bg-gradient-to-r from-[#692CCD] to-[#B87FF6] text-white font-bold py-2 mt-4 hover:opacity-90">
            View Details
          </Button>
        </DialogTrigger>
        <DialogContent
          className="bg-[#3D3D3D] text-white max-w-xs sm:max-w-md  
    sm:mb-10 mt-0 overflow-auto"
        >
          <div className="relative w-full flex items-center justify-center">
            <img
              src={`/images/${item.Item.gameId}.png`}
              alt={item.Item.itemName}
              className="max-w-[250px] max-h-[250px]"
            />
          </div>

          <DialogTitle
            className="sm:text-[20px] font-bold mt-1 text-center sm:text-left"
            style={{
              fontFamily: "Impact",
              fontWeight: "400",
              fontSize: "25px",
            }}
          >
            {item.Item.itemName}
          </DialogTitle>

          <div className="flex flex-wrap items-center justify-center sm:justify-start mt-0 text-center sm:text-left">
            <span
              className="text-yellow-400 font-bold"
              style={{ fontSize: "16px" }}
            >
              🪙 {item.amount}
            </span>
          </div>

          {/* Tab Buttons */}
          <div className="flex border-b border-gray-700">
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
              {item.Item.extraDetails.description}
            </p>
          )}
          {activeTab === "how-to-redeem" && (
            <p className="text-gray-300 mt-0 text-center sm:text-left">
              Use the code sent in your inbox
            </p>
          )}

          {/* Email Input */}
          <p className=" text-gray-50 text-center sm:text-left">
            The code will be sent to the following email ID
          </p>
          <Input
            defaultValue="jakejonas@gmail.com"
            className="mt-0 p-2 rounded bg-gray-700 text-white w-full"
          />

          <DialogFooter>
            <Button className="w-full bg-gradient-to-r from-[#692CCD] to-[#B87FF6] text-white font-bold py-2 hover:opacity-90">
              Claim Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
