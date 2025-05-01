import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { backendUrl } from "@/utils/backend/backendUrl";
import axios from "axios";
import { useParams } from "next/navigation";

export async function POST(request: Request) {
  try {
    // Get request body - pass the entire userData object
    const { authId, userData } = await request.json();

    // Call backend API to update user info
    const response = await axios.patch(
      `${backendUrl}/basic-info/${authId}`,
      userData
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error updating user info:", error);

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
