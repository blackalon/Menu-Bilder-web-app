import { MenuTemplate } from '../types/menu';

export const menuTemplates: MenuTemplate[] = [
  {
    id: 'modern-minimal',
    name: 'Modern Minimal',
    description: 'تصميم عصري ونظيف مثالي للمطاعم الراقية',
    preview: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
    layout: 'modern',
    style: {
      primaryColor: '#1F2937',
      secondaryColor: '#3B82F6',
      accentColor: '#F59E0B',
      backgroundColor: '#FFFFFF',
      textColor: '#111827',
      fontFamily: 'Inter',
      fontSize: {
        title: 32,
        category: 24,
        item: 18,
        price: 16
      },
      layout: 'grid',
      itemsPerRow: 2,
      backgroundOpacity: 100,
      borderRadius: 8,
      spacing: 16,
      shadowIntensity: 2
    }
  },
  {
    id: 'classic-elegant',
    name: 'Classic Elegant',
    description: 'تصميم كلاسيكي أنيق للمطاعم الفاخرة',
    preview: 'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=400',
    layout: 'classic',
    style: {
      primaryColor: '#7C2D12',
      secondaryColor: '#DC2626',
      accentColor: '#D97706',
      backgroundColor: '#FEF7ED',
      textColor: '#1C1917',
      fontFamily: 'Georgia',
      fontSize: {
        title: 36,
        category: 28,
        item: 16,
        price: 18
      },
      layout: 'card',
      itemsPerRow: 1,
      backgroundOpacity: 100,
      borderRadius: 12,
      spacing: 20,
      shadowIntensity: 4
    }
  },
  {
    id: 'cafe-cozy',
    name: 'Cafe Cozy',
    description: 'تصميم دافئ ومريح مثالي للمقاهي',
    preview: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400',
    layout: 'rustic',
    style: {
      primaryColor: '#92400E',
      secondaryColor: '#059669',
      accentColor: '#DC2626',
      backgroundColor: '#FFFBEB',
      textColor: '#78350F',
      fontFamily: 'Inter',
      fontSize: {
        title: 28,
        category: 22,
        item: 16,
        price: 16
      },
      layout: 'grid',
      itemsPerRow: 3,
      backgroundOpacity: 100,
      borderRadius: 10,
      spacing: 12,
      shadowIntensity: 3
    }
  },
  {
    id: 'fast-food-vibrant',
    name: 'Fast Food Vibrant',
    description: 'تصميم جريء وملون مثالي للوجبات السريعة',
    preview: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=400',
    layout: 'contemporary',
    style: {
      primaryColor: '#DC2626',
      secondaryColor: '#F59E0B',
      accentColor: '#10B981',
      backgroundColor: '#FEF2F2',
      textColor: '#1F2937',
      fontFamily: 'Inter',
      fontSize: {
        title: 30,
        category: 20,
        item: 16,
        price: 18
      },
      layout: 'grid',
      itemsPerRow: 4,
      backgroundOpacity: 100,
      borderRadius: 6,
      spacing: 14,
      shadowIntensity: 1
    }
  },
  {
    id: 'pizza-italian',
    name: 'Pizza Italian',
    description: 'تصميم متوسطي للبيتزا والمطاعم الإيطالية',
    preview: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400',
    layout: 'vintage',
    style: {
      primaryColor: '#DC2626',
      secondaryColor: '#059669',
      accentColor: '#FFFFFF',
      backgroundColor: '#FEF7ED',
      textColor: '#1C1917',
      fontFamily: 'Georgia',
      fontSize: {
        title: 34,
        category: 26,
        item: 17,
        price: 17
      },
      layout: 'list',
      itemsPerRow: 1,
      backgroundOpacity: 100,
      borderRadius: 8,
      spacing: 18,
      shadowIntensity: 2
    }
  },
  {
    id: 'sushi-zen',
    name: 'Sushi Zen',
    description: 'تصميم ياباني بسيط للسوشي والمأكولات الآسيوية',
    preview: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=400',
    layout: 'minimal',
    style: {
      primaryColor: '#1F2937',
      secondaryColor: '#6B7280',
      accentColor: '#DC2626',
      backgroundColor: '#F9FAFB',
      textColor: '#111827',
      fontFamily: 'Inter',
      fontSize: {
        title: 28,
        category: 20,
        item: 15,
        price: 15
      },
      layout: 'card',
      itemsPerRow: 2,
      backgroundOpacity: 100,
      borderRadius: 4,
      spacing: 10,
      shadowIntensity: 1
    }
  },
  {
    id: 'bakery-sweet',
    name: 'Bakery Sweet',
    description: 'تصميم حلو ودافئ مثالي للمخابز ومحلات الحلويات',
    preview: 'https://images.pexels.com/photos/1854652/pexels-photo-1854652.jpeg?auto=compress&cs=tinysrgb&w=400',
    layout: 'artistic',
    style: {
      primaryColor: '#BE185D',
      secondaryColor: '#F59E0B',
      accentColor: '#10B981',
      backgroundColor: '#FDF2F8',
      textColor: '#831843',
      fontFamily: 'Inter',
      fontSize: {
        title: 32,
        category: 24,
        item: 16,
        price: 16
      },
      layout: 'grid',
      itemsPerRow: 3,
      backgroundOpacity: 100,
      borderRadius: 16,
      spacing: 16,
      shadowIntensity: 3
    }
  },
  {
    id: 'steakhouse-premium',
    name: 'Steakhouse Premium',
    description: 'تصميم فاخر ومتطور لمطاعم الستيك الراقية',
    preview: 'https://images.pexels.com/photos/361184/asparagus-steak-veal-steak-veal-361184.jpeg?auto=compress&cs=tinysrgb&w=400',
    layout: 'premium',
    style: {
      primaryColor: '#000000',
      secondaryColor: '#D97706',
      accentColor: '#FFFFFF',
      backgroundColor: '#1F2937',
      textColor: '#F9FAFB',
      fontFamily: 'Georgia',
      fontSize: {
        title: 38,
        category: 30,
        item: 18,
        price: 20
      },
      layout: 'card',
      itemsPerRow: 1,
      backgroundOpacity: 100,
      borderRadius: 12,
      spacing: 24,
      shadowIntensity: 5
    }
  },
  {
    id: 'food-truck-fun',
    name: 'Food Truck Fun',
    description: 'تصميم مرح وحيوي مثالي لعربات الطعام',
    preview: 'https://images.pexels.com/photos/1199960/pexels-photo-1199960.jpeg?auto=compress&cs=tinysrgb&w=400',
    layout: 'digital',
    style: {
      primaryColor: '#7C3AED',
      secondaryColor: '#F59E0B',
      accentColor: '#DC2626',
      backgroundColor: '#F3F4F6',
      textColor: '#1F2937',
      fontFamily: 'Inter',
      fontSize: {
        title: 30,
        category: 22,
        item: 16,
        price: 18
      },
      layout: 'grid',
      itemsPerRow: 4,
      backgroundOpacity: 100,
      borderRadius: 8,
      spacing: 12,
      shadowIntensity: 2
    }
  },
  {
    id: 'bar-cocktails',
    name: 'Bar Cocktails',
    description: 'تصميم أنيق وعصري للبارات وصالات الكوكتيل',
    preview: 'https://images.pexels.com/photos/2702674/pexels-photo-2702674.jpeg?auto=compress&cs=tinysrgb&w=400',
    layout: 'elegant',
    style: {
      primaryColor: '#1E293B',
      secondaryColor: '#0EA5E9',
      accentColor: '#F59E0B',
      backgroundColor: '#0F172A',
      textColor: '#E2E8F0',
      fontFamily: 'Inter',
      fontSize: {
        title: 34,
        category: 26,
        item: 17,
        price: 19
      },
      layout: 'list',
      itemsPerRow: 1,
      backgroundOpacity: 100,
      borderRadius: 6,
      spacing: 16,
      shadowIntensity: 4
    }
  }
];