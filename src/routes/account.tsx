import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Session } from "@supabase/supabase-js";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Ticket, History, User, LogOut } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface UserPurchase {
  id: string;
  raffle_name: string;
  numbers: string[];
  status: string;
  date: string;
}

export const Route = createFileRoute("/account")({
  component: AccountLayout,
});

function AccountLayout() {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [purchases, setPurchases] = useState<UserPurchase[]>([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchPurchases(session.user.id);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchPurchases(session.user.id);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchPurchases = async (userId: string) => {
    // In a real app, we would fetch from a 'purchases' table joined with 'products'
    // For now, using mock data but structured as requested
    const mockPurchases = [
      {
        id: "1",
        raffle_name: "iPhone 15 Pro Max",
        numbers: ["045", "122", "567"],
        status: "pago",
        date: "2023-10-12"
      },
      {
        id: "2",
        raffle_name: "PlayStation 5",
        numbers: ["012", "888"],
        status: "pendente",
        date: "2023-10-15"
      }
    ];
    setPurchases(mockPurchases);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Sessão encerrada");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 p-4">
        <Card className="w-full max-w-md p-8 text-center">
          <User className="mx-auto mb-4 text-primary" size={48} />
          <h1 className="text-2xl font-bold mb-2">Área do Cliente</h1>
          <p className="text-muted-foreground mb-6">Faça login para gerenciar suas compras e ver seus números.</p>
          <Button onClick={() => window.location.href = "/"} className="w-full font-bold">VOLTAR PARA O INÍCIO</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
              <User size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Minhas Compras</h2>
              <p className="text-sm text-muted-foreground">{session.user.email}</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut size={16} /> Sair
          </Button>
        </header>

        <div className="grid gap-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Ticket className="text-primary" size={24} />
              <h3 className="text-lg font-bold">Números por Sorteio</h3>
            </div>

            <div className="space-y-6">
              {purchases.map((purchase) => (
                <div key={purchase.id} className="border-b pb-6 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-lg">{purchase.raffle_name}</h4>
                      <p className="text-sm text-muted-foreground">Comprado em {new Date(purchase.date).toLocaleDateString()}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      purchase.status === 'pago' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {purchase.status}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {purchase.numbers.map((num: string) => (
                      <div key={num} className="bg-primary/10 text-primary font-mono font-bold px-3 py-1 rounded border border-primary/20">
                        {num}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              
              {purchases.length === 0 && (
                <p className="text-center text-muted-foreground py-8">Você ainda não possui compras.</p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
