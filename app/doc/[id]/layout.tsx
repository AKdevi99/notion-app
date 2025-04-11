import React from 'react';
import { auth } from "@clerk/nextjs/server";
import { redirect } from 'next/navigation';

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
    <div>
      {children}
    </div>
  );
}
