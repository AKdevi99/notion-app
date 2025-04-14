import { adminDb } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return Response.redirect(new URL('/sign-in', req.url), 302);
  }

  const user = await currentUser(); // 👈 gets user info
  const { room } = await req.json();

  const session = liveblocks.prepareSession(user?.emailAddresses[0].emailAddress!, {
    userInfo: {
      name: user?.fullName || "Guest",
      email: user?.emailAddresses[0].emailAddress!,
      avatar: user?.imageUrl || "",
    },
  });

  const usersInRoom = await adminDb
    .collectionGroup("rooms")
    .where("userId", "==", user?.emailAddresses[0].emailAddress!)
    .get();

  const userInRoom = usersInRoom.docs.find((doc) => doc.id === room);

  if(userInRoom?.exists){
    session.allow(room,session.FULL_ACCESS);
    const {body,status} = await session.authorize();

    return new Response(body,{status});
  }else {
    return NextResponse.json(
        {
            message:"You are not in this room"
        },
        {status:403}
    );
  }
  
}
