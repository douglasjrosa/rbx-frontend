import Markdown from 'react-markdown';
import Image from '@/components/elements/image';
import { mediaAsset } from '@/lib/images';
import type { ContentSection } from '@/lib/content/types';

interface RichTextProps {
  data: ContentSection;
}

const specialistImage = mediaAsset(
  'especialista-min.webp',
  'Especialista Ribermax',
  400,
  300,
);

export default function RichText({ data }: RichTextProps) {
  return (
    <div
      className={
        'container card-rbx prose-rbx max-w-[90vw] bg-white rounded-lg ' +
        'shadow-lg p-12 block mx-auto mb-16'
      }
    >
      <Markdown
        components={{
          img: () => (
            <span className="text-center block my-6">
              <Image
                media={specialistImage}
                className="mx-auto rounded-md"
              />
            </span>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-sky-600 hover:underline"
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={
                href?.startsWith('http') ? 'noopener noreferrer' : undefined
              }
            >
              {children}
            </a>
          ),
        }}
      >
        {data.content ?? ''}
      </Markdown>
    </div>
  );
}
