import React, { useState } from 'react';
import { MenuTemplate } from '../types/menu';
import { Plus, Edit2, Trash2, Save, X, Upload, FileImage } from 'lucide-react';

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
  const [templateFile, setTemplateFile] = useState<File | null>(null);

  const handleSaveTemplate = () => {
    if (!templateName.trim()) return;

    const template: MenuTemplate = {
      id: editingTemplate?.id || `custom-${Date.now()}`,
      name: templateName,
      description: templateDescription,
      preview: templateFile ? URL.createObjectURL(templateFile) : 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
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
    setTemplateFile(null);
  };

  const startEdit = (template: MenuTemplate) => {
    setEditingTemplate(template);
    setTemplateName(template.name);
    setTemplateDescription(template.description);
    setShowAddDialog(true);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setTemplateFile(file);
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-100 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">القوالب المخصصة</h2>
        <button
          onClick={() => setShowAddDialog(true)}
          className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 flex items-center gap-2 shadow-md transform hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          إضافة قالب مخصص
        </button>
      </div>

      {customTemplates.length === 0 ? (
        <div className="text-center py-8 bg-gradient-to-br from-gray-50/80 to-white/80 backdrop-blur-sm rounded-xl border border-gray-100">
          <FileImage className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500">لم تقم بإنشاء أي قوالب مخصصة بعد</p>
          <p className="text-sm text-gray-400 mt-1">ابدأ بإنشاء قالبك الأول</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {customTemplates.map((template) => (
            <div key={template.id} className="border border-gray-200 rounded-xl p-4 bg-gradient-to-br from-white/80 to-gray-50/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-105">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{template.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                  <p className="text-xs text-purple-600 mt-2 bg-purple-50 px-2 py-1 rounded-full inline-block">
                    بواسطة: {template.createdBy}
                  </p>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => startEdit(template)}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-1 rounded text-xs hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-sm transform hover:scale-110"
                  >
                    <Edit2 className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => onDeleteTemplate(template.id)}
                    className="bg-gradient-to-r from-red-500 to-red-600 text-white p-1 rounded text-xs hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-sm transform hover:scale-110"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Enhanced Add/Edit Dialog */}
      {showAddDialog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/95 backdrop-blur-sm p-6 rounded-xl max-w-md w-full mx-4 shadow-2xl border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                {editingTemplate ? (
                  <>
                    <Edit2 className="w-5 h-5 text-blue-500" />
                    تعديل القالب
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5 text-purple-500" />
                    إضافة قالب جديد
                  </>
                )}
              </h3>
              <button
                onClick={resetForm}
                className="text-gray-500 hover:text-gray-700 transition-colors"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 backdrop-blur-sm transition-all duration-200"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 backdrop-blur-sm transition-all duration-200"
                  rows={3}
                  placeholder="وصف مختصر للقالب"
                  dir="rtl"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  صورة معاينة القالب
                </label>
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center gap-2 shadow-md transform hover:scale-105">
                    <Upload className="w-4 h-4" />
                    رفع صورة
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  {templateFile && (
                    <div className="flex items-center gap-2">
                      <img 
                        src={URL.createObjectURL(templateFile)} 
                        alt="Preview" 
                        className="w-12 h-12 object-cover rounded-lg shadow-sm" 
                      />
                      <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full">
                        تم رفع الصورة
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  اختر صورة تمثل شكل القالب (اختياري)
                </p>
              </div>
            </div>
            
            <div className="flex gap-2 justify-end mt-6">
              <button
                onClick={resetForm}
                className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-4 py-2 rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-200 shadow-md transform hover:scale-105"
              >
                إلغاء
              </button>
              <button
                onClick={handleSaveTemplate}
                className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 flex items-center gap-2 shadow-md transform hover:scale-105"
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