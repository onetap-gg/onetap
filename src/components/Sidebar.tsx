"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpenIcon,
  Headset,
  Menu,
  Package,
  ShoppingBagIcon,
} from "lucide-react";
import { GoHome } from "react-icons/go";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Profile", href: "/profile", icon: GoHome, active: true },
  {
    name: "Subscription",
    href: "/subscription",
    icon: BookOpenIcon,
    active: false,
  },
  {
    name: "Marketplace",
    href: "/marketplace",
    icon: ShoppingBagIcon,
    active: false,
  },
  { name: "Inventory", href: "/inventory", icon: Package, active: false },
  { name: "Support", href: "/leaderboard", icon: Headset, active: false },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu className="h-4 w-4" />
      </Button>
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:translate-x-0 transition duration-200 ease-in-out lg:flex lg:flex-col lg:justify-between`}
      >
        <div className="flex flex-col h-full w-64 bg-[#121212] border-r overflow-y-auto">
          <nav className="flex-1">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li
                  key={item.name}
                  className={`text-white 
                    ${item.active ? "border-r-[1rem] border-[#6739B7]" : ""}`}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center p-3 w-full rounded`}
                    style={{
                      width: "218px",
                      height: "60px",
                      fontFamily: "Impact",
                      fontStyle: "normal",
                      fontSize: "20px",
                      lineHeight: "24px",
                      color: "#FFFFFF",
                      flex: "none",
                      order: 0,
                      alignSelf: "stretch",
                      flexGrow: 0,
                    }}
                    onClick={() => {
                      navItems.forEach((navItem) => {
                        navItem.active = navItem.name === item.name;
                      });
                    }}
                  >
                    <item.icon className="w-6 h-6 mr-4" />
                    {item.name}
                    <span
                      className={` ${
                        item.active ? "border-r-[1rem] border-[#6739B7]" : ""
                      }`}
                    ></span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
