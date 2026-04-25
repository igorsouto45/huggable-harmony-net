import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy } from "lucide-react";

const winners = [
  { id: 1, name: "Juliana Silva", prize: "iPhone 15 Pro", date: "Há 2 dias", avatar: "JS" },
  { id: 2, name: "Marcos Oliveira", prize: "PlayStation 5", date: "Há 5 dias", avatar: "MO" },
  { id: 3, name: "Beatriz Santos", prize: "R$ 1.000,00 no PIX", date: "Há 1 semana", avatar: "BS" },
  { id: 4, name: "Ricardo Lima", prize: "Apple Watch S9", date: "Há 2 semanas", avatar: "RL" },
];

export const Winners = () => {
  return (
    <section className="py-16 px-6 bg-background">
      <div className="container mx-auto max-w-5xl text-center">
        <h2 className="text-3xl font-bold mb-12 flex items-center justify-center gap-3">
          <Trophy className="text-secondary w-8 h-8" />
          Nossos Ganhadores
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {winners.map((winner) => (
            <Card key={winner.id} className="p-6 border-none shadow-md hover:shadow-lg transition-shadow bg-muted/50">
              <div className="flex flex-col items-center">
                <Avatar className="w-16 h-16 mb-4 border-2 border-secondary p-1">
                  <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                    {winner.avatar}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-bold text-lg mb-1">{winner.name}</h3>
                <p className="text-primary font-black text-sm uppercase tracking-tight mb-2">
                  Ganhou um {winner.prize}
                </p>
                <span className="text-xs text-muted-foreground">{winner.date}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
