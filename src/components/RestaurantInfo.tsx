import React from 'react';
import { RestaurantInfo as RestaurantInfoType } from '../types/menu';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface RestaurantInfoProps {
  info: RestaurantInfoType;
  onUpdateInfo: (info: RestaurantInfoType) => void;
}

export const RestaurantInfo: React.FC<RestaurantInfoProps> = ({ info, onUpdateInfo }) => {
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

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">معلومات المطعم</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            اسم المطعم *
          </label>
          <input
            type="text"
            value={info.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            شعار المطعم
          </label>
          <div className="flex items-center gap-4">
            <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center gap-2">
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
                <img src={info.logo} alt="Logo" className="w-12 h-12 object-contain rounded" />
                <span className="text-sm text-green-600">تم رفع الشعار</span>
              </div>
            )}
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            موضع الشعار
          </label>
          <div className="flex gap-2">
            {[
              { value: 'top-left', label: 'يسار أعلى' },
              { value: 'top-center', label: 'وسط أعلى' },
              { value: 'top-right', label: 'يمين أعلى' }
            ].map((position) => (
              <button
                key={position.value}
                onClick={() => handleInputChange('logoPosition', position.value as any)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  info.logoPosition === position.value
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {position.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};