import classNames from 'classnames';
import CustomLink from './custom-link';
import type { NavLink } from '@/lib/content/types';

interface ButtonLinkProps {
  button: NavLink & { type?: string };
  appearance: string;
  compact?: boolean;
}

function ButtonContent({
  button,
  appearance,
  compact,
}: ButtonLinkProps) {
  return (
    <div
      className={classNames(
        'block w-full lg:w-auto text-center uppercase tracking-wide ' +
          'font-semibold text-base md:text-sm border-2 rounded-md',
        { 'px-8 py-4': !compact },
        { 'px-6 py-2': compact },
        {
          'bg-rbx-brown text-white border-rbx-brown hover:bg-amber-900':
            appearance === 'dark',
        },
        {
          'bg-transparent text-rbx-brown border-rbx-brown hover:bg-amber-50':
            appearance === 'dark-outline',
        },
        {
          'bg-white text-rbx-brown border-white hover:bg-amber-50':
            appearance === 'white',
        },
        {
          'bg-transparent text-white border-white hover:bg-white/10':
            appearance === 'white-outline',
        },
        {
          'bg-rbx-green text-white border-rbx-green hover:bg-rbx-green-dark':
            appearance === 'hero-primary',
        },
        {
          'bg-rbx-green-primary text-white border-rbx-green-primary hover:bg-rbx-green-secondary':
            appearance === 'rbx-primary',
        },
        {
          'bg-rbx-green-secondary text-white border-rbx-green-secondary hover:bg-rbx-green-primary':
            appearance === 'rbx-secondary',
        },
      )}
    >
      {button.text}
    </div>
  );
}

export default function ButtonLink({
  button,
  appearance,
  compact = false,
}: ButtonLinkProps) {
  return (
    <CustomLink link={button}>
      <ButtonContent
        button={button}
        appearance={appearance}
        compact={compact}
      />
    </CustomLink>
  );
}

export function getButtonAppearance(
  type: string | undefined,
  theme: 'light' | 'dark',
): string {
  if (theme === 'dark') {
    return type === 'primary' ? 'white' : 'white-outline';
  }

  return type === 'primary' ? 'dark' : 'dark-outline';
}
