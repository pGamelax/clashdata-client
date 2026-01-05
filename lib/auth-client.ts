import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "https://api.clashdata.pro",
  fetchOptions: {
    credentials: "include",
  },
});

export const { signIn, signOut, signUp, useSession } = authClient;
