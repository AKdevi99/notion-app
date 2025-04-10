'use client';
import React from 'react'
import Document from '@/components/Document';


export default function DocumentPage({params:{id}}:{
    params:{
        id:string;
    }
}) {

  return (
    <div className='flex flex-col p-4 bg-gray-100 flex-1 min-h-screen'>
     <Document id={id}/>
    </div>
  )
}





