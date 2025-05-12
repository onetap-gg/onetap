import { createClient } from "@/utils/supabase/server";
import axios from "axios";
import { NextResponse } from "next/server";
import { backendUrl } from "@/utils/backend/backendUrl";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (!user || authError) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { itemId, points, userId } = body;

    if (!itemId || !points) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Make request to backend API
    const response = await axios.post(
      `${backendUrl}/marketplace/redeem-coupons`,
      {
        itemId,
        userId: userId,
        points: Number(points),
      }
    );

    return NextResponse.json({
      success: true,
      message: "Coupon redeemed successfully",
      data: response.data,
    });
  } catch (error) {
    console.error("Error redeeming coupon:", error);

    if (axios.isAxiosError(error)) {
      if (error.response?.status === 403) {
        return NextResponse.json(
          { error: "Insufficient balance or coupon not available" },
          { status: 403 }
        );
      } else if (error.response?.status === 404) {
        return NextResponse.json(
          { error: "Coupon not found" },
          { status: 404 }
        );
      }
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to redeem coupon",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
