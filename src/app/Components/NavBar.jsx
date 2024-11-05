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
  const {isAuthenticated, logout} = useAuth();

  return (
    <>
      <div className="flex items-center justify-between px-4 py-4 bg-gray-100">
        {/* Logo */}
        <div className="flex items-center">
          {/*<img src="/path/to/logo.png" alt="Logo" className="h-8 w-8 mr-2"/>*/}
          <Image src="/next.svg" alt="logo" width={100} height={80} />
        </div>

        {/* Navigation Menu */}
        <NavigationMenu>
          <NavigationMenuList className="flex items-center">
            {/* User Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="flex flex-col p-4">
                  {isAuthenticated ? (
                    <>
                      <NavigationMenuLink asChild>
                        <Link href="/change-password">
                          <>Change Password</>
                        </Link>
                      </NavigationMenuLink>
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
