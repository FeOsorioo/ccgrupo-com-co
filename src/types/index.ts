import type { ElementType } from 'react';

export interface ServiceBenefit {
  title: string;
  desc: string;
}

export interface ServiceDetails {
  heroImage: string;
  longDesc: string;
  features: string[];
  benefits: ServiceBenefit[];
}

export interface ServiceData {
  id: string;
  title: string;
  desc: string;
  tags: string[];
  link: string;
  icon: ElementType;
  gradient: string;
  details: ServiceDetails;
}

export interface NavLink {
  name: string;
  href: string;
}
