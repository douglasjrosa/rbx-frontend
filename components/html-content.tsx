import sanitizeHtml from 'sanitize-html';

const ALLOWED_TAGS = [
  'h1',
  'h2',
  'h3',
  'h4',
  'p',
  'i',
  'div',
  'strong',
  'em',
  'ul',
  'ol',
  'li',
  'blockquote',
  'a',
  'img',
  'br',
  'details',
  'summary',
  'span',
];

const ALLOWED_ATTRIBUTES: sanitizeHtml.IOptions['allowedAttributes'] = {
  a: ['href', 'target', 'rel', 'style'],
  img: ['src', 'alt', 'width', 'height'],
  div: ['style'],
  h1: ['style'],
  h2: ['style'],
  h3: ['style'],
  h4: ['style'],
  span: ['style'],
};

function transformTags(html: string): string {
  return html.replace(
    /src="https:\/\/ribermax\.com\.br\/images\/([^"?]+)[^"]*"/g,
    'src="/images/$1"',
  );
}

interface HtmlContentProps {
  html: string;
  className?: string;
}

export default function HtmlContent({
  html,
  className = '',
}: HtmlContentProps) {
  if (!html) {
    return null;
  }

  const sanitized = sanitizeHtml(transformTags(html), {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: ALLOWED_ATTRIBUTES,
    transformTags: {
      img: (_tagName, attribs) => ({
        tagName: 'img',
        attribs: {
          ...attribs,
          loading: 'lazy',
          class: 'rounded-md mx-auto my-6 max-w-full h-auto',
        },
      }),
      a: (_tagName, attribs) => ({
        tagName: 'a',
        attribs: {
          ...attribs,
          class: 'text-sky-600 underline hover:text-sky-800',
          rel: attribs.target === '_blank' ? 'noopener noreferrer' : '',
        },
      }),
    },
  });

  return (
    <div
      className={`prose-rbx ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
}
