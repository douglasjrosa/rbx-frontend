import HashScrollHandler from '@/components/home/hash-scroll-handler';
import HomeBelowFold from '@/components/home/home-below-fold';
import HomeHeroSection from '@/components/home/home-hero';
import { getHomePage } from '@/lib/content/pages';
import { buildHomeMetadata } from '@/lib/metadata';

export const metadata = buildHomeMetadata(getHomePage());

export default function HomePage() {
  const page = getHomePage();

  return (
    <>
      <HashScrollHandler />
      {page.hero && <HomeHeroSection hero={page.hero} />}
      <HomeBelowFold page={page} />
    </>
  );
}
