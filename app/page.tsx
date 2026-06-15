import HomeAboutSection from '@/components/home/home-about';
import HomeBannerSection from '@/components/home/home-banner';
import HomeContactSection from '@/components/home/home-contact';
import HomeDifferentialsSection from '@/components/home/home-differentials';
import HashScrollHandler from '@/components/home/hash-scroll-handler';
import HomeHeroSection from '@/components/home/home-hero';
import HomeHighlightsSection from '@/components/home/home-highlights';
import HomeInfoRowsSection from '@/components/home/home-info-rows';
import { getHomePage } from '@/lib/content/pages';
import { buildHomeMetadata } from '@/lib/metadata';

export const metadata = buildHomeMetadata(getHomePage());

export default function HomePage() {
  const page = getHomePage();

  return (
    <>
      <HashScrollHandler />
      {page.hero && <HomeHeroSection hero={page.hero} />}
      {page.banner && <HomeBannerSection banner={page.banner} />}
      {page.highlights && (
        <HomeHighlightsSection highlights={page.highlights} />
      )}
      {page.infoRows && <HomeInfoRowsSection infoRows={page.infoRows} />}
      {page.about && <HomeAboutSection about={page.about} />}
      {page.differentials && (
        <HomeDifferentialsSection differentials={page.differentials} />
      )}
      {page.contactSections && (
        <HomeContactSection sections={page.contactSections} />
      )}
    </>
  );
}
