"use client";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import dice from "@/images/dice.png";
import { HiSparkles } from "react-icons/hi";

const SubscriptionPlans = () => {
  return (
    <div className="min-h-screen flex bg-[#0a0a0a] text-white p-6">
      <div className="w-full max-w-5xl">
        <h1
          className="text-3xl font-bold mb-10 pl-8"
          style={{
            fontSize: "48px",
            fontFamily: "Impact",
            fontStyle: "normal",
            fontWeight: "400",
          }}
        >
          Subscription Plan
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6 p-4">
          <div className="border border-gray-700  overflow-hidden w-full sm:w-4/5 md:w-85 mx-auto">
            <div className="bg-[#1A1717] p-6 flex flex-col items-center relative">
              <span className="absolute top-0 right-0 bg-green-500 text-black text-sm font-bold px-3 py-1 ">
                Active Plan
              </span>
              <Image
                src={dice}
                alt="Basic Plan"
                className="w-25 mb-4"
                style={{ transform: "rotate(-25deg)" }}
              />

              <h2
                className="text-xl font-bold"
                style={{
                  fontSize: "32px",
                  fontFamily: "Impact",
                  fontStyle: "normal",
                  fontWeight: "400",
                }}
              >
                BASIC PLAN
              </h2>
              <p
                className="text-lg text-purple-400 font-bold"
                style={{
                  fontSize: "32px",
                  fontFamily: "Impact",
                  fontStyle: "normal",
                  fontWeight: "400",
                }}
              >
                Free
              </p>
            </div>
            <div className="bg-[#262626] h-75 p-4">
              <ul
                className="space-y-3"
                style={{
                  fontSize: "16px",
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: "400",
                }}
              >
                <li className="flex items-center space-x-8 pl-5 pt-10">
                  <Check className="text-purple-500" size={20} />
                  <span>Daily Challenges and Rewards</span>
                </li>
                <li className="flex items-center space-x-8 pl-5">
                  <Check className="text-purple-500" size={20} />
                  <span>Daily Challenges and Rewards</span>
                </li>
                <li className="flex items-center space-x-8 pl-5">
                  <Check className="text-purple-500" size={20} />
                  <span>Daily Challenges and Rewards</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border border-yellow-600 overflow-hidden w-full sm:w-4/5 md:w-85 mx-auto">
            <div className="bg-gradient-to-b from-[#A98848] to[#F5D0873D] p-6 flex flex-col items-center">
              <div
                className="rounded-full p-2 bg-yellow-500 border-5 border-white mb-4"
                style={{ width: "100px", height: "100px" }}
              >
                <HiSparkles className="w-full h-full" />
              </div>

              <h2
                className="text-xl font-bold"
                style={{
                  fontSize: "32px",
                  fontFamily: "Impact",
                  fontStyle: "normal",
                  fontWeight: "400",
                }}
              >
                PREMIUM PLAN
              </h2>
              <p
                className="text-lg font-bold text-yellow-200"
                style={{
                  fontSize: "32px",
                  fontFamily: "Impact",
                  fontStyle: "normal",
                  fontWeight: "400",
                }}
              >
                Rs 99 / Month
              </p>
            </div>
            <div className="bg-[#262626] p-4 h-75">
              <p
                className="text-yellow-400 font-semibold mb-2 text-center"
                style={{
                  fontSize: "16px",
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: "400",
                  paddingTop: "25px",
                }}
              >
                Everything included in basic plan plus
              </p>
              <ul
                className="space-y-3"
                style={{
                  fontSize: "16px",
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: "400",
                }}
              >
                <li className="flex items-center space-x-8 pl-5">
                  <Check className="text-yellow-500" size={20} />
                  <span>Daily Challenges and Rewards</span>
                </li>
                <li className="flex items-center space-x-8 pl-5">
                  <Check className="text-yellow-500" size={20} />
                  <span>Daily Challenges and Rewards</span>
                </li>
              </ul>
              <div className="flex items-center justify-center mt-8">
                <Button
                  className="bg-gradient-to-b from-[#AB8E55] to-[#AE780F] text-white font-bold w-60 hover:bg-gradient-to-b hover:from-[#AB8E55] hover:to-[#AE780F] "
                  style={{
                    borderRadius: "4px",
                    fontSize: "20px",
                    fontFamily: "Capuche Trial",
                    fontStyle: "normal",
                    fontWeight: "900",
                  }}
                >
                  Upgrade To Premium
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
