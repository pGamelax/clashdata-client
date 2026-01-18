"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./toggle-mode";

import {
  LogOut,
  Menu,
  BarChart3,
  Users,
  LayoutDashboard,
  Shield,
} from "lucide-react";

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

const NAV_OPTIONS = [
  {
    name: "Guerras",
    url: "/guerras",
    dropdown: true,
    icon: LayoutDashboard,
  },
  //{ name: "Push", url: "/push", dropdown: true, icon: BarChart3 },
  /* { name: "Players", url: "/players", dropdown: false, icon: Users }, */
  { name: "Meus Clans", url: "/clans", dropdown: false, icon: Shield },
];

export function Header({ user, userClans }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/sign-in");
    router.refresh();
  };

  const initials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
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
            <span className="text-xl font-black tracking-tighter uppercase">
              Clash<span className="text-primary font-extrabold">Data</span>
            </span>
          </Link>

          <nav className="hidden md:flex">
            <NavigationMenu>
              <NavigationMenuList>
                {user &&
                  NAV_OPTIONS.map((item) => (
                    <NavigationMenuItem key={item.name}>
                      {item.dropdown ? (
                        <>
                          <NavigationMenuTrigger className="bg-transparent font-medium">
                            {item.name}
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <ul className="grid w-100 gap-3 p-4 md:w-125 md:grid-cols-2 lg:w-150">
                              {userClans.map((clan) => (
                                <ListItem
                                  key={clan.tag}
                                  title={clan.name}
                                  href={`${item.url}/${clan.tag.replace(
                                    "#",
                                    "",
                                  )}`}
                                >
                                  Visualizar dados de {item.name.toLowerCase()}{" "}
                                  para este clã.
                                </ListItem>
                              ))}
                            </ul>
                          </NavigationMenuContent>
                        </>
                      ) : (
                        <Link
                          href={item.url}
                          className={cn(
                            navigationMenuTriggerStyle(),
                            "bg-transparent font-medium",
                          )}
                        >
                          {item.name}
                        </Link>
                      )}
                    </NavigationMenuItem>
                  ))}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <ModeToggle />

          {user ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-9 w-9 rounded-full ring-offset-background transition-all hover:ring-2 hover:ring-primary/20"
                  >
                    <Avatar className="h-9 w-9 border">
                      <AvatarImage
                        src={user.image || ""}
                        alt={user.name || ""}
                      />
                      <AvatarFallback className="font-bold text-xs">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 mt-2"
                  align="end"
                  forceMount
                >
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-bold leading-none">
                        {user.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  {/*     <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/profile">Meu Perfil</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/settings">Configurações</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator /> */}
                  <DropdownMenuItem
                    className="text-destructive focus:bg-destructive focus:text-destructive-foreground cursor-pointer"
                    onClick={handleSignOut}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden ml-2 border"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-75 sm:w-100">
                  <SheetHeader>
                    <SheetTitle className="text-left font-black tracking-tighter uppercase flex flex-row gap-2 items-center">
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
                      <span>
                        Clash<span className="text-primary">Data</span>
                      </span>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-4 p-4">
                    <Accordion type="single" collapsible className="w-full">
                      {NAV_OPTIONS.map((option) =>
                        option.dropdown ? (
                          <AccordionItem
                            value={option.name}
                            key={option.name}
                            className="border-none"
                          >
                            <AccordionTrigger className="py-2 text-base">
                              <div className="flex items-center gap-2">
                                <option.icon className="w-5 h-5 text-muted-foreground" />
                                {option.name}
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-1 pl-7 border-l-2 ml-2">
                              {userClans.map((clan) => (
                                <Link
                                  key={clan.tag}
                                  href={`${option.url}/${clan.tag.replace(
                                    "#",
                                    "",
                                  )}`}
                                  onClick={() => setIsMobileOpen(false)}
                                  className="py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                                >
                                  {clan.name}
                                </Link>
                              ))}
                            </AccordionContent>
                          </AccordionItem>
                        ) : (
                          <Link
                            key={option.name}
                            href={option.url}
                            onClick={() => setIsMobileOpen(false)}
                            className="flex items-center gap-2 py-3 text-base"
                          >
                            <option.icon className="w-5 h-5 text-muted-foreground" />
                            {option.name}
                          </Link>
                        ),
                      )}
                    </Accordion>
                  </div>
                </SheetContent>
              </Sheet>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild size="sm">
                <Link href="/sign-in">Entrar</Link>
              </Button>
              <Button size="sm" asChild className="rounded-full px-5">
                <Link href="/sign-up">Começar</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-bold leading-none text-primary">
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
