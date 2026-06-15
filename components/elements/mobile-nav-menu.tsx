'use client';

import { MdClose } from 'react-icons/md';
import CustomLink from './custom-link';
import ButtonLink from './button-link';
import type { SiteConfig } from '@/lib/content/types';

interface MobileNavMenuProps {
  navbar: SiteConfig['navbar'];
  closeSelf: () => void;
}

export default function MobileNavMenu({
  navbar,
  closeSelf,
}: MobileNavMenuProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 md:hidden">
      <div className="absolute right-0 top-0 h-full w-4/5 max-w-sm bg-white p-6">
        <button
          type="button"
          onClick={closeSelf}
          className="mb-6"
          aria-label="Fechar menu"
        >
          <MdClose className="h-8 w-8" />
        </button>
        <ul className="space-y-4 text-xl">
          {navbar.links.map((link, index) => (
            <li key={`mobile-${index}`}>
              <CustomLink link={link} onNavigate={closeSelf}>
                <span className="font-bold text-rbx-green-dark">
                  {link.text}
                </span>
              </CustomLink>
            </li>
          ))}
        </ul>
        {navbar.button && (
          <div className="mt-8" onClick={closeSelf}>
            <ButtonLink
              button={navbar.button}
              appearance="rbx-primary"
            />
          </div>
        )}
      </div>
    </div>
  );
}
