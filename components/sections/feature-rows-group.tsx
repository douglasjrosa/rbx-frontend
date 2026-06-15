'use client';

import classNames from 'classnames';
import Image from '@/components/elements/image';
import CustomLink from '@/components/elements/custom-link';
import TextHeader from '@/components/elements/text-header';
import Markdown from 'react-markdown';
import type { ContentSection } from '@/lib/content/types';

interface FeatureRowsGroupProps {
  data: ContentSection;
}

export default function FeatureRowsGroup({ data }: FeatureRowsGroupProps) {
  let joinNextRow = false;

  return (
    <div className="container flex flex-col z-20">
      {data.features.map((feature, index) => {
        const row = (
          <div
            key={`feature-${index}`}
            className={classNames(
              'flex flex-col justify-center md:p-8 sm:items-center ' +
                'bg-white md:gap-10 shadow-lg',
              { 'rounded-t-lg': !joinNextRow },
              { 'rounded-b-lg mb-16': !feature.joinNextRow },
              { 'md:flex-row': index % 2 === 0 },
              { 'md:flex-row-reverse': index % 2 === 1 },
            )}
          >
            <div className="w-full lg:w-4/12">
              {feature.media && (
                <Image
                  media={feature.media}
                  className={classNames(
                    'object-cover h-auto md:rounded-md w-full',
                    { 'rounded-t-md': !joinNextRow },
                  )}
                  priority={index < 1}
                />
              )}
            </div>
            <div className="w-full lg:w-6/12 text-lg p-5">
              <TextHeader heading={index} className="text-4xl py-6">
                {feature.title}
              </TextHeader>
              <div className="prose-rbx">
                <Markdown>{feature.description}</Markdown>
              </div>
              {feature.link && (
                <CustomLink link={feature.link}>
                  <span className="text-sky-600 with-arrow hover:underline">
                    {feature.link.text}
                  </span>
                </CustomLink>
              )}
            </div>
          </div>
        );
        joinNextRow = feature.joinNextRow;
        return row;
      })}
    </div>
  );
}
