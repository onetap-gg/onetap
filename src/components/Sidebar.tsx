"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  { name: "Profile", href: "/", icon: GoHome },
  {
    name: "Subscription",
    href: "/subscription",
    icon: BookOpenIcon,
  },
  {
    name: "Marketplace",
    href: "/marketplace",
    icon: ShoppingBagIcon,
  },
  { name: "Inventory", href: "/inventory", icon: Package },
  { name: "Support", href: "/support", icon: Headset },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const activeStyle = "border-r-[1rem] border-[#6739B7]";

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
        <div className="flex flex-col h-full w-full bg-[#121212] border-r overflow-y-auto">
          <nav className="flex-1">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li
                    key={item.name}
                    className={`text-white ${isActive ? activeStyle : ""}`}
                  >
                    <Link
                      href={item.href}
                      className={`flex items-center p-3 w-full rounded hover:bg-[#1f1f1f] transition-colors`}
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
                    >
                      <item.icon className="w-6 h-6 mr-4" />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
