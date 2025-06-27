import React, { useState } from 'react';
import { RestaurantInfo as RestaurantInfoType } from '../types/menu';
import { Upload, Image as ImageIcon, Settings, Eye } from 'lucide-react';

interface RestaurantInfoProps {
  info: RestaurantInfoType;
  onUpdateInfo: (info: RestaurantInfoType) => void;
}

export const RestaurantInfo: React.FC<RestaurantInfoProps> = ({ info, onUpdateInfo }) => {
  const [showLayoutPreview, setShowLayoutPreview] = useState(false);
  
  const handleInputChange = (field: keyof RestaurantInfoType, value: string) => {
    onUpdateInfo({ ...info, [field]: value });
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onUpdateInfo({ ...info, logo: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const layoutTemplates = [
    {
      id: 'classic',
      name: 'كلاسيكي',
      description: 'شعار في الأعلى مع النص تحته',
      preview: '🏛️',
      style: { logoPosition: 'top-center' as const, layout: 'vertical' }
    },
    {
      id: 'modern',
      name: 'عصري',
      description: 'شعار على اليسار مع النص على اليمين',
      preview: '🎨',
      style: { logoPosition: 'top-left' as const, layout: 'horizontal' }
    },
    {
      id: 'elegant',
      name: 'أنيق',
      description: 'شعار على اليمين مع النص على اليسار',
      preview: '✨',
      style: { logoPosition: 'top-right' as const, layout: 'horizontal' }
    },
    {
      id: 'minimal',
      name: 'بسيط',
      description: 'نص فقط بدون شعار',
      preview: '📝',
      style: { logoPosition: 'top-center' as const, layout: 'text-only' }
    },
    {
      id: 'premium',
      name: 'فاخر',
      description: 'شعار كبير في الوسط مع النص أسفله',
      preview: '👑',
      style: { logoPosition: 'top-center' as const, layout: 'logo-prominent' }
    }
  ];

  const applyLayoutTemplate = (template: typeof layoutTemplates[0]) => {
    onUpdateInfo({ 
      ...info, 
      logoPosition: template.style.logoPosition,
      displayStyle: template.style.layout
    });
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-100 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Settings className="w-5 h-5 text-blue-500" />
          معلومات المطعم
        </h2>
        <button
          onClick={() => setShowLayoutPreview(!showLayoutPreview)}
          className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 flex items-center gap-2 shadow-md transform hover:scale-105"
        >
          <Eye className="w-4 h-4" />
          قوالب العرض
        </button>
      </div>

      {/* Layout Templates */}
      {showLayoutPreview && (
        <div className="mb-6 p-4 bg-gradient-to-br from-purple-50/80 to-indigo-50/80 backdrop-blur-sm rounded-xl border border-purple-100">
          <h3 className="font-semibold mb-3 text-purple-800">قوالب عرض المعلومات</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {layoutTemplates.map((template) => (
              <button
                key={template.id}
                onClick={() => applyLayoutTemplate(template)}
                className={`p-3 rounded-lg border-2 transition-all duration-200 text-left hover:shadow-md transform hover:scale-105 ${
                  info.logoPosition === template.style.logoPosition
                    ? 'border-purple-500 bg-purple-100/80 shadow-md'
                    : 'border-gray-200 bg-white/80 hover:border-purple-300'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{template.preview}</span>
                  <div>
                    <h4 className="font-medium text-gray-800">{template.name}</h4>
                    <p className="text-xs text-gray-600">{template.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            اسم المطعم *
          </label>
          <input
            type="text"
            value={info.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm transition-all duration-200"
            placeholder="اسم المطعم"
            dir="rtl"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            الهاتف
          </label>
          <input
            type="text"
            value={info.phone || ''}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm transition-all duration-200"
            placeholder="رقم الهاتف"
            dir="rtl"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            وصف المطعم
          </label>
          <textarea
            value={info.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm transition-all duration-200"
            placeholder="وصف مختصر عن المطعم"
            dir="rtl"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            العنوان
          </label>
          <input
            type="text"
            value={info.address || ''}
            onChange={(e) => handleInputChange('address', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm transition-all duration-200"
            placeholder="عنوان المطعم"
            dir="rtl"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            الموقع الإلكتروني
          </label>
          <input
            type="url"
            value={info.website || ''}
            onChange={(e) => handleInputChange('website', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm transition-all duration-200"
            placeholder="https://example.com"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            شعار المطعم
          </label>
          <div className="flex items-center gap-4">
            <label className="cursor-pointer bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-md hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center gap-2 shadow-md transform hover:scale-105">
              <Upload className="w-4 h-4" />
              رفع الشعار
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
            </label>
            
            {info.logo && (
              <div className="flex items-center gap-2">
                <img src={info.logo} alt="Logo" className="w-12 h-12 object-contain rounded shadow-md" />
                <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full">تم رفع الشعار</span>
              </div>
            )}
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            موضع الشعار المخصص
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: 'top-left', label: 'يسار أعلى', icon: '↖️' },
              { value: 'top-center', label: 'وسط أعلى', icon: '⬆️' },
              { value: 'top-right', label: 'يمين أعلى', icon: '↗️' }
            ].map((position) => (
              <button
                key={position.value}
                onClick={() => handleInputChange('logoPosition', position.value as any)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2 justify-center transform hover:scale-105 ${
                  info.logoPosition === position.value
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                }`}
              >
                <span>{position.icon}</span>
                {position.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};