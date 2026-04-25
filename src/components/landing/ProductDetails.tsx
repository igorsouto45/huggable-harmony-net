export const ProductDetails = () => {
  return (
    <section className="py-16 px-6 bg-muted/30">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="rounded-3xl overflow-hidden shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=1000&auto=format&fit=crop" 
              alt="iPhone 15 Pro Max" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="space-y-6">
            <div className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
              Destaque do Dia
            </div>
            <h2 className="text-4xl font-black leading-tight text-primary">
              iPhone 15 Pro Max <br/>
              <span className="text-secondary text-5xl">256GB Titanium</span>
            </h2>
            <div className="text-2xl font-bold text-muted-foreground">
              Valor estimado: <span className="line-through">R$ 9.499,00</span>
            </div>
            <div className="text-3xl font-black text-primary">
              Por apenas R$ 5,00
            </div>
            
            <p className="text-xl font-medium text-muted-foreground italic">
              “Quanto mais números, mais chances de ganhar”
            </p>
            
            <div className="pt-4 border-t border-border">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                  <span className="font-bold">1</span>
                </div>
                <p className="font-semibold text-lg">Escolha seus números da sorte</p>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                  <span className="font-bold">2</span>
                </div>
                <p className="font-semibold text-lg">Pague via PIX com segurança</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                  <span className="font-bold">3</span>
                </div>
                <p className="font-semibold text-lg">Aguarde o sorteio oficial</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
