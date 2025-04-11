import React from 'react';
import { auth } from "@clerk/nextjs/server";
import { redirect } from 'next/navigation';
import RoomProvider from '@/components/RoomProvider';

type DocLayoutProps = {
  children: React.ReactNode;
  params: {
    id: string;
  };
};

export default async function DocLayout({ children, params }: DocLayoutProps) {
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in'); 
  }

  return (
    <RoomProvider roomId={params.id}>
      {children}
    </RoomProvider>
  );
}
