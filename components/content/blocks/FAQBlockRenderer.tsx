import React from 'react';
import { FAQBlock } from '@/types/content-blocks';

interface FAQBlockRendererProps {
  block: FAQBlock;
}

export function FAQBlockRenderer({ block }: FAQBlockRendererProps) {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {block.title && (
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            {block.title}
          </h2>
        )}
        
        <div className="space-y-6">
          {block.items.map((item, index) => (
            <details
              key={index}
              className="group bg-white border border-gray-200 rounded-lg overflow-hidden"
            >
              <summary className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors">
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {item.question}
                </h3>
                <svg
                  className="w-5 h-5 text-gray-500 transition-transform group-open:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-4 pt-2 text-gray-600 leading-relaxed">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
