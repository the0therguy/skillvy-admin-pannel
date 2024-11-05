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

export default function NavBar() {
  const {isAuthenticated, logout} = useAuth();

  return (
    <>
      <div className="flex items-center justify-between px-4 py-4 bg-gray-100">
        {/* Logo */}
        <div className="flex items-center">
          <img src="/path/to/logo.png" alt="Logo" className="h-8 w-8 mr-2"/> {/* Replace with your logo path */}
          <span className="font-semibold text-xl">MyApp</span>
        </div>

        {/* Navigation Menu */}
        <NavigationMenu>
          <NavigationMenuList className="flex items-center">
            {/* User Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Account</NavigationMenuTrigger>
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
