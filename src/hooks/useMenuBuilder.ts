import { useState, useCallback } from 'react';
import { MenuProject, MenuTemplate, RestaurantInfo, MenuCategory, MenuStyle, Currency } from '../types/menu';
import { menuTemplates } from '../data/templates';
import { defaultCurrency } from '../data/currencies';

export const useMenuBuilder = () => {
  const [customTemplates, setCustomTemplates] = useState<MenuTemplate[]>([]);
  const [showCurrencyFlag, setShowCurrencyFlag] = useState(true);
  
  const [currentProject, setCurrentProject] = useState<MenuProject>({
    id: Date.now().toString(),
    name: '',
    restaurant: {
      name: '',
      description: '',
      logoPosition: 'top-center',
      currency: defaultCurrency
    },
    template: menuTemplates[0],
    categories: [],
    style: {
      ...menuTemplates[0].style,
      backgroundOpacity: 100,
      borderRadius: 8,
      spacing: 16,
      shadowIntensity: 2,
      effects: { blur: false, glow: false }
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    hasCart: false
  });

  const updateRestaurantInfo = useCallback((info: RestaurantInfo) => {
    setCurrentProject(prev => ({
      ...prev,
      restaurant: info,
      updatedAt: new Date()
    }));
  }, []);

  const updateTemplate = useCallback((template: MenuTemplate) => {
    setCurrentProject(prev => ({
      ...prev,
      template,
      style: { 
        ...template.style, 
        backgroundOpacity: 100, 
        borderRadius: 8, 
        spacing: 16, 
        shadowIntensity: 2,
        effects: { blur: false, glow: false }
      },
      updatedAt: new Date()
    }));
  }, []);

  const updateCategories = useCallback((categories: MenuCategory[]) => {
    setCurrentProject(prev => ({
      ...prev,
      categories,
      updatedAt: new Date()
    }));
  }, []);

  const updateStyle = useCallback((style: MenuStyle) => {
    setCurrentProject(prev => ({
      ...prev,
      style,
      updatedAt: new Date()
    }));
  }, []);

  const saveProject = useCallback((project: MenuProject) => {
    setCurrentProject(project);
  }, []);

  const loadProject = useCallback((project: MenuProject) => {
    setCurrentProject(project);
  }, []);

  const createNewProject = useCallback(() => {
    setCurrentProject({
      id: Date.now().toString(),
      name: '',
      restaurant: {
        name: '',
        description: '',
        logoPosition: 'top-center',
        currency: defaultCurrency
      },
      template: menuTemplates[0],
      categories: [],
      style: {
        ...menuTemplates[0].style,
        backgroundOpacity: 100,
        borderRadius: 8,
        spacing: 16,
        shadowIntensity: 2,
        effects: { blur: false, glow: false }
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      hasCart: false
    });
  }, []);

  const addCustomTemplate = useCallback((template: MenuTemplate) => {
    setCustomTemplates(prev => [...prev, template]);
  }, []);

  const updateCustomTemplate = useCallback((template: MenuTemplate) => {
    setCustomTemplates(prev => prev.map(t => t.id === template.id ? template : t));
  }, []);

  const deleteCustomTemplate = useCallback((templateId: string) => {
    setCustomTemplates(prev => prev.filter(t => t.id !== templateId));
  }, []);

  const importFromExcel = useCallback((categories: MenuCategory[]) => {
    setCurrentProject(prev => ({
      ...prev,
      categories,
      updatedAt: new Date()
    }));
  }, []);

  const exportProject = useCallback(async (format: 'pdf' | 'html' | 'png') => {
    switch (format) {
      case 'pdf':
        await exportToPDF(currentProject, showCurrencyFlag);
        break;
      case 'html':
        const htmlContent = generateHTML(currentProject, showCurrencyFlag);
        downloadFile(htmlContent, `${currentProject.name || 'menu'}.html`, 'text/html');
        break;
      case 'png':
        await exportToPNG(currentProject, showCurrencyFlag);
        break;
      default:
        break;
    }
  }, [currentProject, showCurrencyFlag]);

  return {
    currentProject,
    customTemplates,
    showCurrencyFlag,
    setShowCurrencyFlag,
    setCurrentProject,
    updateRestaurantInfo,
    updateTemplate,
    updateCategories,
    updateStyle,
    saveProject,
    loadProject,
    createNewProject,
    addCustomTemplate,
    updateCustomTemplate,
    deleteCustomTemplate,
    importFromExcel,
    exportProject
  };
};

const generateHTML = (project: MenuProject, showCurrencyFlag: boolean): string => {
  const { restaurant, categories, style } = project;
  
  return `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${restaurant.name}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: ${style.fontFamily}, sans-serif;
            background-color: ${style.backgroundColor};
            color: ${style.textColor};
            padding: 20px;
            line-height: 1.6;
            ${style.backgroundImage ? `background-image: url(${style.backgroundImage}); background-size: cover; background-position: center;` : ''}
        }
        .container { max-width: 1200px; margin: 0 auto; }
        .header {
            text-align: ${restaurant.logoPosition.includes('center') ? 'center' : 
                        restaurant.logoPosition.includes('right') ? 'right' : 'left'};
            margin-bottom: 30px;
        }
        .logo { width: 80px; height: 80px; object-fit: contain; border-radius: ${style.borderRadius}px; }
        .restaurant-name {
            font-size: ${style.fontSize.title}px;
            color: ${style.primaryColor};
            font-weight: bold;
            margin: 10px 0;
        }
        .category {
            margin-bottom: 40px;
        }
        .category-title {
            font-size: ${style.fontSize.category}px;
            color: ${style.secondaryColor};
            font-weight: bold;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid ${style.secondaryColor};
            border-radius: ${style.borderRadius}px;
        }
        .items {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: ${style.spacing}px;
        }
        .item {
            border: 1px solid #ddd;
            border-radius: ${style.borderRadius}px;
            padding: 15px;
            background: rgba(255,255,255,0.9);
            box-shadow: 0 ${style.shadowIntensity}px ${style.shadowIntensity * 2}px rgba(0,0,0,0.1);
            transition: transform 0.2s ease;
        }
        .item:hover {
            transform: translateY(-2px);
            box-shadow: 0 ${style.shadowIntensity + 2}px ${(style.shadowIntensity + 2) * 2}px rgba(0,0,0,0.15);
        }
        .item-image {
            width: 100%;
            height: 150px;
            object-fit: cover;
            border-radius: ${style.borderRadius}px;
            margin-bottom: 10px;
        }
        .item-name {
            font-size: ${style.fontSize.item}px;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .item-description {
            font-size: 14px;
            opacity: 0.8;
            margin-bottom: 10px;
        }
        .item-price {
            font-size: ${style.fontSize.price}px;
            color: ${style.accentColor};
            font-weight: bold;
        }
        ${style.effects?.blur ? '.item { backdrop-filter: blur(4px); }' : ''}
        ${style.effects?.glow ? '.item { filter: drop-shadow(0 0 8px rgba(0,0,0,0.3)); }' : ''}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            ${restaurant.logo ? `<img src="${restaurant.logo}" alt="Logo" class="logo">` : ''}
            <h1 class="restaurant-name">${restaurant.name}</h1>
            ${restaurant.description ? `<p>${restaurant.description}</p>` : ''}
            ${restaurant.phone ? `<p>${restaurant.phone}</p>` : ''}
        </div>

        ${categories.map(category => `
            <div class="category">
                <h2 class="category-title">${category.name}</h2>
                <div class="items">
                    ${category.items.map(item => `
                        <div class="item">
                            ${item.image ? `<img src="${item.image}" alt="${item.name}" class="item-image">` : ''}
                            <h3 class="item-name">${item.name}</h3>
                            ${item.description ? `<p class="item-description">${item.description}</p>` : ''}
                            <p class="item-price">${showCurrencyFlag && restaurant.currency.flag ? restaurant.currency.flag + ' ' : ''}${item.price} ${restaurant.currency.symbol}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('')}
    </div>
</body>
</html>
  `;
};

const exportToPDF = async (project: MenuProject, showCurrencyFlag: boolean) => {
  try {
    // Create a temporary HTML element
    const htmlContent = generateHTML(project, showCurrencyFlag);
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 1000);
    }
  } catch (error) {
    console.error('Error exporting to PDF:', error);
    alert('حدث خطأ أثناء تصدير PDF. يرجى المحاولة مرة أخرى.');
  }
};

const exportToPNG = async (project: MenuProject, showCurrencyFlag: boolean) => {
  try {
    // Create a canvas element
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 1200;

    // Fill background
    ctx.fillStyle = project.style.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add restaurant name
    ctx.fillStyle = project.style.primaryColor;
    ctx.font = `bold ${project.style.fontSize.title}px ${project.style.fontFamily}`;
    ctx.textAlign = 'center';
    ctx.fillText(project.restaurant.name || 'اسم المطعم', canvas.width / 2, 80);

    // Add categories and items
    let yPosition = 150;
    project.categories.forEach(category => {
      // Category title
      ctx.fillStyle = project.style.secondaryColor;
      ctx.font = `bold ${project.style.fontSize.category}px ${project.style.fontFamily}`;
      ctx.fillText(category.name, canvas.width / 2, yPosition);
      yPosition += 50;

      // Items
      category.items.forEach(item => {
        ctx.fillStyle = project.style.textColor;
        ctx.font = `${project.style.fontSize.item}px ${project.style.fontFamily}`;
        ctx.fillText(item.name, canvas.width / 2, yPosition);
        yPosition += 30;

        if (item.description) {
          ctx.font = `14px ${project.style.fontFamily}`;
          ctx.fillText(item.description, canvas.width / 2, yPosition);
          yPosition += 25;
        }

        ctx.fillStyle = project.style.accentColor;
        ctx.font = `bold ${project.style.fontSize.price}px ${project.style.fontFamily}`;
        const priceText = `${showCurrencyFlag && project.restaurant.currency.flag ? project.restaurant.currency.flag + ' ' : ''}${item.price} ${project.restaurant.currency.symbol}`;
        ctx.fillText(priceText, canvas.width / 2, yPosition);
        yPosition += 40;
      });
      yPosition += 20;
    });

    // Download the image
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${project.name || 'menu'}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    });
  } catch (error) {
    console.error('Error exporting to PNG:', error);
    alert('حدث خطأ أثناء تصدير PNG. يرجى المحاولة مرة أخرى.');
  }
};

const downloadFile = (content: string, filename: string, contentType: string) => {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};