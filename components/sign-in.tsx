"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import z from "zod";
import { authClient } from "../lib/auth-client";
import Link from "next/link";
import { Lock, Mail, Loader2, XCircle } from "lucide-react";

const signInSchema = z.object({
  email: z.email("E-mail inválido"),
  password: z.string().min(1, "Senha obrigatória"),
});

type SignInSchema = z.infer<typeof signInSchema>;

export function SignIn() {
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
  });

  async function handleSignIn({ email, password }: SignInSchema) {
    setServerError(null);

    await authClient.signIn.email(
      {
        email,
        password,
        callbackURL: "/dashboard/clans",
      },
      {
        onError(context) {
          if (
            context.error.status === 401 ||
            context.error.message.includes("invalid")
          ) {
            setServerError("Credenciais inválidas. Verifique seus dados.");
          } else {
            setServerError("Erro de conexão com o servidor.");
          }
        },
      },
    );
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-svh bg-slate-50/50 dark:bg-[#09090b]">
      <div className="w-full max-w-100 px-6 flex flex-col items-center gap-8">
        {/* LOGO */}
        <Link href={"/"} className="flex flex-col items-center gap-2">
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

        {/* CARD */}
        <div className="w-full p-8 bg-white dark:bg-zinc-900/50 backdrop-blur-xl rounded-[2rem] border border-slate-200 dark:border-zinc-800 shadow-2xl shadow-zinc-200/40 dark:shadow-none">
          <div className="mb-8">
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Entrar
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Acesse sua conta para continuar.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(handleSignIn)}
            className="flex flex-col gap-5"
          >
            <div className="space-y-4">
              {/* Email */}
              <div className="space-y-1.5">
                <div className="relative">
                  <Mail
                    className={`absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors ${errors.email ? "text-red-500" : "text-muted-foreground"}`}
                  />
                  <Input
                    {...register("email")}
                    placeholder="E-mail"
                    className={`pl-11 h-12 bg-slate-50/50 dark:bg-zinc-800/40 border-none ring-1 transition-all rounded-xl ${errors.email ? "ring-red-500/50 bg-red-50/30" : "ring-slate-200 dark:ring-zinc-700 focus-visible:ring-2 focus-visible:ring-primary"}`}
                  />
                </div>
                {errors.email && (
                  <p className="text-[11px] font-medium text-red-500 ml-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="relative">
                  <Lock
                    className={`absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors ${errors.password ? "text-red-500" : "text-muted-foreground"}`}
                  />
                  <Input
                    {...register("password")}
                    type="password"
                    placeholder="Senha"
                    className={`pl-11 h-12 bg-slate-50/50 dark:bg-zinc-800/40 border-none ring-1 transition-all rounded-xl ${errors.password ? "ring-red-500/50 bg-red-50/30" : "ring-slate-200 dark:ring-zinc-700 focus-visible:ring-2 focus-visible:ring-primary"}`}
                  />
                </div>
                {errors.password && (
                  <p className="text-[11px] font-medium text-red-500 ml-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            {/* ERROR MESSAGE (Minimalista) */}
            {serverError && (
              <div className="flex items-center gap-2 text-red-500 bg-red-500/5 border border-red-500/10 p-3 rounded-xl">
                <XCircle size={16} />
                <span className="text-xs font-semibold">{serverError}</span>
              </div>
            )}

            <button
              type="button"
              className="text-xs font-bold text-primary hover:opacity-80 transition-opacity text-right w-fit ml-auto"
            >
              Esqueceu sua senha?
            </button>

            <div className="space-y-5 mt-2">
              <Button
                disabled={isSubmitting}
                className="w-full h-12 rounded-xl bg-zinc-900 dark:bg-primary text-white dark:text-primary-foreground hover:opacity-90 font-bold transition-all active:scale-95"
              >
                {isSubmitting ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  "Entrar"
                )}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Não tem conta?{" "}
                <Link
                  href="/sign-up"
                  className="font-bold text-zinc-900 dark:text-primary hover:underline underline-offset-4"
                >
                  Criar agora
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
