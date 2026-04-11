export type GigItem = {
    venue: string;
    location?: string;
    date: string;
    ctaLabel?: string;
    ctaUrl?: string;
    slug: string;
};

export type GigsBrick = {
  type: "gigs";
  title: string;
  upcomingItems: GigItem[];
  pastItems: GigItem[];
};

export type GigGroups = {
  upcomingItems: GigItem[];
  pastItems: GigItem[];
};

export type HeroBrick = {
  type: "hero";
  title: string;
  subtitle?: string;
  background?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  height?: string;
};

export type TextBrick = {
  type: "text";
  title: string;
  description?: string;
  palette?: string;
};

export type ImageLeftTextRightBrick = {
  type: "imageLeftTextRight";
  title: string;
  description?: string;
  image?: string;
  imageTitle?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  variant?: string;
};

export type TextLeftImageRightBrick = {
  type: "textLeftImageRight";
  title: string;
  description?: string;
  image?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  variant?: string;
};

export type VideoBrick = {
  type: "video";
  url?: string;
};

export type ImageBrick = {
  type: "image";
  image?: string;
  imageTitle?: string;
};

export type Brick = HeroBrick | TextBrick | ImageLeftTextRightBrick | TextLeftImageRightBrick | VideoBrick | ImageBrick | GigsBrick;

export type PagePayload = {
  slug: string;
  title: string;
  bricks: Brick[];
  metaTitle?: string;
  metaDescription?: string;
  seoSchema?: object;
};

export type GigPayload = {
  slug: string;
  venue?: string;
  location?: string;
  date?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  metaTitle?: string;
  metaDescription?: string;
  background?: string;
  seoSchema?: object;
};

// Per configurazione sito e navigazione ( LayoutThings )
export type ConfigurationPayload = {
  type: "configuration";
  siteName: string;
  siteLogo?: string;
  favicon?: string;
};

export type NavigationPayload = {
  type: "navigation";
  title: string;
  menuItems: {
    fields: {
      title: string;
      slug: string;
    };
  }[];
};

export type LayoutThings = {
  configuration: ConfigurationPayload;
  navigation: NavigationPayload;
};    