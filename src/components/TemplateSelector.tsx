import React from 'react';
import { MenuTemplate } from '../types/menu';
import { Check } from 'lucide-react';

interface TemplateSelectorProps {
  templates: MenuTemplate[];
  selectedTemplate: MenuTemplate | null;
  onSelectTemplate: (template: MenuTemplate) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  templates,
  selectedTemplate,
  onSelectTemplate
}) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">اختر قالب المنيو</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200 hover:shadow-lg ${
              selectedTemplate?.id === template.id
                ? 'border-blue-500 shadow-lg'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onSelectTemplate(template)}
          >
            <div className="aspect-video relative">
              <img
                src={template.preview}
                alt={template.name}
                className="w-full h-full object-cover"
              />
              {selectedTemplate?.id === template.id && (
                <div className="absolute inset-0 bg-blue-500 bg-opacity-20 flex items-center justify-center">
                  <div className="bg-blue-500 rounded-full p-2">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                </div>
              )}
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-sm text-gray-800">{template.name}</h3>
              <p className="text-xs text-gray-600 mt-1">{template.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};