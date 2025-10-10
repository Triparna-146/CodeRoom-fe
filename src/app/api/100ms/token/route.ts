import { NextResponse } from "next/server";

export async function POST() {
  try {
    const { HMS_ROOM_ID, HMS_MANAGEMENT_TOKEN } = process.env;

    if (!HMS_ROOM_ID || !HMS_MANAGEMENT_TOKEN) {
      throw new Error("Missing 100ms environment variables");
    }

    const response = await fetch("https://api.100ms.live/v2/rooms/" + HMS_ROOM_ID + "/token", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HMS_MANAGEMENT_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: "user-" + Date.now(),
        role: "host", // or "guest" depending on the user
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`100ms API error: ${err}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error generating 100ms token:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
