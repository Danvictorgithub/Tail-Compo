import Image from "next/image";
import React from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function Header() {
  const { data: session, status } = useSession();
  return (
    <header className="h-20 border-b">
      <nav className="container mx-auto flex justify-between items-center h-full">
        <div className="flex gap-4 items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/tailchro.png" width={50} height={50} alt="" />
            <p className="font-bold text-lg text-cyan-600">TailChro</p>
          </Link>
          <div className="flex gap-4">
            <p>Categories</p>
            <div className="flex gap-1 items-center">
              <p>Chro AI</p>
              <Icon icon="mingcute:ai-fill" className="text-cyan-400" />
            </div>
          </div>
        </div>
        <div>
          {status !== "authenticated" ? (
            <Link href="/auth/signin">
              <button className="flex gap-3 items-center">
                <Icon
                  icon="solar:login-3-bold-duotone"
                  className="text-3xl"
                ></Icon>
                <p>sign in</p>
              </button>
            </Link>
          ) : (
            <Popover>
              <PopoverTrigger>
                <Avatar>
                  <AvatarImage src={session.user.image} />
                  <AvatarFallback>
                    <Image src="/tailchro.png" width={50} height={50} alt="" />
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent>
                <p className="text-sm">{session.user.email}</p>
                <button type="button" onClick={() => signOut()}>
                  sign out
                </button>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </nav>
    </header>
  );
}
