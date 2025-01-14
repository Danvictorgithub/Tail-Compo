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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";

export default function Header() {
  const { data: session, status } = useSession();
  return (
    <header className="h-20 border-b">
      <nav className="container mx-auto flex justify-between items-center h-full">
        <div className="flex gap-2 items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/tailchro.png" width={50} height={50} alt="" />
            <p className="font-bold text-lg text-cyan-600">TailChro</p>
          </Link>
          <div className="flex gap-2">
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
              <button className="duration-200 flex gap-2 items-center border p-2 rounded-xl group hover:bg-sky-500 hover:border-sky-500 hover:text-white hover:font-bold">
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
              <PopoverContent className="text-sm max-w-44 p-0">
                <div className="p-3">
                  <p className="font-medium">signed in as </p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <p className="italic truncate max-w-36">
                          @{session.user.username}
                        </p>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{session.user.username}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Separator className=" " />
                <div className="">
                  <Link href={`/profile/${session.user.username}`}>
                    <button
                      type="button"
                      className="flex gap-2 items-center hover:bg-gray-100 w-full p-2"
                    >
                      <Icon
                        icon="iconamoon:profile-circle-thin"
                        width="24"
                        height="24"
                      />
                      Profile
                    </button>
                  </Link>

                  <button
                    type="button"
                    className="flex gap-2 items-center hover:bg-gray-100 w-full p-2"
                  >
                    <Icon icon="mdi:tailwind" width="24" height="24" />
                    My Components
                  </button>
                  <button
                    type="button"
                    className="flex gap-2 items-center hover:bg-gray-100 w-full p-2"
                  >
                    <Icon icon="ri:settings-fill" width="24" height="24" />
                    Settings
                  </button>

                  <Separator />
                  <button
                    type="button"
                    className="flex gap-2 items-center hover:bg-gray-100 w-full p-2"
                    onClick={() => signOut()}
                  >
                    <Icon
                      icon="solar:logout-3-bold-duotone"
                      width="24"
                      height="24"
                    />
                    sign out
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </nav>
    </header>
  );
}
