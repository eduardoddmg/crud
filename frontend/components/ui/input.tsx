import * as React from "react";
import { cn } from "@/lib/utils";
import { Loading } from "../loading";

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & { loading?: boolean } // Adiciona o prop `loading`
>(({ className, type, loading, ...props }, ref) => {
  return (
    <div className="relative flex items-center w-full">
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pr-10", // Adiciona padding para o spinner
          className
        )}
        ref={ref}
        {...props}
      />
      {loading && (
        <div className="absolute right-3 w-5">
          <Loading size={4} />
        </div>
      )}
    </div>
  );
});
Input.displayName = "Input";

export { Input };
