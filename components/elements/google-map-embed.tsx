'use client';

import { useEffect, useRef, useState } from 'react';
import { MAP_EMBED_HEIGHT_PX } from '@/lib/contact-location';

interface GoogleMapEmbedProps {
  title: string;
  src: string;
  className?: string;
}

const MAP_LOAD_ROOT_MARGIN = '200px 0px';

export default function GoogleMapEmbed({
  title,
  src,
  className = '',
}: GoogleMapEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || shouldLoad) {
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: MAP_LOAD_ROOT_MARGIN },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [shouldLoad]);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden rounded-2xl ${className}`}
    >
      {shouldLoad ? (
        <iframe
          title={title}
          src={src}
          className="w-full border-0"
          style={{ height: MAP_EMBED_HEIGHT_PX }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <div
          className="w-full bg-[#d5dde6]"
          style={{ height: MAP_EMBED_HEIGHT_PX }}
          aria-hidden
        />
      )}
    </div>
  );
}
