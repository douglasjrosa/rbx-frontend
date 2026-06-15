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
      ? 'bg-rbx-porto bg-fixed bg-cover py-24 md:py-36'
      : 'bg-rbx-wood bg-repeat py-24 md:py-36';

  return (
    <div id="main-container" className={themeClass}>
      {children}
    </div>
  );
}
