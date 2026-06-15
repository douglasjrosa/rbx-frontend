import { MdCheck } from 'react-icons/md';

interface FeatureBulletListProps {
  items: string[];
}

export default function FeatureBulletList({ items }: FeatureBulletListProps) {
  return (
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li
          key={`item-${index}`}
          className={
            'flex items-start gap-3 rounded-xl border border-gray-100 ' +
            'bg-gray-50 px-4 py-3 transition-colors hover:bg-emerald-50/60'
          }
        >
          <span
            className={
              'mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center ' +
              'rounded-full bg-rbx-green/15 text-rbx-green-dark'
            }
          >
            <MdCheck className="h-4 w-4" aria-hidden="true" />
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
