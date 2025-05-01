import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import axios from "axios";

export async function POST(request: Request) {
  try {
    // Extract authenticated user
    const supabase = await createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (!user || error) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get request body
    const body = await request.json();
    const { password, confirmPassword } = body;

    // Basic validation
    if (!password || !confirmPassword) {
      return NextResponse.json(
        { error: "Password fields are required" },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Passwords do not match" },
        { status: 400 }
      );
    }

    // Update user password through Supabase auth
    const { error: updateError } = await supabase.auth.updateUser({
      password: password,
    });

    if (updateError) {
      console.error("Error updating password:", updateError);
      return NextResponse.json({ error: updateError.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating password:", error);

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
