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
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { useAuth } from "@/app/Context/AuthContext";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import Image from "next/image";

export default function NavBar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <>
      <div className="flex items-center justify-between px-4 py-4 bg-[#022660]">

        {/* Logo */}
        <div className="flex items-center">
          <Link href='/'>
            <Image src="/logo-home.png" alt="logo" width={80} height={60}/>
          </Link>
        </div>

        {/* Centered Contact Us Link */}
        <div className="flex-1 flex justify-center">
          <div className="mr-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/contact-us" className="text-[#EA901A] hover:underline">
                      Contact Us
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/apply-now" className="text-[#EA901A] hover:underline">
                      Applicant
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

        </div>

        {/* User Dropdown */}
        <NavigationMenu>
          <NavigationMenuList className="flex items-center space-x-6">
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"/>
                  <AvatarFallback>{user?.username}</AvatarFallback>
                </Avatar>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="flex flex-col p-4">
                  {isAuthenticated ? (
                    <span>Hi, {user?.username}</span>
                  ) : null}
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
