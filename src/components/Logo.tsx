import { cn } from "@/lib/utils";

export const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center font-black text-secondary-foreground text-xs shadow-lg">
        PS
      </div>
      <span className="font-black text-xl tracking-tighter text-white">PREMIA<span className="text-secondary">SEMPRE</span></span>
    </div>
  );
};
