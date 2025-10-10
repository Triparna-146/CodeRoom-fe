import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  const { userId, role, roomId } = await req.json();

  const res = await axios.post("https://api.100ms.live/v2/room-codes/active", {
    user_id: userId,
    role,
    room_id: roomId,
  }, {
    headers: {
      Authorization: `Bearer ${process.env.HMS_MANAGEMENT_TOKEN}`,
    },
  });

  return NextResponse.json(res.data);
}
