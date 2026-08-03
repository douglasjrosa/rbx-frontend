import { SEO_PROOF_ITEMS } from '@/lib/seo/priority-landing';

export default function SeoProofStrip() {
  return (
    <section
      aria-label="Diferenciais Ribermax"
      className={
        'rounded-2xl border border-rbx-brown/20 bg-white px-4 py-5 ' +
        'shadow-sm md:px-6'
      }
    >
      <ul
        className={
          'flex flex-wrap items-center justify-center gap-x-6 gap-y-3 ' +
          'text-center text-sm font-semibold text-rbx-accent md:text-base'
        }
      >
        {SEO_PROOF_ITEMS.map((item) => (
          <li key={item} className="flex items-center gap-2">
            <span
              className="h-2 w-2 shrink-0 rounded-full bg-rbx-brown"
              aria-hidden
            />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
