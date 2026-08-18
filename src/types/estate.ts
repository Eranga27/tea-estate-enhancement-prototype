export interface NavItem {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: NavItem[];
}

export interface Experience {
  id: string;
  category: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  icon: 'leaf' | 'trail' | 'factory' | 'tea' | 'dining' | 'leisure';
}

export interface Accommodation {
  id: string;
  index: string;
  name: string;
  description: string;
  image?: string;
  imageAlt?: string;
  meta?: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  location: string;
  source: string;
}