import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    // Get the UV Index URL from environment variables
    const uvIndexUrl = process.env.UV_INDEX_URL;

    if (!uvIndexUrl) {
      throw new Error("UV_INDEX_URL is not defined in environment variables.");
    }

    const url = `${uvIndexUrl}?latitude=${lat}&longitude=${lon}&daily=uv_index_max,uv_index_clear_sky_max&timezone=auto&forecast_days=1`;

    const res = await fetch(url, {
      next: { revalidate: 900 },
    });

    if (!res.ok) {
      throw new Error("Network response was not ok.");
    }

    const uvData = await res.json();

    return NextResponse.json(uvData);
  } catch (error) {
    console.error("Error Getting UV Data", error);

    return new Response("Error getting UV Data", { status: 500 });
  }
}
