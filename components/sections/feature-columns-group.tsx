import Image from '@/components/elements/image';
import Markdown from 'react-markdown';
import CustomLink from '@/components/elements/custom-link';
import type { ContentSection } from '@/lib/content/types';

interface FeatureColumnsGroupProps {
  data: ContentSection;
}

export default function FeatureColumnsGroup({
  data,
}: FeatureColumnsGroupProps) {
  return (
    <div
      className={
        'container flex flex-col lg:flex-row lg:flex-wrap z-20 ' +
        'gap-12 align-top mb-14'
      }
    >
      {data.features.map((feature, index) => (
        <div className="flex-1 text-lg card-rbx min-w-[250px]" key={index}>
          {feature.icon && (
            <Image media={feature.icon} className="w-full max-w-[200px] mx-auto" />
          )}
          <h2 className="font-bold mt-10 text-2xl text-rbx-green-dark mb-4">
            {feature.title}
          </h2>
          <div className="prose-rbx text-left">
            <Markdown>{feature.description}</Markdown>
          </div>
          {feature.link && (
            <CustomLink link={feature.link}>
              <span className="text-sky-600 hover:underline mt-4 inline-block">
                {feature.link.text}
              </span>
            </CustomLink>
          )}
        </div>
      ))}
    </div>
  );
}
