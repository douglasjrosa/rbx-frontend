export default function HeadHints() {
  const isVercelPreview = process.env.VERCEL_ENV === 'preview';

  if (!isVercelPreview) {
    return null;
  }

  return (
    <link
      rel="preconnect"
      href="https://vercel.live"
      crossOrigin="anonymous"
    />
  );
}
