import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { User, ShieldCheck } from "lucide-react";

export const Header = () => {
  return (
    <header className="py-4 px-6 bg-primary border-b border-white/10 sticky top-0 z-50 backdrop-blur-md bg-primary/90">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="hover:opacity-90 transition-opacity">
          <Logo />
        </Link>
        
        <div className="flex items-center gap-3">
          <Link 
            to="/account" 
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-primary bg-white rounded-full hover:bg-white/90 transition-colors shadow-sm"
          >
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Minha Conta</span>
          </Link>
          <Link 
            to="/admin" 
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-primary bg-secondary rounded-full hover:bg-secondary/90 transition-colors shadow-sm"
          >
            <ShieldCheck className="w-4 h-4" />
            <span className="hidden sm:inline">Painel Admin</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
