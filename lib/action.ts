import { db } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';

export async function getOneTask(userId: string, roomId: string) {
  const roomRef = doc(db, 'users', userId, 'rooms', roomId);
  const roomSnap = await getDoc(roomRef);

  if (roomSnap.exists()) {
    return roomSnap.data();
  } else {
    return null;
  }
}
