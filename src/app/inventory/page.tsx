"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";

const items = [
  {
    id: 1,
    name: "Pubg 600 UC",
    price: 200,
    originalPrice: 500,
    discount: "60% off",
    image: "/images/valorant.png",
    expiresIn: "2 days",
    boughtBy: 200,
  },
  {
    id: 2,
    name: "Fortnite 1000 V Bucks",
    price: 200,
    originalPrice: 500,
    discount: "60% off",
    image: "/images/valorant.png",
    expiresIn: "2 days",
    boughtBy: 200,
  },
  {
    id: 3,
    name: "Valorant 600 Points",
    price: 200,
    originalPrice: 500,
    discount: "60% off",
    image: "/images/valorant.png",
    expiresIn: "2 days",
    boughtBy: 200,
  },
];

export default function Inventory() {
  const [activeTab, setActiveTab] = useState("description");
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
        {items.map((item) => (
          <div key={item.id} className="bg-[#222222] p-4 rounded-lg shadow-lg">
            <Image
              src={item.image}
              alt={item.name}
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
              {item.name}
            </h2>
            <p className="text-sm text-gray-300">
              Purchased on: {item.boughtBy}
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
                  <Image
                    style={{ width: "380px" }}
                    src="/images/valorant.png"
                    alt="Valorant 600 Points"
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
                  Valorant 600 Points
                </h2>

                <div className="flex flex-wrap items-center justify-center sm:justify-start mt-0 text-center sm:text-left">
                  <span
                    className="text-yellow-400 font-bold"
                    style={{ fontSize: "16px" }}
                  >
                    🪙 200
                  </span>
                  <span className="text-gray-400 line-through ml-2 text-sm">
                    500
                  </span>
                  <span className="bg-red-600 text-white text-sm px-2 py-0 ml-2">
                    60% off
                  </span>
                </div>

                {/* Tab Buttons */}
                <div className="flex justify-center sm:justify-start mt-0 border-b border-gray-600">
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
                    Valorant is a very competitive game, and it has a large and
                    active esports scene. The game is also very popular among
                    casual players.
                  </p>
                )}
                {activeTab === "how-to-redeem" && (
                  <p className="text-gray-300 mt-0 text-center sm:text-left">
                    Use the code sent in your inbox
                  </p>
                )}

                {/* Email Input */}
                <p className="mt-1 text-gray-50 text-center sm:text-left">
                  The code will be sent to the following email ID
                </p>
                <Input
                  defaultValue="jakejonas@gmail.com"
                  className="mt-0 p-2 rounded bg-gray-700 text-white w-full"
                />

                <DialogFooter>
                  <Button className="w-full bg-gradient-to-r from-[#692CCD] to-[#B87FF6] text-white font-bold py-2 mt-4 hover:opacity-90">
                    Claim Now
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </div>
    </div>
  );
}
