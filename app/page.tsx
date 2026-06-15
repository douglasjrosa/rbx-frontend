import HomeAboutSection from '@/components/home/home-about';
import HomeBannerSection from '@/components/home/home-banner';
import HomeContactSection from '@/components/home/home-contact';
import HomeCtaSection from '@/components/home/home-cta';
import HomeCustomPackagingSection from '@/components/home/home-custom-packaging';
import HomeDifferentialsSection from '@/components/home/home-differentials';
import HomeDiversitySection from '@/components/home/home-diversity';
import HashScrollHandler from '@/components/home/hash-scroll-handler';
import HomeHeroSection from '@/components/home/home-hero';
import HomeHighlightsSection from '@/components/home/home-highlights';
import HomeInfoRowsSection from '@/components/home/home-info-rows';
import HomeModelsSection from '@/components/home/home-models';
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
      {page.cta && <HomeCtaSection cta={page.cta} />}
      {page.models && <HomeModelsSection models={page.models} />}
      {page.customPackaging && (
        <HomeCustomPackagingSection customPackaging={page.customPackaging} />
      )}
      {page.infoRows && <HomeInfoRowsSection infoRows={page.infoRows} />}
      {page.about && <HomeAboutSection about={page.about} />}
      {page.differentials && (
        <HomeDifferentialsSection differentials={page.differentials} />
      )}
      {page.diversity && (
        <HomeDiversitySection diversity={page.diversity} />
      )}
      {page.contact && <HomeContactSection contact={page.contact} />}
    </>
  );
}
