"use client";
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

import {
  NavigationMenu,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

import { authClient } from "@/lib/auth-client";
import { User, LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

interface HeaderProps {
  user?: {
    name?: string | null;
    image?: string | null;
    email?: string | null;
  };
}

export function Header({ user }: HeaderProps) {
  const navigation = useRouter();
  const initials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="max-w-400 mx-auto flex h-16 items-center justify-between">
        <Link
          href={"/"}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="text-primary transition-transform group-hover:scale-110 duration-200">
            <svg
              width="32"
              height="32"
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
          <h1 className="text-xl font-black tracking-tighter sm:text-2xl">
            CLASH<span className="text-primary">DATA</span>
          </h1>
        </Link>

        <div>
          <NavigationMenu
            className={`tracking-tighter leading-relaxed ${
              !user ? "hidden" : ""
            }`}
          >
            <NavigationMenuLink asChild>
              <Link href="/dashboard/clans">CLANS</Link>
            </NavigationMenuLink>
          </NavigationMenu>
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />

          <div className="h-6 w-px bg-border mx-1" />

          {user ? (
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-3 outline-none hover:opacity-80 transition-opacity">
                    <p className="hidden md:block text-sm font-medium text-muted-foreground">
                      {user?.name || "Usuário"}
                    </p>
                    <Avatar className="h-9 w-9 border border-border">
                      <AvatarImage
                        src={user?.image || ""}
                        alt={user?.name || "User"}
                      />
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-56 mt-2 rounded-xl"
                >
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user?.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {/* <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Configurações</span>
              </DropdownMenuItem> */}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-rose-500 focus:text-rose-500 cursor-pointer"
                    onClick={() =>
                      authClient
                        .signOut()
                        .then(() => navigation.push("/sign-in"))
                    }
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex flex-row gap-2">
              <Link href={"/sign-up"}>
                <Button>Cadastrar</Button>
              </Link>
              <Link href={"/sign-in"}>
                <Button>Entrar</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
