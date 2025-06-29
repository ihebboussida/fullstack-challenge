import { Loader } from "lucide-react";

export function ComponentWithOverlayLoader({
  isLoading,
  children,
}: {
  isLoading: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <div className={isLoading ? "opacity-50 pointer-events-none" : ""}>
        {children}
      </div>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-50">
          <Loader className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}
    </div>
  );
}
