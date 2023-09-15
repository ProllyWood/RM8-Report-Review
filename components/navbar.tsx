'use client';

import { useCallback, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn, isNavActive } from '@sohanemon/utils';
import { useClickOutside } from '@sohanemon/utils/hooks';
import { AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion';

import { siteConfig } from '@/config/site';
import Motion from '@/components/motion';

import Brand from './brand';
import { Icons } from './icons';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  const update = useCallback(() => {
    if (scrollY.get() > scrollY.getPrevious() && scrollY.get() > 500) {
      return setHidden(true);
    }
    setHidden(false);
  }, [scrollY]);

  useMotionValueEvent(scrollY, 'change', update);

  return (
    <Motion
      animate={hidden ? 'top' : 'visible'}
      className={cn('bg-background sticky inset-x-0 top-0 z-40')}
      transition={{ delay: 0.1, duration: 0.5 }}
    >
      <nav className="container flex items-center justify-between px-5 ">
        <div className="flex items-center gap-4">
          <Brand />
        </div>
        <NavContent />
        {!isMenuOpen ? (
          <Icons.menu
            className="text-foreground cursor-pointer lg:hidden"
            onClick={() => setIsMenuOpen(true)}
          />
        ) : (
          <Icons.x
            className="text-foreground cursor-pointer lg:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </nav>
      <AnimatePresence>
        {isMenuOpen && <NavContentMob setIsMenuOpen={setIsMenuOpen} />}
      </AnimatePresence>
    </Motion>
  );
}

const NavContent = () => {
  const path = usePathname();
  return (
    <>
      <ul className="ml-20 flex items-center gap-12 max-lg:hidden ">
        {siteConfig.nav.map((_) => (
          <li
            key={_.title}
            className={cn('relative', {
              'text-primary': isNavActive(_.href, path),
            })}
          >
            <h3 className="px-3 capitalize">
              <Link href={_.href}>{_.title}</Link>
            </h3>
            {isNavActive(_.href, path) && (
              <Motion
                as="span"
                className="bg-primary/10 absolute inset-0 -z-10 rounded-md "
                layoutId="nav-bg"
              />
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

const NavContentMob = ({ setIsMenuOpen }: { setIsMenuOpen: Function }) => {
  const ref = useClickOutside(() => setIsMenuOpen(false));
  return (
    <Motion
      key={'header'}
      ref={ref}
      animate="visible"
      as={'ul'}
      className="bg-background absolute inset-x-0 mx-2 flex flex-col items-start gap-4 rounded-xl p-5 shadow-xl lg:hidden"
      exit={'left'}
      initial="top"
    >
      {siteConfig.nav.map((_) => (
        <li key={_.title} onClick={() => setIsMenuOpen(false)}>
          <span className="hover:text-primary/50 capitalize">
            <Link href={_.href}>{_.title}</Link>
          </span>
        </li>
      ))}
    </Motion>
  );
};
