import { MAP_EMBED_HEIGHT_PX } from '@/lib/contact-location';

interface GoogleMapEmbedProps {
  title: string;
  src: string;
  className?: string;
}

export default function GoogleMapEmbed({
  title,
  src,
  className = '',
}: GoogleMapEmbedProps) {
  return (
    <div className={`overflow-hidden rounded-2xl ${className}`}>
      <iframe
        title={title}
        src={src}
        className="w-full border-0"
        style={{ height: MAP_EMBED_HEIGHT_PX }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
