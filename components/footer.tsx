"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-white dark:bg-zinc-900/80 backdrop-blur-md mt-auto">
      <div className="max-w-400 mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center gap-2 group cursor-pointer">
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
            </div>
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em]">
              Analytics de Elite para Clans
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2">
            <div className="text-[10px] font-medium text-muted-foreground space-y-1 text-center md:text-right">
              <p>© {new Date().getFullYear()} CLASHDATA — ANALYTICS TOOL</p>
              <div className="flex items-center justify-center md:justify-end gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="uppercase tracking-tighter font-bold text-slate-500 dark:text-zinc-400">
                  Sincronizado com Supercell API
                </span>
              </div>
              <div>
                <span className="uppercase tracking-tighter font-bold text-slate-500 dark:text-zinc-400">
                  Este conteúdo não é afiliado, endossado, patrocinado ou
                  especificamente aprovado pela Supercell, e a Supercell não se
                  responsabiliza por ele. Para mais informações, consulte
                  <p>
                    <Link
                      target="_blank"
                      className="text-primary"
                      href={"https://supercell.com/en/fan-content-policy/"}
                    >
                      politicas da Supercell
                    </Link>
                  </p>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
