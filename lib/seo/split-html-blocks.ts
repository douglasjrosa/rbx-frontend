const H2_SPLIT_PATTERN = /(?=<h2[\s>])/i;

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
  ];

  return {
    bodyBlocks,
    ctaBlock: callToAction.trim(),
  };
}
