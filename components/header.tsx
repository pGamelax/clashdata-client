"use client";

import { useState } from "react";
import { ModeToggle } from "./toggle-mode";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { authClient } from "@/lib/auth-client";
import { LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { uuid, uuidv7 } from "better-auth";

interface HeaderProps {
  user?: {
    name?: string | null;
    image?: string | null;
    email?: string | null;
  };
  userClans: {
    name: string;
    tag: string;
  }[];
}

const navClansOptions: {
  name: string;
  url: string;
  dropdown: boolean;
}[] = [
  { name: "DASHBOARD", url: "/dashboard", dropdown: true },
  // { name: "PUSH", url: "/push", dropdown: true },
  // { name: "PLAYERS", url: "/players", dropdown: false },
  { name: "MEUS CLANS", url: "/clans", dropdown: false },
];

export function Header({ user, userClans }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isClanMenuOpen, setIsClanMenuOpen] = useState("");
  const [activeDesktopMenu, setActiveDesktopMenu] = useState<string | null>(
    null,
  );

  const initials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/sign-in");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group transition-opacity hover:opacity-90"
        >
          <div className="text-primary transition-transform group-hover:scale-110 duration-200">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 10V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M8 17V13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M12 17V11"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M16 17V15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M4 10C4 10 2 10 2 7C2 4 5 4 5 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M20 10C20 10 22 10 22 7C22 4 19 4 19 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <h1 className="text-lg font-black tracking-tighter sm:text-xl uppercase">
            Clash<span className="text-primary">Data</span>
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          {user && (
            <div className="flex flex-row items-center gap-2">
              {navClansOptions.map((option, index) => {
                if (option.dropdown) {
                  return (
                    <button
                      key={index}
                      onClick={() =>
                        setActiveDesktopMenu(
                          activeDesktopMenu === option.name
                            ? null
                            : option.name,
                        )
                      }
                      className={cn(
                        "font-semibold text-xs p-2 rounded-xl outline-0 hover:cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors",
                        activeDesktopMenu === option.name
                          ? "bg-primary text-primary-foreground"
                          : "",
                      )}
                    >
                      {option.name}
                    </button>
                  );
                }
                return (
                  <Link
                    key={index}
                    href={option.url}
                    className="font-semibold text-xs p-2 rounded-xl hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {option.name}
                  </Link>
                );
              })}
            </div>
          )}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <ModeToggle />

          {user ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:block h-6 w-px bg-border mx-1" />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 outline-none group">
                    <div className="hidden md:flex flex-col items-end text-right">
                      <span className="text-sm font-semibold leading-none group-hover:text-primary transition-colors">
                        {user.name?.split(" ")[0]}
                      </span>
                    </div>
                    <Avatar className="h-9 w-9 border-2 border-transparent group-hover:border-primary/20 transition-all">
                      <AvatarImage
                        src={user.image || ""}
                        alt={user.name || "User"}
                      />
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-56 mt-2 rounded-xl px-2"
                >
                  <DropdownMenuLabel className="font-normal py-3">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-bold">{user.name}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive py-2.5 cursor-pointer"
                    onClick={handleSignOut}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/sign-in" className="hidden sm:block">
                <Button variant="ghost" size="sm">
                  Entrar
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button size="sm">Começar</Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      <div
        className={cn(
          "hidden md:block border-t bg-background/50 transition-all duration-300 overflow-hidden",
          activeDesktopMenu
            ? "max-h-20 opacity-100"
            : "max-h-0 opacity-0 invisible",
        )}
      >
        <div className="container mx-auto py-3 px-4 flex items-center gap-4 justify-center">
          {userClans.map((clan, index) => (
            <Link
              key={index}
              href={`${navClansOptions.find((o) => o.name === activeDesktopMenu)?.url}/${clan.tag.replace("#", "")}`}
              onClick={() => setActiveDesktopMenu(null)}
              className={cn(
                "text-sm font-bold hover:text-primary transition-colors",
                pathname.includes(clan.tag.replace("#", ""))
                  ? "text-primary"
                  : "text-muted-foreground",
              )}
            >
              {clan.name}
            </Link>
          ))}
        </div>
      </div>
      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "md:hidden border-b bg-background transition-all duration-300 overflow-hidden",
          isMenuOpen
            ? "min-h-content opacity-100"
            : "max-h-0 opacity-0 invisible",
        )}
      >
        <div className="container mx-auto py-4 px-4 flex flex-col gap-2">
          {navClansOptions.length > 0 &&
            navClansOptions.map((options, index: number) => {
              if (options.dropdown) {
                return (
                  <div
                    key={index}
                    onClick={(e) => {
                      setIsClanMenuOpen(options.name);
                    }}
                  >
                    <div
                      className={`font-semibold text-xs p-2 rounded-xl outline-0 hover:cursor-pointer hover:bg-primary hover:text-primary-foreground text-start w-full text-start ${isClanMenuOpen === options.name ? "bg-primary text-primary-foreground" : ""}`}
                    >
                      {options.name}
                    </div>
                    <div>
                      {userClans.map((clan, index: number) => {
                        return (
                          <div
                            key={index}
                            className={`flex flex-col px-4 py-2 gap-1  ${
                              isClanMenuOpen === options.name
                                ? "min-h-content opacity-100 flex"
                                : "max-h-0 opacity-0  hidden"
                            }`}
                          >
                            <div
                              className={`font-bold text-xs text-muted-foreground ${pathname === `${options.url}/${clan.tag.replace("#", "")}` ? "text-primary" : ""}`}
                            >
                              <Link
                                href={`${options.url}/${clan.tag.replace("#", "")}`}
                                onClick={() => setIsMenuOpen(false)}
                              >
                                {clan.name}
                              </Link>
                            </div>
                            <div />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              } else if (!options.dropdown) {
                return (
                  <Link
                    key={crypto.randomUUID()}
                    href={options.url}
                    onClick={() => setIsMenuOpen(false)}
                    className={`font-semibold text-xs p-2 rounded-xl outline-0 hover:cursor-pointer hover:bg-primary hover:text-primary-foreground text-start ${pathname.startsWith(options.url) ? "text-primary" : ""}`}
                  >
                    {options.name}
                  </Link>
                );
              }
            })}
        </div>
      </div>
    </header>
  );
}
