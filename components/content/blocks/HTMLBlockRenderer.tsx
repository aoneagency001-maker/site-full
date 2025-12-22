import React from 'react';
import { HTMLBlock } from '@/types/content-blocks';

interface HTMLBlockRendererProps {
  block: HTMLBlock;
}

export function HTMLBlockRenderer({ block }: HTMLBlockRendererProps) {
  return (
    <section className="py-8 px-4">
      <div 
        className="max-w-7xl mx-auto"
        dangerouslySetInnerHTML={{ __html: block.content }}
      />
    </section>
  );
}
