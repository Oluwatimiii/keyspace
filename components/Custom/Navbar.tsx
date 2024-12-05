"use client";

import { useState, useEffect, useTransition } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Globe, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings, Heart, Home, Users, MessageSquare, Package, LogOut } from "lucide-react";
import { logout } from "@/app/(actions)/logout";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Find Space", href: "/find-space" },
  { name: "List Space", href: "/list-property" },
  { name: "About", href: "/about" },
];

const authNavItems = [
  { name: "Home", href: "/"},
  { name: "Find Space", href: "/find-space" },
  { name: "List Space", href: "/list-property" },
  { name: "Use An Agent", href: "/agent" },
];

const languages = [
  { code: "en", name: "ENG" },
  { code: "es", name: "ESP" },
  { code: "fr", name: "FRA" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);
  const [currentLang, setCurrentLang] = useState("en");
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <nav className="bg-space-blacks shadow-md font-urbanist fixed w-full top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-6">
            <div className="flex">
              <Link href="/" className="flex-shrink-0 flex items-center gap-1">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#CEFF47"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#CEFF47"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>
                </div>

                <span className="text-2xl font-bold text-space-fades">
                  Keyspace
                </span>
              </Link>
            </div>
            <div className="hidden md:ml-6 md:flex md:space-x-9">
              {user
                ? authNavItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`inline-flex items-center px-1 pt-1 border-b-2 text-[12px] lg:text-sm font-medium ${
                        pathname === item.href
                          ? "border-space-greens text-white"
                          : "border-transparent text-space-grays hover:border-gray-300 hover:text-space-fades"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))
                : navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`inline-flex items-center px-1 pt-1 border-b-2 text-[12px] lg:text-sm font-medium ${
                        pathname === item.href
                          ? "border-space-greens text-white"
                          : "border-transparent text-space-grays hover:border-gray-300 hover:text-space-fades"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
            </div>
          </div>
          <div className="hidden md:ml-6 md:flex md:items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size="sm"
                      className="flex items-center gap-2 bg-space-greens text-space-darkgreen hover:bg-space-fades transition-colors duration-150"
                    >
                      <Globe className="h-4 w-4" />
                      <span className="hidden md:inline-block">
                        {languages.find((l) => l.code === currentLang)?.name}
                      </span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {languages.map((lang) => (
                      <DropdownMenuItem
                        key={lang.code}
                        onClick={() => setCurrentLang(lang.code)}
                      >
                        {lang.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm" className="flex items-center gap-2 bg-space-greens hover:bg-space-fades transition-colors duration-150">
                      <User className="h-4 w-4" color="#0c3122" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-semibold leading-none text-space-darkgreen">{user?.user_metadata?.name || 'User Name'}</p>
                        <p className="text-xs leading-none font-urbanist text-space-blacks/40">{user?.email || 'user@example.com'}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator color="#0c3122" />
                    <DropdownMenuItem>
                      <Link href="/profile/settings" className="flex items-center w-full">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Account Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/profile/favorites" className="flex items-center w-full">
                        <Heart className="mr-2 h-4 w-4" />
                        <span>Favorite Homes</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/profile/listings" className="flex items-center w-full">
                        <Home className="mr-2 h-4 w-4" />
                        <span>My Listings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/profile/clients" className="flex items-center w-full">
                        <Users className="mr-2 h-4 w-4" />
                        <span>Clients</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/profile/messages" className="flex items-center w-full">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        <span>Messages</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/profile/orders" className="flex items-center w-full">
                        <Package className="mr-2 h-4 w-4" />
                        <span>Orders</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600 focus:text-red-600">
                      <Button onClick={() => startTransition(() => logout())} className="flex items-center w-full bg-space-darkgreen">
                        <LogOut className="mr-1 h-4 w-4" color="#ceff47"  />
                        <span className="text-space-greens">Sign Out</span>
                      </Button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="space-x-3 flex items-center">
                <Button asChild className="bg-transparent text-white hover:text-space-greens rounded-full">
                  <Link href="/contact">Contact Us</Link>
                </Button>
                <Button asChild className="bg-space-greens text-space-blacks hover:text-space-greens rounded-full">
                  <Link href="/login">Sign In</Link>
                </Button>
              </div>
            )}
          </div>
          <div className="-mr-2 flex items-center md:hidden">
            <Button
              variant="ghost"
              className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-[0.3px] focus:ring-inset focus:ring-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-8 w-8" color="#CEFF47" aria-hidden="true" />
              ) : (
                <Menu className="block h-8 w-8" size={34} color="#CEFF47" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-200 z-40 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      <div
        className={`fixed top-16 left-0 right-0 bottom-0 bg-space-blacks border-t-[1px] border-space-grays transition-transform duration-300 ease-in-out transform md:hidden z-50 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full overflow-y-auto scrollbar-hide pb-safe">
          <div className="pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 mx-2 py-2 border-l-4 text-base font-medium ${
                  pathname === item.href
                    ? "bg-primary-foreground border-l-space-greens text-white bg-black border-[1px] border-space-grays"
                    : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                {item.name}
              </Link>
            ))}
            {user &&
              authNavItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 mx-2 py-2 border-l-4 text-base font-medium ${
                    pathname === item.href
                      ? "bg-primary-foreground border-l-space-greens text-white bg-black border-[1px] border-space-grays"
                      : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {user ? (
              <>
                <div className="px-4 py-2">
                  <div className="px-3 py-2 rounded-md bg-gray-900/5">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <User className="h-8 w-8" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {user?.user_metadata?.name || 'User Name'}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user?.email || 'user@example.com'}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1">
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2"
                      asChild
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Link href="/profile/settings">
                        <Settings className="h-4 w-4" />
                        <span>Account Settings</span>
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2"
                      asChild
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Link href="/profile/favorites">
                        <Heart className="h-4 w-4" />
                        <span>Favorite Homes</span>
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2"
                      asChild
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Link href="/profile/listings">
                        <Home className="h-4 w-4" />
                        <span>My Listings</span>
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2"
                      asChild
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Link href="/profile/clients">
                        <Users className="h-4 w-4" />
                        <span>Clients</span>
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2"
                      asChild
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Link href="/profile/messages">
                        <MessageSquare className="h-4 w-4" />
                        <span>Messages</span>
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2"
                      asChild
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Link href="/profile/orders">
                        <Package className="h-4 w-4" />
                        <span>Orders</span>
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2 text-red-600 hover:text-red-700"
                      asChild
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Link href="/logout">
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </Link>
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 mx-2 py-2 border-l-4 text-base font-medium ${
                    pathname === "login"
                      ? "bg-primary-foreground border-l-space-greens text-white bg-black border-[1px] border-space-grays"
                      : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  Contact Us
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 mx-2 py-2 border-l-4 text-base font-medium ${
                    pathname === "signup"
                      ? "bg-primary-foreground border-l-space-greens text-white bg-black border-[1px] border-space-grays"
                      : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-white"
                  }`}
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
