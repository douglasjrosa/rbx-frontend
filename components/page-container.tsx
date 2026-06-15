import { NAVBAR_OFFSET_PX } from '@/lib/home-sections';

interface PageContainerProps {
  children: React.ReactNode;
  variant?: 'porto' | 'wood';
}

export default function PageContainer({
  children,
  variant = 'wood',
}: PageContainerProps) {
  const themeClass =
    variant === 'porto'
      ? 'bg-rbx-porto bg-fixed bg-cover pb-24 md:pb-36'
      : 'bg-rbx-wood bg-repeat pb-24 md:pb-36';

  return (
    <div
      id="main-container"
      className={themeClass}
      style={{ paddingTop: NAVBAR_OFFSET_PX }}
    >
      {children}
    </div>
  );
}
