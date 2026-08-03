'use client';

import HomeAboutSection from '@/components/home/home-about';
import HomeBannerSection from '@/components/home/home-banner';
import HomeContactSection from '@/components/home/home-contact';
import HomeCtaSection from '@/components/home/home-cta';
import HomeCustomPackagingSection from '@/components/home/home-custom-packaging';
import HomeDifferentialsSection from '@/components/home/home-differentials';
import HomeDiversitySection from '@/components/home/home-diversity';
import HomeHighlightsSection from '@/components/home/home-highlights';
import HomeInfoRowsSection from '@/components/home/home-info-rows';
import HomeModelsSection from '@/components/home/home-models';
import type { HomePage } from '@/lib/content/types';

interface HomeBelowFoldContentProps {
  page: HomePage;
}

export default function HomeBelowFoldContent({
  page,
}: HomeBelowFoldContentProps) {
  return (
    <div className="home-below-fold">
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
    </div>
  );
}
