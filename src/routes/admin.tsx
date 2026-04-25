import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  LayoutDashboard
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col md:flex-row">
      {/* Sidebar */}
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
      </aside>

      {/* Main Content */}
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
