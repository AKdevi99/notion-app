"use client";
import React, { useTransition } from 'react'
import { Button } from './ui/button'
import { useRouter } from "next/navigation"; 

import { createNewDocument } from '@/actions/actions';



export default function NewDocumentButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleCreateNewDocument = () =>{
    startTransition(async () =>{
      //create a new document

      try {
        const {docId} = await createNewDocument();
        router.push(`/doc/${docId}`)
        
      } catch (error) {
        router.push("https://intimate-dolphin-11.accounts.dev/sign-in?redirect_url=http%3A%2F%2Flocalhost%3A3000%2F");
      }
    })

  };
  return (
    <Button onClick={handleCreateNewDocument} disabled={isPending}>
     {isPending? "Creating...":"New Document"}
    </Button>
  )
}
