import React from 'react';
import { MenuProject } from '../types/menu';

interface MenuPreviewProps {
  project: MenuProject;
  showCurrencyFlag: boolean;
}

export const MenuPreview: React.FC<MenuPreviewProps> = ({ project, showCurrencyFlag }) => {
  const { restaurant, categories, style } = project;

  const getGridClass = () => {
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

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
      <div className="sticky top-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-3 z-10">
        <h3 className="font-semibold">معاينة المنيو المباشرة</h3>
      </div>
      
      <div 
        className="p-6 min-h-96 max-h-96 overflow-y-auto relative"
        style={{ 
          backgroundColor: style.backgroundColor,
          color: style.textColor,
          fontFamily: style.fontFamily
        }}
      >
        {/* Background Image/Video */}
        {style.backgroundImage && (
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: `url(${style.backgroundImage})`,
              opacity: style.backgroundOpacity / 100
            }}
          />
        )}
        {style.backgroundVideo && (
          <video
            className="absolute inset-0 w-full h-full object-cover"
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
                className="w-16 h-16 object-contain rounded-lg mr-4 shadow-md"
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
                      style={{ gap: `${style.spacing}px` }}
                    >
                      {category.items.map((item) => (
                        <div 
                          key={item.id} 
                          className={`
                            ${style.layout === 'card' ? `border p-4 ${getShadowClass()}` : 
                              style.layout === 'list' ? 'flex items-center justify-between border-b pb-2' : 
                              `border p-3 ${getShadowClass()}`}
                          `}
                          style={{ 
                            borderRadius: `${style.borderRadius}px`,
                            backgroundColor: style.layout !== 'list' ? 'rgba(255,255,255,0.9)' : 'transparent'
                          }}
                        >
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
                                    className="w-12 h-12 object-cover"
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
                                  className="w-full h-32 object-cover mb-3"
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
                      ))}
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