import React from 'react';
import { CTABlock } from '@/types/content-blocks';
import Link from 'next/link';

interface CTABlockRendererProps {
  block: CTABlock;
}

export function CTABlockRenderer({ block }: CTABlockRendererProps) {
  return (
    <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {block.title}
        </h2>
        
        {block.description && (
          <p className="text-lg md:text-xl opacity-90 mb-8">
            {block.description}
          </p>
        )}
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href={block.primaryButton.href}
            className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-blue-600 bg-white rounded-lg hover:bg-gray-50 transition-colors shadow-lg"
          >
            {block.primaryButton.label}
          </Link>
          
          {block.secondaryButton && (
            <Link
              href={block.secondaryButton.href}
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white border-2 border-white rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              {block.secondaryButton.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
