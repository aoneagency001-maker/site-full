import React from 'react';
import { FeaturesBlock } from '@/types/content-blocks';

interface FeaturesBlockRendererProps {
  block: FeaturesBlock;
}

export function FeaturesBlockRenderer({ block }: FeaturesBlockRendererProps) {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {(block.title || block.subtitle) && (
          <div className="text-center mb-12">
            {block.title && (
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {block.title}
              </h2>
            )}
            {block.subtitle && (
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {block.subtitle}
              </p>
            )}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {block.items.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              {item.icon && (
                <div className="text-4xl mb-4">{item.icon}</div>
              )}
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
