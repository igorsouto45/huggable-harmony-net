import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export const Hero = () => {
  return (
    <section className="relative bg-primary text-primary-foreground py-12 px-6 overflow-hidden">
      <div className="absolute top-4 right-6 z-20">
        <Link to="/admin" className="text-xs opacity-40 hover:opacity-100 transition-opacity flex items-center gap-1">
          🔐 Painel
        </Link>
      </div>
      <div className="container mx-auto relative z-10 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-in fade-in slide-in-from-top-4 duration-1000">
          PREMIA
        </h1>
        <h2 className="text-2xl md:text-4xl font-extrabold mb-2 tracking-tight">
          Ganhe produtos desejados pagando pouco
        </h2>
        <p className="text-lg md:text-xl opacity-90 mb-8 font-medium">
          Todo dia uma chance de ganhar
        </p>
        
        <div className="relative w-full max-w-md mx-auto aspect-square mb-8 rounded-2xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-sm border border-white/20">
          <img
            src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1000&auto=format&fit=crop"
            alt="iPhone 15 Pro"
            className="w-full h-full object-cover animate-pulse-slow"
          />
        </div>

        <Button 
          size="lg" 
          className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg font-bold px-8 py-6 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95"
          onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
        >
          👉 QUERO PARTICIPAR AGORA
        </Button>
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[100px]" />
      </div>
    </section>
  );
};
