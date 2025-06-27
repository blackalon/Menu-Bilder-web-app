import React, { useState } from 'react';
import { MenuTemplate } from '../types/menu';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';

interface CustomTemplateManagerProps {
  customTemplates: MenuTemplate[];
  onAddTemplate: (template: MenuTemplate) => void;
  onUpdateTemplate: (template: MenuTemplate) => void;
  onDeleteTemplate: (templateId: string) => void;
  currentStyle: any;
}

export const CustomTemplateManager: React.FC<CustomTemplateManagerProps> = ({
  customTemplates,
  onAddTemplate,
  onUpdateTemplate,
  onDeleteTemplate,
  currentStyle
}) => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<MenuTemplate | null>(null);
  const [templateName, setTemplateName] = useState('');
  const [templateDescription, setTemplateDescription] = useState('');

  const handleSaveTemplate = () => {
    if (!templateName.trim()) return;

    const template: MenuTemplate = {
      id: editingTemplate?.id || `custom-${Date.now()}`,
      name: templateName,
      description: templateDescription,
      preview: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
      layout: 'custom',
      style: { ...currentStyle },
      isCustom: true,
      createdBy: 'علي عبدالله'
    };

    if (editingTemplate) {
      onUpdateTemplate(template);
    } else {
      onAddTemplate(template);
    }

    resetForm();
  };

  const resetForm = () => {
    setShowAddDialog(false);
    setEditingTemplate(null);
    setTemplateName('');
    setTemplateDescription('');
  };

  const startEdit = (template: MenuTemplate) => {
    setEditingTemplate(template);
    setTemplateName(template.name);
    setTemplateDescription(template.description);
    setShowAddDialog(true);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">القوالب المخصصة</h2>
        <button
          onClick={() => setShowAddDialog(true)}
          className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          إضافة قالب مخصص
        </button>
      </div>

      {customTemplates.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          لم تقم بإنشاء أي قوالب مخصصة بعد
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {customTemplates.map((template) => (
            <div key={template.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{template.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                  <p className="text-xs text-purple-600 mt-2">
                    بواسطة: {template.createdBy}
                  </p>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => startEdit(template)}
                    className="bg-blue-500 text-white p-1 rounded text-xs hover:bg-blue-600 transition-colors"
                  >
                    <Edit2 className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => onDeleteTemplate(template.id)}
                    className="bg-red-500 text-white p-1 rounded text-xs hover:bg-red-600 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Dialog */}
      {showAddDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                {editingTemplate ? 'تعديل القالب' : 'إضافة قالب جديد'}
              </h3>
              <button
                onClick={resetForm}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  اسم القالب
                </label>
                <input
                  type="text"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="اسم القالب"
                  dir="rtl"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  وصف القالب
                </label>
                <textarea
                  value={templateDescription}
                  onChange={(e) => setTemplateDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  rows={3}
                  placeholder="وصف مختصر للقالب"
                  dir="rtl"
                />
              </div>
            </div>
            
            <div className="flex gap-2 justify-end mt-6">
              <button
                onClick={resetForm}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                إلغاء
              </button>
              <button
                onClick={handleSaveTemplate}
                className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {editingTemplate ? 'تحديث' : 'حفظ'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};