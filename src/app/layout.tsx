"use client";

import { useAuth, AuthProvider } from "@/context/auth";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Inter } from "next/font/google";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!user && pathname !== "/login") {
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, pathname]);

  if (!user && pathname !== "/login") {
    return null;
  }

  return (
    <div className=" h-screen bg-gray-100 lg:flex-row">
      {user && <Header />}
      <div className="flex flex-1">
        {user && <Sidebar />}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-0">
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
          <ProtectedLayout>{children}</ProtectedLayout>
        </body>
      </html>
    </AuthProvider>
  );
}
