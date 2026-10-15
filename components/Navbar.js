"use client"

import React from 'react'
import { FiSearch } from "react-icons/fi";
import { TiHome } from "react-icons/ti";
import { HiOutlineDownload } from "react-icons/hi";
import { usePathname, useRouter } from 'next/navigation';
import { signIn, signOut, useSession } from "next-auth/react";

import {
  BadgeCheckIcon,
  BellIcon,
  CreditCardIcon,
  LogOutIcon,
} from "lucide-react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Navbar = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const route = usePathname()
  const hiddenRoutes = ["/login", "/signup"];
  if (hiddenRoutes.includes(route)) return;

  return (
    <nav className="w-full bg-black flex items-center justify-between gap-4 px-4 py-3">
      <div className="flex items-center shrink-0">
        <img className='w-10' src="./spotify.png" alt="" />
      </div>

      <div className="flex items-center gap-2 flex-1 max-w-150">
        <button
          aria-label="Home"
          className="shrink-0 bg-[#1f1f1f] hover:bg-[#2a2a2a] transition-colors p-3 rounded-full"
        >
          <TiHome className="text-white w-5 h-5" />
        </button>

        <div className="relative flex-1">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white w-5 h-5" />
          <input
            type="text"
            placeholder="What do you want to play?"
            className="w-full bg-[#1f1f1f] hover:bg-[#2a2a2a] focus:outline-2 focus:outline-white transition-colors text-white text-sm rounded-full py-3 pl-12 pr-4 placeholder:text-[#b8b8b8]"
          />
        </div>
      </div>

      <div className="hidden md:flex items-center gap-6 shrink-0">
        <button className="text-[#b8b8b8] hover:text-white text-sm font-bold transition-colors">
          Premium
        </button>
        <button className="text-[#b8b8b8] hover:text-white text-sm font-bold transition-colors">
          Support
        </button>
        <button className="text-[#b8b8b8] hover:text-white text-sm font-bold transition-colors">
          Download
        </button>
      </div>

      <div className="hidden md:block w-px h-6 bg-[#292929] shrink-0" />

      <div className="flex items-center gap-6 shrink-0">
        <button className="hidden lg:flex items-center gap-2 text-[#b8b8b8] hover:text-white text-sm font-bold transition-colors">
          <HiOutlineDownload className="w-4 h-4" />
          Install App
        </button>

        {session ?
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="rounded-full"><Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar></Button>} />
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <BadgeCheckIcon />
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCardIcon />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <BellIcon />
                  Notifications
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <div onClick={() => signOut()}>
                <DropdownMenuItem>
                  <LogOutIcon />
                  Sign Out
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          :
          <>
            <button className="text-[#b8b8b8] hover:text-white text-sm font-bold transition-colors">
              Sign up
            </button>

            <button onClick={() => { router.push('/login') }} className="bg-white hover:bg-[#f0f0f0] hover:scale-105 text-black text-sm font-bold rounded-full px-8 py-3 transition-all">
              Log in
            </button>
          </>
        }


      </div>
    </nav>
  )
}

export default Navbar
