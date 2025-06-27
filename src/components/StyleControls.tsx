import React, { useState } from 'react';
import { MenuStyle } from '../types/menu';
import { Palette, Type, Layout, Upload, Image as ImageIcon, Play, Sliders, Zap } from 'lucide-react';

interface StyleControlsProps {
  style: MenuStyle;
  onUpdateStyle: (style: MenuStyle) => void;
}

export const StyleControls: React.FC<StyleControlsProps> = ({ style, onUpdateStyle }) => {
  const [showColorPicker, setShowColorPicker] = useState<string | null>(null);
  const [showFontPreview, setShowFontPreview] = useState(false);

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
    { key: 'primaryColor' as keyof MenuStyle, label: 'اللون الأساسي', icon: '🎨' },
    { key: 'secondaryColor' as keyof MenuStyle, label: 'اللون الثانوي', icon: '🖌️' },
    { key: 'accentColor' as keyof MenuStyle, label: 'لون التمييز', icon: '✨' },
    { key: 'backgroundColor' as keyof MenuStyle, label: 'لون الخلفية', icon: '🏠' },
    { key: 'textColor' as keyof MenuStyle, label: 'لون النص', icon: '📝' }
  ];

  const fontSizeOptions = [
    { key: 'title' as keyof MenuStyle['fontSize'], label: 'العنوان الرئيسي', icon: '📰' },
    { key: 'category' as keyof MenuStyle['fontSize'], label: 'عناوين الأصناف', icon: '📋' },
    { key: 'item' as keyof MenuStyle['fontSize'], label: 'أسماء العناصر', icon: '🍽️' },
    { key: 'price' as keyof MenuStyle['fontSize'], label: 'الأسعار', icon: '💰' }
  ];

  const fontOptions = [
    { value: 'Inter', label: 'Inter - عصري ونظيف', preview: 'font-sans' },
    { value: 'Georgia', label: 'Georgia - كلاسيكي وأنيق', preview: 'font-serif' },
    { value: 'Arial', label: 'Arial - بسيط وواضح', preview: 'font-sans' },
    { value: 'Helvetica', label: 'Helvetica - احترافي', preview: 'font-sans' },
    { value: 'Times New Roman', label: 'Times - تقليدي', preview: 'font-serif' },
    { value: 'Roboto', label: 'Roboto - حديث', preview: 'font-sans' },
    { value: 'Open Sans', label: 'Open Sans - ودود', preview: 'font-sans' },
    { value: 'Poppins', label: 'Poppins - عصري مدور', preview: 'font-sans' },
    { value: 'Montserrat', label: 'Montserrat - أنيق', preview: 'font-sans' },
    { value: 'Playfair Display', label: 'Playfair - فاخر', preview: 'font-serif' }
  ];

  const presetColors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
    '#F8C471', '#82E0AA', '#F1948A', '#85C1E9', '#D7BDE2'
  ];

  const ColorPicker = ({ colorKey, currentColor }: { colorKey: keyof MenuStyle, currentColor: string }) => (
    <div className="absolute top-full left-0 mt-2 bg-white/95 backdrop-blur-sm border border-gray-300 rounded-xl shadow-xl z-20 p-4 min-w-64">
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          اختر لون مخصص
        </label>
        <input
          type="color"
          value={currentColor}
          onChange={(e) => handleColorChange(colorKey, e.target.value)}
          className="w-full h-12 rounded-lg border border-gray-300 cursor-pointer"
        />
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          أو أدخل الكود
        </label>
        <input
          type="text"
          value={currentColor}
          onChange={(e) => handleColorChange(colorKey, e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="#000000"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          ألوان سريعة
        </label>
        <div className="grid grid-cols-5 gap-2">
          {presetColors.map((color) => (
            <button
              key={color}
              onClick={() => handleColorChange(colorKey, color)}
              className="w-8 h-8 rounded-lg border-2 border-gray-300 hover:border-gray-500 transition-colors transform hover:scale-110"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-100 mb-6">
      <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <Palette className="w-5 h-5 text-purple-500" />
        تخصيص التصميم المتقدم
        <Zap className="w-4 h-4 text-yellow-500 animate-pulse" />
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Enhanced Colors */}
        <div className="bg-gradient-to-br from-red-50/80 to-pink-50/80 backdrop-blur-sm p-4 rounded-xl border border-red-100 shadow-sm">
          <h3 className="font-semibold mb-3 text-red-800 flex items-center gap-2">
            <Palette className="w-4 h-4" />
            الألوان المتقدمة
          </h3>
          <div className="space-y-3">
            {colorOptions.map((option) => (
              <div key={option.key} className="relative">
                <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center gap-1">
                  <span>{option.icon}</span>
                  {option.label}
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowColorPicker(showColorPicker === option.key ? null : option.key)}
                    className="w-12 h-10 rounded-lg border-2 border-gray-300 cursor-pointer shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-105"
                    style={{ backgroundColor: style[option.key] as string }}
                  />
                  <input
                    type="text"
                    value={style[option.key] as string}
                    onChange={(e) => handleColorChange(option.key, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 backdrop-blur-sm"
                    placeholder="#000000"
                  />
                </div>
                {showColorPicker === option.key && (
                  <ColorPicker colorKey={option.key} currentColor={style[option.key] as string} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Typography */}
        <div className="bg-gradient-to-br from-blue-50/80 to-indigo-50/80 backdrop-blur-sm p-4 rounded-xl border border-blue-100 shadow-sm">
          <h3 className="font-semibold mb-3 text-blue-800 flex items-center gap-2">
            <Type className="w-4 h-4" />
            الخطوط والأحجام
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center gap-1">
                <span>🔤</span>
                نوع الخط
                <button
                  onClick={() => setShowFontPreview(!showFontPreview)}
                  className="ml-auto text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full hover:bg-blue-200 transition-colors"
                >
                  معاينة
                </button>
              </label>
              <select
                value={style.fontFamily}
                onChange={(e) => onUpdateStyle({ ...style, fontFamily: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
              >
                {fontOptions.map((font) => (
                  <option key={font.value} value={font.value}>
                    {font.label}
                  </option>
                ))}
              </select>
              {showFontPreview && (
                <div className="mt-2 p-3 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200">
                  <p style={{ fontFamily: style.fontFamily }} className="text-lg">
                    مثال على النص بهذا الخط - Sample Text
                  </p>
                </div>
              )}
            </div>

            {fontSizeOptions.map((option) => (
              <div key={option.key}>
                <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center gap-1">
                  <span>{option.icon}</span>
                  {option.label}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="12"
                    max="48"
                    value={style.fontSize[option.key]}
                    onChange={(e) => handleFontSizeChange(option.key, parseInt(e.target.value))}
                    className="flex-1 accent-blue-500"
                  />
                  <span className="text-sm text-gray-600 w-12 bg-white/60 backdrop-blur-sm px-2 py-1 rounded-md">
                    {style.fontSize[option.key]}px
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Layout */}
        <div className="bg-gradient-to-br from-green-50/80 to-emerald-50/80 backdrop-blur-sm p-4 rounded-xl border border-green-100 shadow-sm">
          <h3 className="font-semibold mb-3 text-green-800 flex items-center gap-2">
            <Layout className="w-4 h-4" />
            التخطيط المتقدم
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2 flex items-center gap-1">
                <span>📐</span>
                نمط العرض
              </label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { value: 'grid', label: 'شبكة', icon: '⊞' },
                  { value: 'card', label: 'بطاقات', icon: '🃏' },
                  { value: 'list', label: 'قائمة', icon: '📋' },
                  { value: 'custom', label: 'مخصص', icon: '🎛️' }
                ].map((layout) => (
                  <button
                    key={layout.value}
                    onClick={() => onUpdateStyle({ ...style, layout: layout.value as any })}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                      style.layout === layout.value
                        ? 'bg-green-500 text-white shadow-md transform scale-105'
                        : 'bg-white/80 text-gray-700 hover:bg-green-100 border border-gray-200 hover:shadow-md transform hover:scale-102'
                    }`}
                  >
                    <span>{layout.icon}</span>
                    {layout.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center gap-1">
                <span>🔢</span>
                عدد العناصر في الصف
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="1"
                  max="6"
                  value={style.itemsPerRow}
                  onChange={(e) => onUpdateStyle({ ...style, itemsPerRow: parseInt(e.target.value) })}
                  className="flex-1 accent-green-500"
                />
                <span className="text-sm text-gray-600 w-8 bg-white/60 backdrop-blur-sm px-2 py-1 rounded-md">
                  {style.itemsPerRow}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center gap-1">
                <span>🔄</span>
                انحناء الحواف
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="24"
                  value={style.borderRadius}
                  onChange={(e) => onUpdateStyle({ ...style, borderRadius: parseInt(e.target.value) })}
                  className="flex-1 accent-green-500"
                />
                <span className="text-sm text-gray-600 w-12 bg-white/60 backdrop-blur-sm px-2 py-1 rounded-md">
                  {style.borderRadius}px
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center gap-1">
                <span>📏</span>
                المسافات
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="8"
                  max="32"
                  value={style.spacing}
                  onChange={(e) => onUpdateStyle({ ...style, spacing: parseInt(e.target.value) })}
                  className="flex-1 accent-green-500"
                />
                <span className="text-sm text-gray-600 w-12 bg-white/60 backdrop-blur-sm px-2 py-1 rounded-md">
                  {style.spacing}px
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center gap-1">
                <span>🌫️</span>
                شدة الظلال
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={style.shadowIntensity}
                  onChange={(e) => onUpdateStyle({ ...style, shadowIntensity: parseInt(e.target.value) })}
                  className="flex-1 accent-green-500"
                />
                <span className="text-sm text-gray-600 w-8 bg-white/60 backdrop-blur-sm px-2 py-1 rounded-md">
                  {style.shadowIntensity}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Background */}
        <div className="bg-gradient-to-br from-purple-50/80 to-violet-50/80 backdrop-blur-sm p-4 rounded-xl border border-purple-100 shadow-sm">
          <h3 className="font-semibold mb-3 text-purple-800 flex items-center gap-2">
            <ImageIcon className="w-4 h-4" />
            خلفية المنيو المتقدمة
          </h3>
          <div className="space-y-3">
            <div className="flex gap-2">
              <label className="cursor-pointer bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center gap-1 shadow-md flex-1 justify-center transform hover:scale-105">
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
              <label className="cursor-pointer bg-gradient-to-r from-purple-500 to-purple-600 text-white px-3 py-2 rounded-lg text-sm hover:from-purple-600 hover:to-purple-700 transition-all duration-200 flex items-center gap-1 shadow-md flex-1 justify-center transform hover:scale-105">
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
                <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center gap-1">
                  <span>🔍</span>
                  شفافية الخلفية
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={style.backgroundOpacity}
                    onChange={(e) => onUpdateStyle({ ...style, backgroundOpacity: parseInt(e.target.value) })}
                    className="flex-1 accent-purple-500"
                  />
                  <span className="text-sm text-gray-600 w-12 bg-white/60 backdrop-blur-sm px-2 py-1 rounded-md">
                    {style.backgroundOpacity}%
                  </span>
                </div>
              </div>
            )}

            {(style.backgroundImage || style.backgroundVideo) && (
              <button
                onClick={() => onUpdateStyle({ ...style, backgroundImage: undefined, backgroundVideo: undefined })}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-2 rounded-lg text-sm hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md transform hover:scale-105"
              >
                إزالة الخلفية
              </button>
            )}

            {/* Effects Section */}
            <div className="mt-4 pt-4 border-t border-purple-200">
              <label className="block text-sm font-medium text-gray-600 mb-2 flex items-center gap-1">
                <Zap className="w-4 h-4" />
                تأثيرات بصرية
              </label>
              <div className="space-y-2">
                <button
                  onClick={() => onUpdateStyle({ ...style, effects: { ...style.effects, blur: !style.effects?.blur } })}
                  className={`w-full px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                    style.effects?.blur 
                      ? 'bg-purple-500 text-white shadow-md' 
                      : 'bg-white/80 text-gray-700 border border-gray-200 hover:bg-purple-100'
                  }`}
                >
                  🌫️ تأثير الضبابية
                </button>
                <button
                  onClick={() => onUpdateStyle({ ...style, effects: { ...style.effects, glow: !style.effects?.glow } })}
                  className={`w-full px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                    style.effects?.glow 
                      ? 'bg-purple-500 text-white shadow-md' 
                      : 'bg-white/80 text-gray-700 border border-gray-200 hover:bg-purple-100'
                  }`}
                >
                  ✨ تأثير التوهج
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close color picker */}
      {showColorPicker && (
        <div 
          className="fixed inset-0 z-10" 
          onClick={() => setShowColorPicker(null)}
        />
      )}
    </div>
  );
};