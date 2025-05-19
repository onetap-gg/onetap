"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import signOut from "@/utils/supabase/logout";
import { useUser } from "@/context/user";

export function Header() {
  const router = useRouter();
  const { isLoggedIn, setIsLoggedIn } = useUser();

  const handleLogout = async () => {
    setIsLoggedIn(false);
    try {
      await signOut();
      sessionStorage.clear();
      localStorage.clear();
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  if (!isLoggedIn) {
    return null;
  }
  return (
    <header className="flex flex-1 fixed top-0 items-center justify-between px-4 py-4 border-b border-[#6739B7] bg-[#020710] w-full h-[12vh]">
      <div className="flex items-center gap-3 ml-4">
        <span
          className="text-2xl font-semibold inline-block font-[Ranchers]"
          style={{
            fontSize: "24px",
            background: "linear-gradient(90deg, #9B6CFF 0%, #DBBBFF 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
          }}
        >
          ONE TAP
        </span>
        <span>
          <img src="/onetap-logo.svg" width={"32px"} alt="" />
        </span>
      </div>
      <div className="flex items-center space-x-2 mr-4 md:space-x-4">
        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          style={{ color: "white", backgroundColor: "#1A1A1A" }}
        >
          Logout
        </Button>
      </div>
    </header>
  );
}
