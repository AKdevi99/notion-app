'use client';
import React from 'react'
import {
    LiveblocksProvider,
    RoomProvider,
  } from "@liveblocks/react/suspense";



function LiveBlocksProvider({children}:{
    children:React.ReactNode

}) {

    if(!process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY ){
        throw new Error("NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY is not set");
    }
  return (
    <LiveblocksProvider
    authEndpoint="/api/auth-endpoints"
    // publicApiKey={process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY}
    throttle={16}
    >
      {children}
    </LiveblocksProvider>
  )
}

export default LiveBlocksProvider
