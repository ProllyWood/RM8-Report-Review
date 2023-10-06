export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'Next.js',
  icon: '/favicon.ico',
  description: 'Minimal Next.js Template',
  theme: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  nav: [
    { title: 'home', href: '/' },
    { title: 'images', href: '/images' },
    { title: 'blog', href: '/blog' },
    { title: 'contact', href: '/contact' },
    { title: 'about', href: '/about' },
  ],
};
