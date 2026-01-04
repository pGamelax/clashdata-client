import { cookies } from "next/headers";

type ServerFetchOptions = Omit<RequestInit, "headers"> & {
  headers?: HeadersInit;
};

export async function serverFetch(
  url: string,
  options: ServerFetchOptions = {},
) {
  const cookieStore = cookies();

  const cookieHeader = (await cookieStore)
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  return fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Cookie: cookieHeader,
    },
    cache: "no-store",
  });
}
