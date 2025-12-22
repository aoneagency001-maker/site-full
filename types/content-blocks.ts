// Content Block Types (shared between admin and site)
// Synced with: /admin/types/content-blocks.ts

// Base type for all blocks
export interface BlockBase {
  id: string;
  type: BlockType;
  version: number;
}

// Block types
export type BlockType =
  | 'hero'
  | 'text'
  | 'features'
  | 'faq'
  | 'steps'
  | 'cta'
  | 'html'
  | 'legacy-page';

// Hero Block
export interface HeroBlock extends BlockBase {
  type: 'hero';
  eyebrow?: string;
  title: string;
  subtitle?: string;
  primaryCta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  imageId?: string;
}

// Text Block
export interface TextBlock extends BlockBase {
  type: 'text';
  heading?: string;
  body: string; // markdown or plain text
}

// Features Block
export interface FeaturesBlock extends BlockBase {
  type: 'features';
  title?: string;
  subtitle?: string;
  items: Array<{
    icon?: string;
    title: string;
    description: string;
  }>;
}

// FAQ Block
export interface FAQBlock extends BlockBase {
  type: 'faq';
  title?: string;
  items: Array<{
    question: string;
    answer: string;
  }>;
}

// Steps Block
export interface StepsBlock extends BlockBase {
  type: 'steps';
  title?: string;
  steps: Array<{
    number: number;
    title: string;
    description: string;
  }>;
}

// CTA Block
export interface CTABlock extends BlockBase {
  type: 'cta';
  title: string;
  description?: string;
  primaryButton: {
    label: string;
    href: string;
  };
  secondaryButton?: {
    label: string;
    href: string;
  };
}

// HTML Block (for custom content)
export interface HTMLBlock extends BlockBase {
  type: 'html';
  content: string;
}

// Legacy Page Block (for old static pages)
export interface LegacyPageBlock extends BlockBase {
  type: 'legacy-page';
  componentPath: string;
}

// Union type of all blocks
export type ContentBlock =
  | HeroBlock
  | TextBlock
  | FeaturesBlock
  | FAQBlock
  | StepsBlock
  | CTABlock
  | HTMLBlock
  | LegacyPageBlock;

// Type guard utilities
export function isHeroBlock(block: ContentBlock): block is HeroBlock {
  return block.type === 'hero';
}

export function isTextBlock(block: ContentBlock): block is TextBlock {
  return block.type === 'text';
}

export function isFeaturesBlock(block: ContentBlock): block is FeaturesBlock {
  return block.type === 'features';
}

export function isFAQBlock(block: ContentBlock): block is FAQBlock {
  return block.type === 'faq';
}

export function isStepsBlock(block: ContentBlock): block is StepsBlock {
  return block.type === 'steps';
}

export function isCTABlock(block: ContentBlock): block is CTABlock {
  return block.type === 'cta';
}

export function isHTMLBlock(block: ContentBlock): block is HTMLBlock {
  return block.type === 'html';
}

export function isLegacyPageBlock(block: ContentBlock): block is LegacyPageBlock {
  return block.type === 'legacy-page';
}

// Validation helper
export const isValidBlock = (block: unknown): block is ContentBlock => {
  if (!block || typeof block !== 'object') return false;
  const b = block as Partial<ContentBlock>;
  return !!(b.id && b.type && typeof b.version === 'number');
};
