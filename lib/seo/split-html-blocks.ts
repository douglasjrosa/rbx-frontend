const H2_SPLIT_PATTERN = /(?=<h2[\s>])/i;
const PERIOD_SPLIT_PATTERN = /(?<=\.)\s+/;

export function splitPeriodsIntoParagraphs(html: string): string {
  return html.replace(
    /<div([^>]*)>([\s\S]*?)<\/div>/gi,
    (_match, attrs, inner) => {
      if (/<(ul|ol)/i.test(inner)) {
        return `<div${attrs}>${inner}</div>`;
      }

      const paragraphs = splitInnerIntoParagraphs(inner.trim());
      return `<div${attrs}>${paragraphs}</div>`;
    },
  );
}

function splitInnerIntoParagraphs(inner: string): string {
  const sentences = inner
    .split(PERIOD_SPLIT_PATTERN)
    .map((part) => part.trim())
    .filter(Boolean);

  if (sentences.length <= 1) {
    return inner;
  }

  return sentences.map((sentence) => `<p>${sentence}</p>`).join('\n');
}

export function splitHtmlBlocks(html: string): string[] {
  const trimmed = html.trim();

  if (!trimmed) {
    return [];
  }

  const parts = trimmed.split(H2_SPLIT_PATTERN).map((part) => part.trim());
  return parts.filter(Boolean);
}

export function mergeSeoContentBlocks(
  mainContent: string,
  middleContent: string,
  callToAction: string,
): { bodyBlocks: string[]; ctaBlock: string } {
  const bodyBlocks = [
    ...splitHtmlBlocks(mainContent),
    ...splitHtmlBlocks(middleContent),
  ].map(splitPeriodsIntoParagraphs);

  return {
    bodyBlocks,
    ctaBlock: callToAction.trim(),
  };
}
