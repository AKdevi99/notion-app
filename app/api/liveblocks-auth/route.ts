import { auth, currentUser } from '@clerk/nextjs/server';
import { Liveblocks } from '@liveblocks/node';
import { db } from '@/firebase'; 
import { doc, getDoc } from 'firebase/firestore';

export async function POST(req: Request) {
  const { sessionClaims } = await auth();
  if (!sessionClaims) return new Response('Not authorized', { status: 401 });

  const user = await currentUser();
  if (!user) return new Response('Not authorized', { status: 401 });

  const { room } = await req.json(); // room = roomId
  const userEmail = user.emailAddresses[0].emailAddress;

  const roomRef = doc(db, 'users', userEmail, 'rooms', room);
  const roomSnap = await getDoc(roomRef);

  if (!roomSnap.exists()) {
    return new Response('Room not found or unauthorized', { status: 401 });
  }

  const roomData = roomSnap.data();
  if (roomData?.userId !== userEmail) {
    return new Response('Unauthorized user', { status: 401 });
  }

  const liveblocks = new Liveblocks({
    secret: process.env.LIVEBLOCKS_PRIVATE_KEY!,
  });

  const session = liveblocks.prepareSession(user.id, {
    userInfo: {
      name: user.fullName || 'Anonymous',
      email: userEmail,
      avatar: user.imageUrl || '',
    },
  });

  session.allow(room, session.FULL_ACCESS);
  const { body, status } = await session.authorize();

  return new Response(body, { status });
}
