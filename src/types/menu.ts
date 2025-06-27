export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  video?: string;
  icon?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  icon?: string;
  items: MenuItem[];
}

export interface Currency {
  code: string;
  symbol: string;
  name: string;
  flag?: string;
}

export interface RestaurantInfo {
  name: string;
  description: string;
  logo?: string;
  logoPosition: 'top-left' | 'top-center' | 'top-right';
  address?: string;
  phone?: string;
  website?: string;
  currency: Currency;
  displayStyle?: string;
}

export interface MenuStyle {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  fontSize: {
    title: number;
    category: number;
    item: number;
    price: number;
  };
  layout: 'grid' | 'card' | 'list' | 'custom';
  itemsPerRow: number;
  backgroundImage?: string;
  backgroundVideo?: string;
  backgroundOpacity: number;
  borderRadius: number;
  spacing: number;
  shadowIntensity: number;
  effects?: {
    blur?: boolean;
    glow?: boolean;
  };
}

export interface MenuTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
  style: MenuStyle;
  layout: 'modern' | 'classic' | 'minimal' | 'elegant' | 'rustic' | 'contemporary' | 'vintage' | 'artistic' | 'digital' | 'premium' | 'custom';
  isCustom?: boolean;
  createdBy?: string;
}

export interface MenuProject {
  id: string;
  name: string;
  restaurant: RestaurantInfo;
  template: MenuTemplate;
  categories: MenuCategory[];
  style: MenuStyle;
  createdAt: Date;
  updatedAt: Date;
  hasCart: boolean;
}