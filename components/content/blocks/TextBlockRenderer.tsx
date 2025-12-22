import React from 'react';
import { TextBlock } from '@/types/content-blocks';

interface TextBlockRendererProps {
  block: TextBlock;
}

export function TextBlockRenderer({ block }: TextBlockRendererProps) {
  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {block.heading && (
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {block.heading}
          </h2>
        )}
        
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
          {/* Simple whitespace preservation - can be enhanced with markdown later */}
          {block.body.split('\n').map((paragraph, index) => (
            paragraph.trim() ? (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ) : null
          ))}
        </div>
      </div>
    </section>
  );
}
