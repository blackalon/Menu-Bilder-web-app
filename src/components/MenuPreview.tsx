import React, { useState } from 'react';
import { MenuProject, MenuItem } from '../types/menu';
import { Move, RotateCcw, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

interface MenuPreviewProps {
  project: MenuProject;
  showCurrencyFlag: boolean;
  onUpdateProject?: (project: MenuProject) => void;
}

export const MenuPreview: React.FC<MenuPreviewProps> = ({ 
  project, 
  showCurrencyFlag, 
  onUpdateProject 
}) => {
  const { restaurant, categories, style } = project;
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [itemPositions, setItemPositions] = useState<Record<string, { x: number; y: number; scale: number }>>({});
  const [previewScale, setPreviewScale] = useState(1);

  const getGridClass = () => {
    if (style.layout === 'custom') return 'relative';
    
    switch (style.itemsPerRow) {
      case 1: return 'grid-cols-1';
      case 2: return 'grid-cols-1 md:grid-cols-2';
      case 3: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      case 4: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
      case 5: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5';
      case 6: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6';
      default: return 'grid-cols-1 md:grid-cols-2';
    }
  };

  const getLayoutClass = () => {
    switch (style.layout) {
      case 'grid': return `grid ${getGridClass()}`;
      case 'card': return 'space-y-4';
      case 'list': return 'space-y-2';
      case 'custom': return 'relative min-h-96';
      default: return `grid ${getGridClass()}`;
    }
  };

  const getShadowClass = () => {
    const intensity = style.shadowIntensity;
    if (intensity <= 2) return 'shadow-sm';
    if (intensity <= 4) return 'shadow-md';
    if (intensity <= 6) return 'shadow-lg';
    if (intensity <= 8) return 'shadow-xl';
    return 'shadow-2xl';
  };

  const handleItemDrag = (itemId: string, e: React.MouseEvent) => {
    if (style.layout !== 'custom') return;
    
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const currentPos = itemPositions[itemId] || { x: 0, y: 0, scale: 1 };

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      
      setItemPositions(prev => ({
        ...prev,
        [itemId]: {
          ...currentPos,
          x: currentPos.x + deltaX,
          y: currentPos.y + deltaY
        }
      }));
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleItemScale = (itemId: string, delta: number) => {
    setItemPositions(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId] || { x: 0, y: 0, scale: 1 },
        scale: Math.max(0.5, Math.min(2, (prev[itemId]?.scale || 1) + delta))
      }
    }));
  };

  const resetItemPosition = (itemId: string) => {
    setItemPositions(prev => {
      const newPositions = { ...prev };
      delete newPositions[itemId];
      return newPositions;
    });
  };

  const getEffectsClass = () => {
    let effects = '';
    if (style.effects?.blur) effects += ' backdrop-blur-sm';
    if (style.effects?.glow) effects += ' drop-shadow-lg';
    return effects;
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-gray-200">
      <div className="sticky top-0 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white px-4 py-3 z-10 flex items-center justify-between">
        <h3 className="font-semibold flex items-center gap-2">
          <Maximize2 className="w-4 h-4" />
          معاينة المنيو المباشرة
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPreviewScale(Math.max(0.5, previewScale - 0.1))}
            className="bg-white/20 hover:bg-white/30 p-1 rounded transition-colors"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-sm bg-white/20 px-2 py-1 rounded">
            {Math.round(previewScale * 100)}%
          </span>
          <button
            onClick={() => setPreviewScale(Math.min(1.5, previewScale + 0.1))}
            className="bg-white/20 hover:bg-white/30 p-1 rounded transition-colors"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div 
        className="p-6 min-h-[500px] max-h-[600px] overflow-y-auto relative"
        style={{ 
          backgroundColor: style.backgroundColor,
          color: style.textColor,
          fontFamily: style.fontFamily,
          transform: `scale(${previewScale})`,
          transformOrigin: 'top left'
        }}
      >
        {/* Background Image/Video */}
        {style.backgroundImage && (
          <div 
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat ${getEffectsClass()}`}
            style={{ 
              backgroundImage: `url(${style.backgroundImage})`,
              opacity: style.backgroundOpacity / 100
            }}
          />
        )}
        {style.backgroundVideo && (
          <video
            className={`absolute inset-0 w-full h-full object-cover ${getEffectsClass()}`}
            style={{ opacity: style.backgroundOpacity / 100 }}
            autoPlay
            muted
            loop
          >
            <source src={style.backgroundVideo} type="video/mp4" />
          </video>
        )}

        <div className="relative z-10">
          {/* Header */}
          <div className={`flex items-center mb-6 ${
            restaurant.logoPosition === 'top-center' ? 'justify-center text-center' :
            restaurant.logoPosition === 'top-right' ? 'justify-end text-right' : 'justify-start text-left'
          }`}>
            {restaurant.logo && (
              <img 
                src={restaurant.logo} 
                alt="Logo" 
                className="w-16 h-16 object-contain rounded-lg mr-4 shadow-md hover:shadow-lg transition-shadow duration-300"
                style={{ borderRadius: `${style.borderRadius}px` }}
              />
            )}
            <div>
              <h1 
                style={{ 
                  fontSize: `${style.fontSize.title}px`,
                  color: style.primaryColor
                }}
                className="font-bold leading-tight"
              >
                {restaurant.name || 'اسم المطعم'}
              </h1>
              {restaurant.description && (
                <p className="text-sm opacity-80 mt-1">
                  {restaurant.description}
                </p>
              )}
              {restaurant.phone && (
                <p className="text-sm opacity-70 mt-1">
                  {restaurant.phone}
                </p>
              )}
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-8">
            {categories.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p>لم يتم إضافة أصناف بعد</p>
                <p className="text-sm">ابدأ بإضافة الأصناف والعناصر لرؤية المنيو</p>
              </div>
            ) : (
              categories.map((category) => (
                <div key={category.id}>
                  <h2 
                    style={{ 
                      fontSize: `${style.fontSize.category}px`,
                      color: style.secondaryColor,
                      borderRadius: `${style.borderRadius}px`
                    }}
                    className="font-bold mb-4 pb-2 border-b"
                    dir="rtl"
                  >
                    {category.name}
                  </h2>
                  
                  {category.items.length === 0 ? (
                    <p className="text-gray-500 text-sm">لا توجد عناصر في هذا الصنف</p>
                  ) : (
                    <div 
                      className={getLayoutClass()}
                      style={{ gap: style.layout !== 'custom' ? `${style.spacing}px` : undefined }}
                    >
                      {category.items.map((item) => {
                        const position = itemPositions[item.id] || { x: 0, y: 0, scale: 1 };
                        const isSelected = selectedItem === item.id;
                        
                        return (
                          <div 
                            key={item.id} 
                            className={`
                              ${style.layout === 'card' ? `border p-4 ${getShadowClass()}` : 
                                style.layout === 'list' ? 'flex items-center justify-between border-b pb-2' : 
                                style.layout === 'custom' ? `absolute border p-3 ${getShadowClass()} cursor-move` :
                                `border p-3 ${getShadowClass()}`}
                              ${isSelected ? 'ring-2 ring-blue-500' : ''}
                              ${style.layout === 'custom' ? 'hover:shadow-xl' : ''}
                              transition-all duration-200 hover:scale-105
                            `}
                            style={{ 
                              borderRadius: `${style.borderRadius}px`,
                              backgroundColor: style.layout !== 'list' ? 'rgba(255,255,255,0.9)' : 'transparent',
                              ...(style.layout === 'custom' ? {
                                transform: `translate(${position.x}px, ${position.y}px) scale(${position.scale})`,
                                zIndex: isSelected ? 10 : 1
                              } : {})
                            }}
                            onClick={() => style.layout === 'custom' && setSelectedItem(isSelected ? null : item.id)}
                            onMouseDown={(e) => style.layout === 'custom' && handleItemDrag(item.id, e)}
                          >
                            {/* Custom Layout Controls */}
                            {style.layout === 'custom' && isSelected && (
                              <div className="absolute -top-8 left-0 flex gap-1 bg-white/90 backdrop-blur-sm rounded-lg p-1 shadow-lg">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleItemScale(item.id, 0.1);
                                  }}
                                  className="bg-blue-500 text-white p-1 rounded text-xs hover:bg-blue-600 transition-colors"
                                >
                                  <ZoomIn className="w-3 h-3" />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleItemScale(item.id, -0.1);
                                  }}
                                  className="bg-blue-500 text-white p-1 rounded text-xs hover:bg-blue-600 transition-colors"
                                >
                                  <ZoomOut className="w-3 h-3" />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    resetItemPosition(item.id);
                                  }}
                                  className="bg-gray-500 text-white p-1 rounded text-xs hover:bg-gray-600 transition-colors"
                                >
                                  <RotateCcw className="w-3 h-3" />
                                </button>
                              </div>
                            )}

                            {style.layout === 'list' ? (
                              <>
                                <div className="flex-1">
                                  <h3 
                                    style={{ 
                                      fontSize: `${style.fontSize.item}px`,
                                      color: style.textColor
                                    }}
                                    className="font-semibold"
                                    dir="rtl"
                                  >
                                    {item.name}
                                  </h3>
                                  {item.description && (
                                    <p className="text-sm opacity-80 mt-1" dir="rtl">
                                      {item.description}
                                    </p>
                                  )}
                                </div>
                                <div className="flex items-center gap-3">
                                  {item.image && (
                                    <img 
                                      src={item.image} 
                                      alt={item.name} 
                                      className="w-12 h-12 object-cover hover:scale-110 transition-transform duration-200"
                                      style={{ borderRadius: `${style.borderRadius}px` }}
                                    />
                                  )}
                                  <span 
                                    style={{ 
                                      fontSize: `${style.fontSize.price}px`,
                                      color: style.accentColor
                                    }}
                                    className="font-bold"
                                  >
                                    {showCurrencyFlag && restaurant.currency.flag} {item.price} {restaurant.currency.symbol}
                                  </span>
                                </div>
                              </>
                            ) : (
                              <>
                                {item.image && (
                                  <img 
                                    src={item.image} 
                                    alt={item.name} 
                                    className="w-full h-32 object-cover mb-3 hover:scale-105 transition-transform duration-200"
                                    style={{ borderRadius: `${style.borderRadius}px` }}
                                  />
                                )}
                                <h3 
                                  style={{ 
                                    fontSize: `${style.fontSize.item}px`,
                                    color: style.textColor
                                  }}
                                  className="font-semibold mb-2"
                                  dir="rtl"
                                >
                                  {item.name}
                                </h3>
                                {item.description && (
                                  <p className="text-sm opacity-80 mb-3" dir="rtl">
                                    {item.description}
                                  </p>
                                )}
                                <div className="flex justify-between items-center">
                                  <span 
                                    style={{ 
                                      fontSize: `${style.fontSize.price}px`,
                                      color: style.accentColor
                                    }}
                                    className="font-bold"
                                  >
                                    {showCurrencyFlag && restaurant.currency.flag} {item.price} {restaurant.currency.symbol}
                                  </span>
                                </div>
                              </>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};