import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Session } from "@supabase/supabase-js";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  PlusCircle, 
  Users, 
  Settings, 
  TrendingUp, 
  Check, 
  Download,
  LayoutDashboard,
  CreditCard,
  AlertCircle,
  CheckCircle2,
  Wifi,
  WifiOff
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase, isSupabaseConfigured, supabaseConfig } from "@/lib/supabase";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showDiagnostics, setShowDiagnostics] = useState(false);
  const [testingConnection, setTestingConnection] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setShowDiagnostics(true);
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleTestConnection = async () => {
    setTestingConnection(true);
    try {
      const { data, error } = await supabase.from('products').select('count', { count: 'exact', head: true });
      if (error) throw error;
      toast.success("Conexão com Supabase estabelecida com sucesso!");
    } catch (error: any) {
      console.error("Connection test failed:", error);
      toast.error(`Falha na conexão: ${error.message || "Erro desconhecido"}`);
    } finally {
      setTestingConnection(false);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isRegistering) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) {
          if (error.message.includes("User already registered")) {
            toast.error("Este e-mail já está cadastrado.");
          } else {
            toast.error(`Erro ao criar conta: ${error.message}`);
          }
        } else {
          toast.success("Conta de administrador criada com sucesso! Verifique seu e-mail se necessário.");
          setIsRegistering(false);
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) {
          if (error.message === "Invalid login credentials") {
            toast.error("E-mail ou senha incorretos.");

          } else {
            toast.error(`Erro no login: ${error.message}`);
          }
        } else {
          toast.success("Login realizado com sucesso!");
        }
      }
    } catch (err: any) {
      toast.error("Ocorreu um erro inesperado na comunicação com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    toast.success("Sessão encerrada");
    navigate({ to: "/" });
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
      <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
        <div className="w-full max-w-md space-y-4">
          <Card className="p-8">
            <div className="flex flex-col items-center gap-2 mb-8">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <LayoutDashboard className="text-primary-foreground" size={24} />
              </div>
              <h1 className="text-2xl font-black tracking-tight">PREMIA ADMIN</h1>
              <p className="text-muted-foreground text-sm">Faça login para acessar o painel</p>
            </div>
            
            <form onSubmit={handleAuth} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@exemplo.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input 
                  id="password" 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 font-bold py-6" disabled={loading}>
                {loading ? "CARREGANDO..." : (isRegistering ? "CRIAR CONTA ADMIN" : "ENTRAR NO PAINEL")}
              </Button>
              
              {!isRegistering && (
                <div className="p-3 bg-secondary/10 rounded-lg border border-secondary/20 text-xs text-center space-y-1">
                  <p className="font-bold text-secondary-foreground">Acesso de Demonstração:</p>
                  <p className="text-muted-foreground italic">Usuário: admin@exemplo.com | Senha: admin123</p>
                </div>
              )}

              <div className="flex flex-col gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsRegistering(!isRegistering)}
                  className="w-full text-sm text-muted-foreground hover:text-primary transition-colors text-center"
                >
                  {isRegistering ? "Já tem uma conta? Entre aqui" : "Não tem uma conta? Crie uma aqui"}
                </button>
                
                <button
                  type="button"
                  onClick={() => setShowDiagnostics(!showDiagnostics)}
                  className="w-full text-xs text-muted-foreground/60 hover:text-primary transition-colors text-center"
                >
                  {showDiagnostics ? "Ocultar Diagnóstico" : "Ver Diagnóstico de Conexão"}
                </button>
              </div>
            </form>
          </Card>

          {showDiagnostics && (
            <Card className="p-6 border-destructive/20 animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="flex items-center gap-2 mb-4">
                <Settings className="w-4 h-4 text-primary" />
                <h3 className="font-bold text-sm">Diagnóstico do Supabase</h3>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-xs p-2 bg-muted rounded">
                  <span className="font-medium">URL:</span>
                  <div className="flex items-center gap-1">
                    {supabaseConfig.url ? (
                      <CheckCircle2 className="w-3 h-3 text-green-500" />
                    ) : (
                      <AlertCircle className="w-3 h-3 text-destructive" />
                    )}
                    <span className={supabaseConfig.url ? "text-green-600" : "text-destructive"}>
                      {supabaseConfig.url ? "Configurada" : "Ausente"}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-xs p-2 bg-muted rounded">
                  <span className="font-medium">Anon Key:</span>
                  <div className="flex items-center gap-1">
                    {supabaseConfig.anonKey ? (
                      <CheckCircle2 className="w-3 h-3 text-green-500" />
                    ) : (
                      <AlertCircle className="w-3 h-3 text-destructive" />
                    )}
                    <span className={supabaseConfig.anonKey ? "text-green-600" : "text-destructive"}>
                      {supabaseConfig.anonKey ? "Configurada" : "Ausente"}
                    </span>
                  </div>
                </div>
              </div>

              <Button 
                variant="outline" 
                size="sm" 
                className="w-full text-xs gap-2"
                onClick={handleTestConnection}
                disabled={testingConnection || !isSupabaseConfigured}
              >
                {testingConnection ? (
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-primary"></div>
                ) : (
                  <Wifi className="w-3 h-3" />
                )}
                {testingConnection ? "Testando..." : "Testar Conexão"}
              </Button>
              
              {!isSupabaseConfigured && (
                <Alert variant="destructive" className="mt-4 py-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle className="text-xs">Variáveis Faltando</AlertTitle>
                  <AlertDescription className="text-[10px]">
                    Adicione VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no Lovable.
                  </AlertDescription>
                </Alert>
              )}
            </Card>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-primary text-primary-foreground p-6 md:fixed md:h-full">
        <div className="flex items-center gap-2 mb-10">
          <div className="w-8 h-8 bg-secondary rounded-lg" />
          <h1 className="text-xl font-black tracking-tight">PREMIA ADMIN</h1>
        </div>
        
        <nav className="space-y-2">
          <NavItem icon={<LayoutDashboard size={20}/>} label="Dashboard" active={activeTab === "dashboard"} onClick={() => setActiveTab("dashboard")} />
          <NavItem icon={<PlusCircle size={20}/>} label="Produtos" active={activeTab === "products"} onClick={() => setActiveTab("products")} />
          <NavItem icon={<Users size={20}/>} label="Participantes" active={activeTab === "users"} onClick={() => setActiveTab("users")} />
          <NavItem icon={<Settings size={20}/>} label="Configurações" active={activeTab === "settings"} onClick={() => setActiveTab("settings")} />
        </nav>

        <div className="absolute bottom-8 left-6 right-6">
           <Button 
            variant="secondary" 
            className="w-full font-bold"
            onClick={handleLogout}
          >
            Sair
          </Button>
        </div>
      </aside>

      <main className="flex-1 md:ml-64 p-8">
        <header className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold capitalize">{activeTab}</h2>
          <Button className="bg-primary hover:bg-primary/90">
            <Download className="mr-2 h-4 w-4" /> Exportar Dados
          </Button>
        </header>

        {activeTab === "dashboard" && <DashboardView />}
        {activeTab === "products" && <ProductsView />}
        {activeTab === "users" && <UsersView />}
        {activeTab === "settings" && <SettingsView />}
      </main>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
        active ? "bg-secondary text-secondary-foreground" : "hover:bg-white/10"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function DashboardView() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard title="Vendas Totais" value="R$ 12.450,00" icon={<TrendingUp className="text-green-500" />} />
        <StatsCard title="Números Vendidos" value="1.842" icon={<TrendingUp className="text-green-500" />} />
        <StatsCard title="Participantes" value="452" icon={<Users className="text-blue-500" />} />
      </div>

      <Card className="p-6">
        <h3 className="text-xl font-bold mb-6">Vendas Recentes</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Usuário</TableHead>
              <TableHead>Produto</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">João Silva</TableCell>
              <TableCell>iPhone 15 Pro</TableCell>
              <TableCell>R$ 20,00</TableCell>
              <TableCell><span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold uppercase">Confirmado</span></TableCell>
              <TableCell><Button variant="ghost" size="sm">Ver</Button></TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Maria Souza</TableCell>
              <TableCell>iPhone 15 Pro</TableCell>
              <TableCell>R$ 10,00</TableCell>
              <TableCell><span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-bold uppercase">Pendente</span></TableCell>
              <TableCell><Button variant="secondary" size="sm">Confirmar</Button></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

function ProductsView() {
  return (
    <div className="space-y-8">
      <Card className="p-8">
        <h3 className="text-xl font-bold mb-6">Cadastrar Novo Prêmio</h3>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Nome do Produto</Label>
            <Input placeholder="Ex: iPhone 15 Pro Max" />
          </div>
          <div className="space-y-2">
            <Label>Valor do Bilhete (R$)</Label>
            <Input type="number" placeholder="5.00" />
          </div>
          <div className="space-y-2">
            <Label>Quantidade de Números</Label>
            <Input type="number" placeholder="1000" />
          </div>
          <div className="space-y-2">
            <Label>URL da Imagem</Label>
            <Input placeholder="https://..." />
          </div>
          <div className="md:col-span-2">
            <Button className="w-full py-6 font-bold text-lg">CADASTRAR PRODUTO</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

function UsersView() {
  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold mb-6">Participantes Ativos</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>WhatsApp</TableHead>
            <TableHead>Números</TableHead>
            <TableHead>Data</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">João Silva</TableCell>
            <TableCell>(11) 98888-7777</TableCell>
            <TableCell>001, 045, 122, 567...</TableCell>
            <TableCell>12/10/2023</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
}

function SettingsView() {
  const [mercadoPagoToken, setMercadoPagoToken] = useState("");

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Configurações salvas com sucesso!");
  };

  return (
    <div className="space-y-8">
      <Card className="p-8">
        <div className="flex items-center gap-3 mb-6">
          <CreditCard className="text-primary" size={24} />
          <h3 className="text-xl font-bold">Integração Mercado Pago</h3>
        </div>
        
        <form onSubmit={handleSaveSettings} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="mp_token">Access Token (Produção)</Label>
            <Input 
              id="mp_token" 
              type="password" 
              value={mercadoPagoToken}
              onChange={(e) => setMercadoPagoToken(e.target.value)}
              placeholder="APP_USR-..." 
            />
            <p className="text-xs text-muted-foreground">Utilizado para processar pagamentos via PIX automaticamente.</p>
          </div>

          <Button type="submit" className="w-full font-bold">SALVAR CONFIGURAÇÕES</Button>
        </form>
      </Card>
    </div>
  );
}

function StatsCard({ title, value, icon }: { title: string, value: string, icon: any }) {
  return (
    <Card className="p-6 flex items-center justify-between border-none shadow-md">
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
        <h4 className="text-2xl font-black text-primary">{value}</h4>
      </div>
      <div className="p-3 bg-muted rounded-xl">{icon}</div>
    </Card>
  );
}