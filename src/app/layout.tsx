"use client";
import { AuthProvider } from "@/context/auth";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { UserProvider } from "@/context/user";
import { useUser } from "@/context/user";

const inter = Inter({ subsets: ["latin"] });

// Separate component for the layout content
function LayoutContent({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useUser();

  return (
    <div className="h-screen bg-gray-100">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main
          className={`flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-0 ${
            isLoggedIn ? "lg:ml-[218px] mt-[12vh]" : ""
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

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
          <UserProvider>
            <LayoutContent>{children}</LayoutContent>
          </UserProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
