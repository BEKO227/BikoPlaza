import { Skeleton } from "@/components/ui/skeleton"

export function HomeLoading() {
  return (
    <>
        {Array.from({ length: 6 }).map((el , i) => (
                <div key={i}    className="flex flex-col space-y-3">
                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
        ))}
    </>
  )
}
