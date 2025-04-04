import React from 'react'
import NewDocumentButton from './NewDocumentButton'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { MenuIcon } from 'lucide-react'
  
  

export default function Sidebar() {
    const menuOption = (
        <>
            <NewDocumentButton/>

            {/* My Document */}\
            {/* list */}


            {/* Shared with ME */}
            {/* List .... */}
        </>
    )

    
  return (
    <div className='p-2 md:p-5 bg-gray-200 relative'>
        <div className='md:hidden'>
        <Sheet>
        <SheetTrigger>
            <MenuIcon className="p-2 hover:opacity-30 rounded-lg" size={40}/>
        </SheetTrigger>
        <SheetContent side='left'>
            <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
            <div>
                {/* options */}
                {menuOption}
            </div>
            <SheetDescription>
                
            </SheetDescription>
            </SheetHeader>
        </SheetContent>
        </Sheet>
        </div>



        <div className='hidden md:inline'>{menuOption}</div>
      
    </div>
  )
}
