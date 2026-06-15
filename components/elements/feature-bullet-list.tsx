import { MdCheck, MdWarning } from 'react-icons/md';

type FeatureBulletListVariant = 'success' | 'danger';

interface FeatureBulletListProps {
  items: string[];
  variant?: FeatureBulletListVariant;
}

const VARIANT_STYLES: Record<
  FeatureBulletListVariant,
  { itemHover: string; iconWrap: string; Icon: typeof MdCheck }
> = {
  success: {
    itemHover: 'hover:bg-emerald-50/60',
    iconWrap: 'bg-rbx-green/15 text-rbx-green-dark',
    Icon: MdCheck,
  },
  danger: {
    itemHover: 'hover:bg-red-50/60',
    iconWrap: 'bg-red-100 text-red-600',
    Icon: MdWarning,
  },
};

export default function FeatureBulletList({
  items,
  variant = 'success',
}: FeatureBulletListProps) {
  const { itemHover, iconWrap, Icon } = VARIANT_STYLES[variant];

  return (
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li
          key={`item-${index}`}
          className={
            'flex items-start gap-3 rounded-xl border border-gray-100 ' +
            `bg-gray-50 px-4 py-3 transition-colors ${itemHover}`
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
