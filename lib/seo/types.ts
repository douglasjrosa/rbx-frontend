export interface SeoPageImageSlot {
  filename: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  insertAfterBlock: number;
}

export type SeoPageImagesMap = Record<string, SeoPageImageSlot[]>;
