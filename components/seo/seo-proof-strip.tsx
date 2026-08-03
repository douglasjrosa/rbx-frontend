import type { IconType } from 'react-icons';
import {
  MdFactory,
  MdForest,
  MdLocalShipping,
  MdVerified,
  MdWorkspacePremium,
} from 'react-icons/md';
import {
  SEO_PROOF_ITEMS,
  type SeoProofItem,
} from '@/lib/seo/priority-landing';

const PROOF_ICONS: Record<SeoProofItem['id'], IconType> = {
  'since-1996': MdWorkspacePremium,
  'factory-rp': MdFactory,
  reforestation: MdForest,
  'ht-nimf': MdVerified,
  'lead-time': MdLocalShipping,
};

export default function SeoProofStrip() {
  return (
    <section
      aria-label="Diferenciais Ribermax"
      className={
        'relative overflow-hidden rounded-2xl ' +
        'bg-gradient-to-br from-rbx-green-primary to-rbx-green-dark ' +
        'p-4 shadow-lg md:p-5'
      }
    >
      <div
        className={
          'pointer-events-none absolute -right-16 -top-16 h-48 w-48 ' +
          'rounded-full bg-white/10'
        }
        aria-hidden
      />
      <div
        className={
          'pointer-events-none absolute -bottom-20 -left-10 h-40 w-40 ' +
          'rounded-full bg-black/10'
        }
        aria-hidden
      />

      <ul
        className={
          'relative grid grid-cols-1 gap-3 sm:grid-cols-2 ' +
          'lg:grid-cols-5 lg:gap-3'
        }
      >
        {SEO_PROOF_ITEMS.map((item) => {
          const Icon = PROOF_ICONS[item.id];

          return (
            <li
              key={item.id}
              className={
                'flex items-start gap-3 rounded-xl border ' +
                'border-white/15 bg-white/10 px-3 py-3 backdrop-blur-sm ' +
                'transition hover:bg-white/20 sm:flex-col sm:items-center ' +
                'sm:px-3 sm:py-4 sm:text-center'
              }
            >
              <span
                className={
                  'flex h-10 w-10 shrink-0 items-center justify-center ' +
                  'rounded-full bg-white text-rbx-green-primary shadow-sm'
                }
                aria-hidden
              >
                <Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-bold leading-snug text-white md:text-base">
                  {item.label}
                </p>
                <p className="mt-0.5 text-xs leading-snug text-white/80 md:text-sm">
                  {item.hint}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
