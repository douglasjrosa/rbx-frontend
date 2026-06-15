import { MdCheck, MdWarning } from 'react-icons/md';

type FeatureBulletListVariant = 'success' | 'danger';

interface FeatureBulletListProps {
  items: string[];
  variant?: FeatureBulletListVariant;
}

const VARIANT_STYLES: Record<
  FeatureBulletListVariant,
  {
    item: string;
    itemHover: string;
    iconWrap: string;
    Icon: typeof MdCheck;
  }
> = {
  success: {
    item: 'border-emerald-600/25 bg-emerald-600/10',
    itemHover: 'hover:bg-emerald-600/15',
    iconWrap: 'bg-rbx-green/15 text-rbx-green-dark',
    Icon: MdCheck,
  },
  danger: {
    item: 'border-red-600/25 bg-red-600/10',
    itemHover: 'hover:bg-red-600/15',
    iconWrap: 'bg-red-100 text-red-600',
    Icon: MdWarning,
  },
};

export default function FeatureBulletList({
  items,
  variant = 'success',
}: FeatureBulletListProps) {
  const { item, itemHover, iconWrap, Icon } = VARIANT_STYLES[variant];

  return (
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li
          key={`item-${index}`}
          className={
            'flex items-start gap-3 rounded-xl border px-4 py-3 ' +
            `transition-colors ${item} ${itemHover}`
          }
        >
          <span
            className={
              'mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center ' +
              `rounded-full ${iconWrap}`
            }
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
          </span>
          <span
            className={
              'text-base font-bold leading-relaxed text-rbx-accent ' +
              'md:text-lg'
            }
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}
