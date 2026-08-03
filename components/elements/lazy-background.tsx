'use client';

import { useEffect, useRef, useState } from 'react';

interface LazyBackgroundProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Applies a CSS background image only when the element nears the viewport,
 * so below-fold textures do not compete with LCP.
 */
export default function LazyBackground({
  src,
  className,
  style,
}: LazyBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        ...(visible ? { backgroundImage: `url('${src}')` } : undefined),
      }}
      aria-hidden
    />
  );
}
