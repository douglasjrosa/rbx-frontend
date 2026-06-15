'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdMenu } from 'react-icons/md';
import MobileNavMenu from './mobile-nav-menu';
import ButtonLink, { getButtonAppearance } from './button-link';
import Image from './image';
import CustomLink from './custom-link';
import { siteConfig } from '@/content/site';
import { HOME_SECTIONS, NAVBAR_OFFSET_PX } from '@/lib/home-sections';

function parseHomeHash(url: string): string | null {
  if (url.startsWith('/#')) {
    return url.slice(1);
  }

  if (url === '/') {
    return '';
  }

  return null;
}

export default function Navbar() {
  const [mobileMenuIsShown, setMobileMenuIsShown] = useState(false);
  const [heroScrolled, setHeroScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState('');
  const pathname = usePathname();
  const { navbar } = siteConfig;
  const isHome = pathname === '/';
  const isHeroTransparent = isHome && !heroScrolled;

  useEffect(() => {
    if (!isHome) {
      setHeroScrolled(true);
      return;
    }

    setHeroScrolled(false);

    const hero = document.getElementById(HOME_SECTIONS.hero);
    if (!hero) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeroScrolled(!entry.isIntersecting);
      },
      {
        rootMargin: `-${NAVBAR_OFFSET_PX}px 0px 0px 0px`,
        threshold: 0,
      },
    );

    observer.observe(hero);

    return () => {
      observer.disconnect();
    };
  }, [isHome]);

  useEffect(() => {
    if (!isHome) {
      setActiveHash('');
      return;
    }

    const updateHash = () => {
      setActiveHash(window.location.hash);
    };

    updateHash();
    window.addEventListener('hashchange', updateHash);

    return () => {
      window.removeEventListener('hashchange', updateHash);
    };
  }, [isHome]);

  const logo = isHeroTransparent ? navbar.logoLight : navbar.logo;
  const navLinkClass = isHeroTransparent
    ? 'text-white hover:text-white/80'
    : 'text-gray-900 hover:text-rbx-brown';
  const activeLinkClass = isHeroTransparent
    ? 'bg-rbx-green-dark/80 text-white'
    : 'bg-emerald-100 text-rbx-green-dark';

  return (
    <>
      <nav
        className={
          'py-4 sm:py-3 transition-colors duration-300 ' +
          (isHeroTransparent
            ? 'bg-transparent shadow-none'
            : 'bg-white shadow-[0_10px_15px_rgba(0,0,0,0.25)]')
        }
      >
        <div
          className={
            'grid w-full grid-cols-[auto_1fr_auto] items-center ' +
            'gap-4 px-4 sm:px-6 lg:px-8'
          }
        >
          <Link
            href="/"
            aria-label="Página inicial"
            className="w-[150px] shrink-0"
          >
            <Image
              media={logo}
              className="h-10 w-auto object-contain"
              alternativeText="Logomarca Ribermax"
              width={150}
              height={39}
              priority
            />
          </Link>

          <ul
            className={
              'hidden list-none md:flex flex-row flex-1 items-center ' +
              'justify-around text-lg max-w-[600px] mx-[50px]'
            }
          >
            {navbar.links.map((navLink, index) => {
              const linkHash = parseHomeHash(navLink.url);
              const isActive =
                isHome &&
                (linkHash === ''
                  ? !activeHash || activeHash === `#${HOME_SECTIONS.hero}`
                  : activeHash === linkHash);

              return (
                <li key={`nav-${index}`}>
                  <CustomLink link={navLink}>
                    <span
                      className={
                        `whitespace-nowrap rounded px-3 py-1 ` +
                        `transition-colors ${navLinkClass} ` +
                        (isActive ? activeLinkClass : '')
                      }
                    >
                      {navLink.text}
                    </span>
                  </CustomLink>
                </li>
              );
            })}
          </ul>

          <div className="flex shrink-0 items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuIsShown(true)}
              className="p-1 block md:hidden"
              aria-label="Menu principal"
            >
              <MdMenu
                className={
                  'h-8 w-auto ' +
                  (isHeroTransparent ? 'text-white' : 'text-gray-900')
                }
              />
            </button>
            {navbar.button && (
              <div className="hidden md:block">
                <ButtonLink
                  button={navbar.button}
                  appearance={
                    isHeroTransparent
                      ? 'hero-primary'
                      : getButtonAppearance(navbar.button.type, 'light')
                  }
                  compact
                />
              </div>
            )}
          </div>
        </div>
      </nav>
      {mobileMenuIsShown && (
        <MobileNavMenu
          navbar={navbar}
          closeSelf={() => setMobileMenuIsShown(false)}
        />
      )}
    </>
  );
}
