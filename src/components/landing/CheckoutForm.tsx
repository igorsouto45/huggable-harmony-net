import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ShieldCheck, Smartphone, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export const CheckoutForm = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      toast.success("Pedido gerado com sucesso!");
    }, 1500);
  };

  if (success) {
    return (
      <section id="checkout" className="py-20 px-6 bg-muted/50">
        <div className="container mx-auto max-w-xl text-center">
          <Card className="p-10 border-2 border-green-500 shadow-2xl">
            <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-black mb-4">Pedido Reservado!</h2>
            <p className="text-lg mb-8 text-muted-foreground">
              Para garantir seus números, realize o pagamento via <strong>PIX</strong> agora.
            </p>
            
            <div className="bg-muted p-6 rounded-2xl mb-8 flex flex-col items-center">
              <div className="bg-white p-2 rounded-xl mb-4">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=ChavePixSimulada" alt="QR Code PIX" className="w-48 h-48" />
              </div>
              <p className="text-xs font-mono break-all text-center mb-4">
                00020126330014br.gov.bcb.pix0111CHAVEPIXSIMULADA...
              </p>
              <Button variant="outline" className="w-full font-bold">COPIAR CÓDIGO PIX</Button>
            </div>

            <Button className="w-full bg-[#25D366] hover:bg-[#25D366]/90 text-white font-bold py-6 text-lg">
              ENVIAR COMPROVANTE WHATSAPP
            </Button>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="checkout" className="py-20 px-6 bg-muted/50">
      <div className="container mx-auto max-w-xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-primary mb-2">Finalizar Participação</h2>
          <p className="text-muted-foreground">Preencha seus dados para receber seus números.</p>
        </div>

        <Card className="p-8 shadow-xl border-none">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-base font-bold">Seu Nome Completo</Label>
              <Input id="name" placeholder="Ex: João Silva" required className="py-6 text-lg" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="whatsapp" className="text-base font-bold">Seu WhatsApp</Label>
              <Input id="whatsapp" placeholder="(00) 00000-0000" type="tel" required className="py-6 text-lg" />
            </div>

            <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 flex items-start gap-3">
              <ShieldCheck className="text-primary w-6 h-6 shrink-0 mt-1" />
              <div className="text-sm">
                <p className="font-bold text-primary">Pagamento 100% Seguro</p>
                <p className="text-muted-foreground">Seus dados estão protegidos e o sorteio é garantido.</p>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-black py-8 text-xl rounded-2xl shadow-lg transition-all active:scale-95"
              disabled={loading}
            >
              {loading ? "PROCESSANDO..." : "👉 PAGAR COM PIX AGORA"}
            </Button>
            
            <div className="flex justify-center gap-6 opacity-40 grayscale">
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a2/Logo%E2%80%94pix_bc.png" alt="Pix" className="h-6" />
              <div className="flex items-center gap-1 font-bold text-sm">
                <Smartphone className="w-4 h-4" />
                MOBILE FIRST
              </div>
            </div>
          </form>
        </Card>
      </div>
    </section>
  );
};
