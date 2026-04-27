import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const VALID_SLUGS = ["regras", "termos", "privacidade"] as const;
const SLUG_TO_KEY: Record<string, string> = {
  regras: "rules",
  termos: "terms",
  privacidade: "privacy",
};

export const Route = createFileRoute("/p/$slug")({
  component: ContentPage,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Página não encontrada</h1>
        <Link to="/" className="text-primary underline">Voltar ao início</Link>
      </div>
    </div>
  ),
});

interface SiteContent {
  key: string;
  title: string;
  content: string;
  updated_at: string;
}

function renderMarkdown(md: string): string {
  // Renderizador simples de markdown (h1, h2, h3, bold, listas, parágrafos)
  const escape = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const lines = md.split("\n");
  let html = "";
  let inList = false;
  let inOl = false;

  const closeLists = () => {
    if (inList) { html += "</ul>"; inList = false; }
    if (inOl) { html += "</ol>"; inOl = false; }
  };

  for (let raw of lines) {
    const line = raw.trimEnd();
    if (!line.trim()) { closeLists(); continue; }

    if (line.startsWith("# ")) {
      closeLists();
      html += `<h1 class="text-4xl font-black mt-8 mb-6">${escape(line.slice(2))}</h1>`;
    } else if (line.startsWith("## ")) {
      closeLists();
      html += `<h2 class="text-2xl font-bold mt-8 mb-4">${escape(line.slice(3))}</h2>`;
    } else if (line.startsWith("### ")) {
      closeLists();
      html += `<h3 class="text-xl font-bold mt-6 mb-3">${escape(line.slice(4))}</h3>`;
    } else if (/^\d+\.\s/.test(line)) {
      if (!inOl) { closeLists(); html += '<ol class="list-decimal pl-6 space-y-2 mb-4">'; inOl = true; }
      html += `<li>${formatInline(escape(line.replace(/^\d+\.\s/, "")))}</li>`;
    } else if (line.startsWith("- ")) {
      if (!inList) { closeLists(); html += '<ul class="list-disc pl-6 space-y-2 mb-4">'; inList = true; }
      html += `<li>${formatInline(escape(line.slice(2)))}</li>`;
    } else {
      closeLists();
      html += `<p class="mb-4 leading-relaxed">${formatInline(escape(line))}</p>`;
    }
  }
  closeLists();
  return html;
}

function formatInline(s: string): string {
  return s
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>");
}

function ContentPage() {
  const { slug } = Route.useParams();
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFoundState, setNotFoundState] = useState(false);

  useEffect(() => {
    const key = SLUG_TO_KEY[slug];
    if (!key) {
      setNotFoundState(true);
      setLoading(false);
      return;
    }

    supabase
      .from("site_content")
      .select("*")
      .eq("key", key)
      .maybeSingle()
      .then(({ data, error }) => {
        if (error || !data) {
          setNotFoundState(true);
        } else {
          setContent(data as SiteContent);
        }
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (notFoundState || !content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Conteúdo não encontrado</h1>
          <Link to="/" className="text-primary underline">Voltar ao início</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b bg-background sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Logo />
          <Button asChild variant="ghost" size="sm">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
            </Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-3xl">
        <article
          className="prose prose-neutral max-w-none"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(content.content) }}
        />
        <p className="text-xs text-muted-foreground mt-12 pt-6 border-t">
          Última atualização: {new Date(content.updated_at).toLocaleDateString("pt-BR")}
        </p>
      </main>

      <footer className="py-8 px-6 bg-primary text-primary-foreground mt-16">
        <div className="container mx-auto text-center text-sm opacity-70">
          &copy; {new Date().getFullYear()} Premia Sempre. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}
