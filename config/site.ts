import { Metadata, Viewport } from 'next';

import { NavType } from '@/types/index.types';

import packageJson from '../package.json';

export type SiteConfig = typeof siteConfig;

const favicon = packageJson.icon;

export const siteConfig: {
  remoteUrl: string;
  metadata: Metadata;
  viewport: Viewport;
  nav: NavType[];
} = {
  remoteUrl: `https://${packageJson.name.toLowerCase()}.vercel.app`,
  metadata: {
    title: {
      default: packageJson.name.toUpperCase(),
      template: `%s - ${packageJson.name.toUpperCase()}`,
    },

    description: packageJson.description,
    icons: {
      icon: favicon,
      shortcut: favicon,
      apple: favicon,
    },
  },
  viewport: {
    themeColor: [
      { media: '(prefers-color-scheme: light)', color: 'white' },
      { media: '(prefers-color-scheme: dark)', color: 'black' },
    ],
  },
  nav: [
    { title: 'home', href: '/home' },
    { title: 'images', href: '/images' },
  ],
};
