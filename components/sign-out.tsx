"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export function SignOut() {
  const navigation = useRouter();
  return (
    <Button
      onClick={() =>
        authClient.signOut().then(() => navigation.push("/sign-in"))
      }
    >
      Sair
    </Button>
  );
}
