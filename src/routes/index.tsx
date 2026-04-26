import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Hero } from "@/components/landing/Hero";
import { PackageSelector } from "@/components/landing/PackageSelector";
import { ProductDetails } from "@/components/landing/ProductDetails";
import { Winners } from "@/components/landing/Winners";
import { Urgency } from "@/components/landing/Urgency";
import { CheckoutForm } from "@/components/landing/CheckoutForm";
import { WhatsAppButton } from "@/components/landing/WhatsAppButton";
import { Logo } from "@/components/Logo";

import { type RafflePackage } from "@/lib/types";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [selectedPackage, setSelectedPackage] = useState<RafflePackage | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-secondary selection:text-secondary-foreground">
      {/* WhatsApp Floating Button */}
      <WhatsAppButton />

      <main>
        {/* 1. Hero Section */}
        <Hero />

        {/* 5. Urgency Bar (Positioned high for conversion) */}
        <Urgency />

        {/* 2. Buy Block (Package Selection) */}
        <PackageSelector onSelect={setSelectedPackage} />

        {/* 3. Product Details */}
        <ProductDetails />

        {/* 4. Social Proof */}
        <Winners />

        {/* 6. Checkout Section */}
        <CheckoutForm selectedPackage={selectedPackage} />
      </main>

      <footer className="py-12 px-6 bg-primary text-primary-foreground border-t border-white/10">
        <div className="container mx-auto text-center space-y-6">
          <h2 className="text-2xl font-black text-secondary">PREMIA SEMPRE</h2>
          <p className="max-w-md mx-auto opacity-70 text-sm">
            Plataforma digital de sorteios autorizados. Participe com responsabilidade.
            Todos os direitos reservados &copy; {new Date().getFullYear()}
          </p>
          <div className="flex justify-center gap-6 text-sm font-bold opacity-80">
            <a href="#" className="hover:text-secondary transition-colors">Regras do Sorteio</a>
            <a href="#" className="hover:text-secondary transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-secondary transition-colors">Privacidade</a>
          </div>
          <div className="pt-4 flex justify-center gap-4">
            <Link 
              to="/account" 
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-bold text-primary bg-white rounded-full hover:bg-white/90 transition-colors shadow-lg"
            >
              Minha Conta
            </Link>
            <Link 
              to="/admin" 
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-bold text-primary bg-secondary rounded-full hover:bg-secondary/90 transition-colors shadow-lg"
            >
              Painel Admin
            </Link>
          </div>
          <div className="pt-6 border-t border-white/5 opacity-50 text-[10px] uppercase tracking-widest">
            Desenvolvido com foco total em conversão
          </div>
        </div>
      </footer>
    </div>
  );
}
