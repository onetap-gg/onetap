import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { backendUrl } from "@/utils/backend/backendUrl";
import axios from "axios";

export async function POST(request: NextRequest) {
  try {
    const req = await request.json()
    // 🔐 Extract the authenticated user using Supabase session
    const supabase = await createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (!user || error) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Make request to backend API
    const response = await axios.post(
      `${backendUrl}/inventory/user-inventory`,
      {
        userId: req.userId,
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching inventory:", error);

    if (axios.isAxiosError(error)) {
      if (error.response?.status === 403) {
        return NextResponse.json(
          { error: "User account suspended or deleted" },
          { status: 403 }
        );
      } else if (error.response?.status === 500) {
        return NextResponse.json(
          { error: "Server error occurred" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
