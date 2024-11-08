"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import Link from "next/link"
import {useAuth} from "@/app/Context/AuthContext";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import Image from "next/image";

export default function NavBar() {
  const {isAuthenticated, logout, user} = useAuth();

  return (
    <>
      <div className="flex items-center justify-between px-4 py-4 bg-[#022660]">

        <div className="flex items-center">
          <Image src="/logo-home.png" alt="logo" width={80} height={60} />
        </div>

        {/* Navigation Menu */}
        <NavigationMenu>
          <NavigationMenuList className="flex items-center">
            {/* User Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>{user.username}</AvatarFallback>
                </Avatar>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="flex flex-col p-4">
                  {isAuthenticated ? (
                    <span>Hi, {user.username}</span>
                  ): null}
                  <hr/>
                  {isAuthenticated ? (
                    <>
                      <NavigationMenuLink asChild>
                        <Link href="/change-password">
                          <>Change Password</>
                        </Link>
                      </NavigationMenuLink>
                      <hr/>
                      <NavigationMenuLink asChild>
                        <button onClick={logout} className="mt-2">
                          Logout
                        </button>
                      </NavigationMenuLink>
                    </>
                  ) : (
                    <NavigationMenuLink asChild>
                      <Link href="/login">
                        <>Login</>
                      </Link>
                    </NavigationMenuLink>
                  )}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <hr/>
    </>
  );
}
