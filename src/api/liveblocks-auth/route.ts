import { getOneTask } from '@/lib/action';
import { auth, currentUser } from '@clerk/nextjs/server';
import { Liveblocks } from '@liveblocks/node';

export async function POST(req: Request) {
  const { sessionClaims } = await auth();
  if (!sessionClaims) {
    return new Response('Not authorized', { status: 401 });
  }

  const user = await currentUser();
  if (!user) {
    return new Response('Not authorized', { status: 401 });
  }

  const { room } = await req.json(); // room is roomId
  const task = await getOneTask(user.id, room); // fetches room doc

  if (!task) {
    return new Response('Not authorized', { status: 401 });
  }

  // ✅ Ownership check based on userId field in room doc
  if (task.userId !== user.emailAddresses[0].emailAddress) {
    return new Response('Not authorized', { status: 401 });
  }

  const liveblocks = new Liveblocks({
    secret: process.env.LIVEBLOCKS_SECRET_KEY as string,
  });

  const session = liveblocks.prepareSession(user.id, {
    userInfo: {
      name: user.fullName || 'Anonymous',
      email: user.emailAddresses[0].emailAddress,
      avatar: user.imageUrl || '',
    },
  });

  session.allow(room, session.FULL_ACCESS);
  const { body, status } = await session.authorize();

  return new Response(body, { status });
}
