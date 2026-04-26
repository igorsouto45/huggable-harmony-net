import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { type RafflePackage } from "@/lib/types";

const packages: RafflePackage[] = [
  { id: 1, name: "Bronze", tickets: 1, price: 5, popular: false },
  { id: 2, name: "Prata", tickets: 5, price: 10, popular: false },
  { id: 3, name: "Ouro", tickets: 15, price: 15, popular: false },
  { id: 4, name: "Diamante", tickets: 30, price: 20, popular: true },
];

export const PackageSelector = ({ onSelect }: { onSelect: (pkg: RafflePackage) => void }) => {
  return (
    <section id="packages" className="py-16 px-4 bg-background">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-4 text-primary">Escolha seu pacote</h2>
        <p className="text-center text-muted-foreground mb-12">Quanto mais números, mais chances de ganhar!</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg) => (
            <Card 
              key={pkg.id}
              className={cn(
                "relative flex flex-col p-6 transition-all duration-300 hover:shadow-xl cursor-pointer",
                pkg.popular ? "border-secondary border-4 scale-105 shadow-2xl z-10" : "border-border"
              )}
              onClick={() => {
                onSelect(pkg);
                const checkoutSection = document.getElementById('checkout');
                if (checkoutSection) {
                  checkoutSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >

              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary text-secondary-foreground px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Mais escolhido
                </div>
              )}
              
              <div className="text-center mb-6">
                <span className="text-4xl font-black block mb-1">{pkg.tickets}</span>
                <span className="text-sm font-semibold uppercase text-muted-foreground">Números</span>
              </div>
              
              <div className="text-center mb-8">
                <span className="text-3xl font-bold">R${pkg.price}</span>
              </div>

              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-center text-sm font-medium">
                  <Check className="w-4 h-4 text-green-500 mr-2 shrink-0" />
                  Geração automática
                </li>
                <li className="flex items-center text-sm font-medium">
                  <Check className="w-4 h-4 text-green-500 mr-2 shrink-0" />
                  Confirmação instantânea
                </li>
              </ul>

              <Button 
                className={cn(
                  "w-full font-bold text-base py-6",
                  pkg.popular ? "bg-secondary text-secondary-foreground hover:bg-secondary/90" : "bg-primary text-primary-foreground"
                )}
                onClick={() => {
                  onSelect(pkg);
                  const checkoutSection = document.getElementById('checkout');
                  if (checkoutSection) {
                    checkoutSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                👉 COMPRAR AGORA
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
