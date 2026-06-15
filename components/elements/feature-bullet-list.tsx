import { MdCheck, MdWarning } from 'react-icons/md';

type FeatureBulletListVariant = 'success' | 'danger';

interface FeatureBulletListProps {
  items: string[];
  variant?: FeatureBulletListVariant;
}

const VARIANT_STYLES: Record<
  FeatureBulletListVariant,
  {
    itemClass: string;
    iconWrap: string;
    Icon: typeof MdCheck;
  }
> = {
  success: {
    itemClass: 'border-emerald-600/30 bg-emerald-600/20',
    iconWrap: 'bg-rbx-green/15 text-rbx-green-dark',
    Icon: MdCheck,
  },
  danger: {
    itemClass: 'border-red-600/30 bg-red-600/20',
    iconWrap: 'bg-red-100 text-red-600',
    Icon: MdWarning,
  },
};

export default function FeatureBulletList({
  items,
  variant = 'success',
}: FeatureBulletListProps) {
  const { itemClass, iconWrap, Icon } = VARIANT_STYLES[variant];

  return (
    <ul className="space-y-3">
      {items.map((listItem, index) => (
        <li
          key={`item-${index}`}
          className={
            'flex items-start gap-3 rounded-xl border px-4 py-3 ' +
            itemClass
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
            {listItem}
          </span>
        </li>
      ))}
    </ul>
  );
}
