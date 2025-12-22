import React from 'react';
import { HeroBlock } from '@/types/content-blocks';
import Link from 'next/link';

interface HeroBlockRendererProps {
  block: HeroBlock;
}

export function HeroBlockRenderer({ block }: HeroBlockRendererProps) {
  return (
    <section className="relative py-20 px-4 md:py-32 overflow-hidden bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          {block.eyebrow && (
            <p className="text-sm md:text-base font-semibold text-blue-600 mb-4 uppercase tracking-wide">
              {block.eyebrow}
            </p>
          )}
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {block.title}
          </h1>
          
          {block.subtitle && (
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              {block.subtitle}
            </p>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {block.primaryCta && (
              <Link
                href={block.primaryCta.href}
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
              >
                {block.primaryCta.label}
              </Link>
            )}
            
            {block.secondaryCta && (
              <Link
                href={block.secondaryCta.href}
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
              >
                {block.secondaryCta.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
