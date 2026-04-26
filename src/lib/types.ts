export interface RafflePackage {
  id: string | number;
  name: string;
  tickets: number;
  price: number;
  popular?: boolean;
  flags?: string[];
}

export interface SiteSettings {
  title: string;
  logoUrl?: string;
  faviconUrl?: string;
  primaryColor?: string;
  secondaryColor?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  whatsappNumber?: string;
}
