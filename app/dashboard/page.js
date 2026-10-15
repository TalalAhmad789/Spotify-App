"use client"

import React from 'react'
import { signIn, signOut, useSession } from "next-auth/react";

const page = () => {
    const { data: session } = useSession()
    if (session) {
        return <>
            Signed in as {session.user.id} <br />
            <button onClick={() => signOut()}>Sign out</button>
        </>
    }
    return (
        <div>
            <span onClick={() => signOut()}>Logout</span>
        </div>
    )
}

export default page
