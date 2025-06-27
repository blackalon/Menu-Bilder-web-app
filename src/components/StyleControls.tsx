import React from 'react';
import { MenuStyle } from '../types/menu';
import { Palette, Type, Layout, Upload, Image as ImageIcon, Play } from 'lucide-react';

interface StyleControlsProps {
  style: MenuStyle;
  onUpdateStyle: (style: MenuStyle) => void;
}

export const StyleControls: React.FC<StyleControlsProps> = ({ style, onUpdateStyle }) => {
  const handleColorChange = (colorKey: keyof MenuStyle, value: string) => {
    onUpdateStyle({ ...style, [colorKey]: value });
  };

  const handleFontSizeChange = (sizeKey: keyof MenuStyle['fontSize'], value: number) => {
    onUpdateStyle({
      ...style,
      fontSize: { ...style.fontSize, [sizeKey]: value }
    });
  };

  const handleBackgroundUpload = (file: File, type: 'image' | 'video') => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (type === 'image') {
        onUpdateStyle({ ...style, backgroundImage: result, backgroundVideo: undefined });
      } else {
        onUpdateStyle({ ...style, backgroundVideo: result, backgroundImage: undefined });
      }
    };
    reader.readAsDataURL(file);
  };

  const colorOptions = [
    { key: 'primaryColor' as keyof MenuStyle, label: 'اللون الأساسي' },
    { key: 'secondaryColor' as keyof MenuStyle, label: 'اللون الثانوي' },
    { key: 'accentColor' as keyof MenuStyle, label: 'لون التمييز' },
    { key: 'backgroundColor' as keyof MenuStyle, label: 'لون الخلفية' },
    { key: 'textColor' as keyof MenuStyle, label: 'لون النص' }
  ];

  const fontSizeOptions = [
    { key: 'title' as keyof MenuStyle['fontSize'], label: 'العنوان الرئيسي' },
    { key: 'category' as keyof MenuStyle['fontSize'], label: 'عناوين الأصناف' },
    { key: 'item' as keyof MenuStyle['fontSize'], label: 'أسماء العناصر' },
    { key: 'price' as keyof MenuStyle['fontSize'], label: 'الأسعار' }
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
      <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <Palette className="w-5 h-5 text-purple-500" />
        تخصيص التصميم المتقدم
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Colors */}
        <div className="bg-gradient-to-br from-red-50 to-pink-50 p-4 rounded-xl border border-red-100">
          <h3 className="font-semibold mb-3 text-red-800 flex items-center gap-2">
            <Palette className="w-4 h-4" />
            الألوان
          </h3>
          <div className="space-y-3">
            {colorOptions.map((option) => (
              <div key={option.key}>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  {option.label}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={style[option.key] as string}
                    onChange={(e) => handleColorChange(option.key, e.target.value)}
                    className="w-12 h-10 rounded-lg border border-gray-300 cursor-pointer shadow-sm"
                  />
                  <input
                    type="text"
                    value={style[option.key] as string}
                    onChange={(e) => handleColorChange(option.key, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="#000000"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Typography */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
          <h3 className="font-semibold mb-3 text-blue-800 flex items-center gap-2">
            <Type className="w-4 h-4" />
            الخطوط والأحجام
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                نوع الخط
              </label>
              <select
                value={style.fontFamily}
                onChange={(e) => onUpdateStyle({ ...style, fontFamily: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Inter">Inter</option>
                <option value="Georgia">Georgia</option>
                <option value="Arial">Arial</option>
                <option value="Helvetica">Helvetica</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Roboto">Roboto</option>
                <option value="Open Sans">Open Sans</option>
              </select>
            </div>

            {fontSizeOptions.map((option) => (
              <div key={option.key}>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  {option.label}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="12"
                    max="48"
                    value={style.fontSize[option.key]}
                    onChange={(e) => handleFontSizeChange(option.key, parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-sm text-gray-600 w-12">
                    {style.fontSize[option.key]}px
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Layout */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100">
          <h3 className="font-semibold mb-3 text-green-800 flex items-center gap-2">
            <Layout className="w-4 h-4" />
            التخطيط
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                نمط العرض
              </label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { value: 'grid', label: 'شبكة' },
                  { value: 'card', label: 'بطاقات' },
                  { value: 'list', label: 'قائمة' }
                ].map((layout) => (
                  <button
                    key={layout.value}
                    onClick={() => onUpdateStyle({ ...style, layout: layout.value as any })}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      style.layout === layout.value
                        ? 'bg-green-500 text-white shadow-md'
                        : 'bg-white text-gray-700 hover:bg-green-100 border border-gray-200'
                    }`}
                  >
                    {layout.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                عدد العناصر في الصف
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="1"
                  max="6"
                  value={style.itemsPerRow}
                  onChange={(e) => onUpdateStyle({ ...style, itemsPerRow: parseInt(e.target.value) })}
                  className="flex-1"
                />
                <span className="text-sm text-gray-600 w-8">
                  {style.itemsPerRow}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                انحناء الحواف
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="24"
                  value={style.borderRadius}
                  onChange={(e) => onUpdateStyle({ ...style, borderRadius: parseInt(e.target.value) })}
                  className="flex-1"
                />
                <span className="text-sm text-gray-600 w-12">
                  {style.borderRadius}px
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                المسافات
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="8"
                  max="32"
                  value={style.spacing}
                  onChange={(e) => onUpdateStyle({ ...style, spacing: parseInt(e.target.value) })}
                  className="flex-1"
                />
                <span className="text-sm text-gray-600 w-12">
                  {style.spacing}px
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                شدة الظلال
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={style.shadowIntensity}
                  onChange={(e) => onUpdateStyle({ ...style, shadowIntensity: parseInt(e.target.value) })}
                  className="flex-1"
                />
                <span className="text-sm text-gray-600 w-8">
                  {style.shadowIntensity}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Background */}
        <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-4 rounded-xl border border-purple-100">
          <h3 className="font-semibold mb-3 text-purple-800">خلفية المنيو</h3>
          <div className="space-y-3">
            <div className="flex gap-2">
              <label className="cursor-pointer bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center gap-1 shadow-md flex-1 justify-center">
                <ImageIcon className="w-3 h-3" />
                صورة خلفية
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleBackgroundUpload(file, 'image');
                  }}
                  className="hidden"
                />
              </label>
              <label className="cursor-pointer bg-gradient-to-r from-purple-500 to-purple-600 text-white px-3 py-2 rounded-lg text-sm hover:from-purple-600 hover:to-purple-700 transition-all duration-200 flex items-center gap-1 shadow-md flex-1 justify-center">
                <Play className="w-3 h-3" />
                فيديو خلفية
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleBackgroundUpload(file, 'video');
                  }}
                  className="hidden"
                />
              </label>
            </div>

            {(style.backgroundImage || style.backgroundVideo) && (
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  شفافية الخلفية
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={style.backgroundOpacity}
                    onChange={(e) => onUpdateStyle({ ...style, backgroundOpacity: parseInt(e.target.value) })}
                    className="flex-1"
                  />
                  <span className="text-sm text-gray-600 w-12">
                    {style.backgroundOpacity}%
                  </span>
                </div>
              </div>
            )}

            {(style.backgroundImage || style.backgroundVideo) && (
              <button
                onClick={() => onUpdateStyle({ ...style, backgroundImage: undefined, backgroundVideo: undefined })}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-2 rounded-lg text-sm hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md"
              >
                إزالة الخلفية
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};