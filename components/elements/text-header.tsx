interface TextHeaderProps {
  heading: number;
  className?: string;
  children: React.ReactNode;
}

export default function TextHeader({
  heading,
  className = '',
  children,
}: TextHeaderProps) {
  const Tag = heading === 0 ? 'h1' : 'h2';

  return <Tag className={className}>{children}</Tag>;
}
