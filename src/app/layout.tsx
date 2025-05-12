"use client";

import { AuthProvider } from "@/context/auth";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { UserProvider } from "@/context/user";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>
          <Toaster />
          <div className=" h-screen bg-gray-100 lg:flex-row">
            {/* {user && <Header />} */}
            <Header />
            <div className="flex flex-1">
              {/* {user && <Sidebar />} */}
              <Sidebar />
              <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-0">
                <UserProvider>{children}</UserProvider>
              </main>
            </div>
          </div>
        </body>
      </html>
    </AuthProvider>
  );
}
