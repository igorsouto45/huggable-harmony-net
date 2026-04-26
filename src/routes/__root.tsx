import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Premia Sempre - Ganhe produtos desejados pagando pouco" },
      { name: "description", content: "Participe de sorteios diários e concorra a produtos incríveis por preços baixos." },
      { name: "author", content: "Premia Sempre" },
      { property: "og:title", content: "Premia Sempre - Ganhe produtos desejados pagando pouco" },
      { property: "og:description", content: "Participe de sorteios diários e concorra a produtos incríveis por preços baixos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Premia Sempre - Ganhe produtos desejados pagando pouco" },
      { name: "twitter:description", content: "Participe de sorteios diários e concorra a produtos incríveis por preços baixos." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/0d15be79-5fc7-494f-b808-d15baddd8f92/id-preview-8832d123--5650ca74-aa85-43b9-8232-b3ddd8b03d12.lovable.app-1777159803929.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/0d15be79-5fc7-494f-b808-d15baddd8f92/id-preview-8832d123--5650ca74-aa85-43b9-8232-b3ddd8b03d12.lovable.app-1777159803929.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Toaster position="top-center" richColors />
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
