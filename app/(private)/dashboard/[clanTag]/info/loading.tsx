import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#09090b] p-4 lg:p-8">
      <div className="max-w-400 mx-auto space-y-8">
        <div className="flex items-center gap-4 px-2 py-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50"
            >
              <Skeleton className="h-10 w-10 rounded-xl mb-4" />
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-8 w-16" />
            </div>
          ))}
        </div>

        <div className=" gap-8">
          <div className="lg:col-span-8 space-y-4">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-100 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
