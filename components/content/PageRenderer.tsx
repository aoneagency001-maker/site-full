import React from 'react';
import {
  ContentBlock,
  isHeroBlock,
  isTextBlock,
  isFeaturesBlock,
  isFAQBlock,
  isStepsBlock,
  isCTABlock,
  isHTMLBlock,
} from '@/types/content-blocks';

// Block Components
import { HeroBlockRenderer } from './blocks/HeroBlockRenderer';
import { TextBlockRenderer } from './blocks/TextBlockRenderer';
import { FeaturesBlockRenderer } from './blocks/FeaturesBlockRenderer';
import { FAQBlockRenderer } from './blocks/FAQBlockRenderer';
import { StepsBlockRenderer } from './blocks/StepsBlockRenderer';
import { CTABlockRenderer } from './blocks/CTABlockRenderer';
import { HTMLBlockRenderer } from './blocks/HTMLBlockRenderer';

interface PageRendererProps {
  blocks: ContentBlock[];
  className?: string;
}

/**
 * PageRenderer - Renders CMS blocks on the public site
 * 
 * This component takes an array of ContentBlock objects from Supabase
 * and renders them using the appropriate block renderer components.
 */
export function PageRenderer({ blocks, className = '' }: PageRendererProps) {
  if (!blocks || blocks.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-gray-500">
          <p className="text-lg">Страница пуста</p>
          <p className="text-sm mt-2">Контент еще не добавлен</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`cms-content ${className}`}>
      {blocks.map((block, index) => {
        const key = block.id || `block-${index}`;

        try {
          // Route to appropriate block renderer
          if (isHeroBlock(block)) {
            return <HeroBlockRenderer key={key} block={block} />;
          }

          if (isTextBlock(block)) {
            return <TextBlockRenderer key={key} block={block} />;
          }

          if (isFeaturesBlock(block)) {
            return <FeaturesBlockRenderer key={key} block={block} />;
          }

          if (isFAQBlock(block)) {
            return <FAQBlockRenderer key={key} block={block} />;
          }

          if (isStepsBlock(block)) {
            return <StepsBlockRenderer key={key} block={block} />;
          }

          if (isCTABlock(block)) {
            return <CTABlockRenderer key={key} block={block} />;
          }

          if (isHTMLBlock(block)) {
            return <HTMLBlockRenderer key={key} block={block} />;
          }

          // Unknown block type
          return (
            <div key={key} className="p-4 my-4 bg-yellow-50 border border-yellow-200 rounded">
              <p className="text-sm text-yellow-800">
                ⚠️ Неизвестный тип блока: <code>{block.type}</code>
              </p>
            </div>
          );
        } catch (error) {
          console.error(`Error rendering block ${block.type}:`, error);
          return (
            <div key={key} className="p-4 my-4 bg-red-50 border border-red-200 rounded">
              <p className="text-sm text-red-800">
                ❌ Ошибка рендеринга блока: <code>{block.type}</code>
              </p>
            </div>
          );
        }
      })}
    </div>
  );
}
