import { cookies } from "next/headers";

type ServerFetchOptions = Omit<RequestInit, "headers"> & {
  headers?: HeadersInit;
};

export async function serverFetch(
  url: string,
  options: ServerFetchOptions = {},
) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  return fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Cookie: cookieHeader,
      "Content-Type": "application/json",
      // Adicione isso para ajudar o Better Auth a validar a origem no server-side
      "x-better-auth-origin": "https://clashdata.pro",
    },
    cache: "no-store",
  });
}
