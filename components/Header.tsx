'use client';

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/nextjs"
import { Heading1 } from "lucide-react";
import Breadcrumbs from "./Breadcrumbs";

export default function Header() {
    const {user} = useUser();


    return(
        <div className="flex items-center justify-between p-5 bg-black text-white">
            {user && (
                <h1>
                    {user?.firstName}
                    {`'s`} Space
                </h1>
            )}

            <Breadcrumbs />

            <div>
                <SignedOut>
                    <SignInButton/>
                </SignedOut>

                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </div>
    )
}