import FeatureRowsGroup from './feature-rows-group';
import FeatureColumnsGroup from './feature-columns-group';
import RichText from './rich-text';
import type { ContentSection } from '@/lib/content/types';

const sectionElements = {
  'sections.feature-rows-group': FeatureRowsGroup,
  'sections.feature-columns-group': FeatureColumnsGroup,
  'sections.rich-text': RichText,
} as const;

interface SectionsProps {
  sections: ContentSection[];
}

export default function Sections({ sections }: SectionsProps) {
  return (
    <div className="flex flex-col">
      {sections.map((section, index) => {
        const SectionComponent = sectionElements[section.component];

        if (!SectionComponent) {
          return null;
        }

        return <SectionComponent key={index} data={section} />;
      })}
    </div>
  );
}
