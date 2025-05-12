"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/context/user";
import SubscriptionCard from "@/components/SubscriptionCard";
import dice from "@/images/dice.png";
import { SubscriptionData } from "@/lib/types";
import { toast } from "sonner";

const SubscriptionPlans = () => {
  const { userData } = useUser();
  const [subscriptions, setSubscriptions] = useState<SubscriptionData[]>([]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await fetch("/api/subscription/getAllSubscriptions");
        const data = await response.json();
        setSubscriptions(data);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch subscriptions:", error);
        toast.error(
          "Failed to load subscription plans. Please try again later."
        );
      }
    };

    fetchSubscriptions();
  }, []);

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
          {subscriptions.map((subscription) => (
            <SubscriptionCard
              key={subscription.id}
              id={subscription.id}
              tier={subscription.tier}
              cost={subscription.cost}
              benefits={subscription.benefits}
              planIsActive={
                userData?.premiumUser
                  ? subscription.tier.toLowerCase() === "premium"
                  : subscription.tier.toLowerCase() === "basic"
              }
              hero={
                subscription.tier.toLowerCase() === "basic"
                  ? dice.src
                  : undefined
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
