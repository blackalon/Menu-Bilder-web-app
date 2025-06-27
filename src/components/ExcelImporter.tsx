import React, { useRef } from 'react';
import { MenuCategory, MenuItem } from '../types/menu';
import { FileSpreadsheet, Upload, Download } from 'lucide-react';
import * as XLSX from 'xlsx';

interface ExcelImporterProps {
  onImport: (categories: MenuCategory[]) => void;
}

export const ExcelImporter: React.FC<ExcelImporterProps> = ({ onImport }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        const categories = processExcelData(jsonData);
        onImport(categories);
      } catch (error) {
        alert('خطأ في قراءة الملف. تأكد من صحة تنسيق البيانات.');
        console.error('Excel import error:', error);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const processExcelData = (data: any[]): MenuCategory[] => {
    const categoriesMap = new Map<string, MenuItem[]>();

    data.forEach((row: any) => {
      const categoryName = row['الصنف'] || row['Category'] || 'غير محدد';
      const itemName = row['اسم العنصر'] || row['Item Name'] || '';
      const description = row['الوصف'] || row['Description'] || '';
      const price = parseFloat(row['السعر'] || row['Price'] || '0');
      const image = row['الصورة'] || row['Image'] || '';

      if (!itemName) return;

      const item: MenuItem = {
        id: Date.now().toString() + Math.random(),
        name: itemName,
        description,
        price,
        image: image || undefined
      };

      if (!categoriesMap.has(categoryName)) {
        categoriesMap.set(categoryName, []);
      }
      categoriesMap.get(categoryName)!.push(item);
    });

    return Array.from(categoriesMap.entries()).map(([name, items]) => ({
      id: Date.now().toString() + Math.random(),
      name,
      items
    }));
  };

  const downloadTemplate = () => {
    const templateData = [
      {
        'الصنف': 'مشروبات ساخنة',
        'اسم العنصر': 'قهوة عربية',
        'الوصف': 'قهوة عربية أصيلة بالهيل',
        'السعر': 15,
        'الصورة': ''
      },
      {
        'الصنف': 'مشروبات ساخنة',
        'اسم العنصر': 'شاي أحمر',
        'الوصف': 'شاي أحمر طبيعي',
        'السعر': 10,
        'الصورة': ''
      },
      {
        'الصنف': 'وجبات رئيسية',
        'اسم العنصر': 'برجر لحم',
        'الوصف': 'برجر لحم طازج مع الخضار',
        'السعر': 35,
        'الصورة': ''
      }
    ];

    const ws = XLSX.utils.json_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'قالب المنيو');
    XLSX.writeFile(wb, 'قالب_المنيو.xlsx');
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
        <FileSpreadsheet className="w-5 h-5 text-green-500" />
        استيراد من Excel
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-600 mb-4">
            يمكنك استيراد بيانات المنيو من ملف Excel. تأكد من أن الملف يحتوي على الأعمدة التالية:
          </p>
          <ul className="text-xs text-gray-500 mb-4 space-y-1">
            <li>• الصنف (Category)</li>
            <li>• اسم العنصر (Item Name)</li>
            <li>• الوصف (Description)</li>
            <li>• السعر (Price)</li>
            <li>• الصورة (Image) - اختياري</li>
          </ul>
          
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileUpload}
            className="hidden"
          />
          
          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2 w-full justify-center"
          >
            <Upload className="w-4 h-4" />
            اختر ملف Excel
          </button>
        </div>

        <div>
          <p className="text-sm text-gray-600 mb-4">
            لا تملك ملف Excel؟ يمكنك تحميل قالب جاهز وتعبئته:
          </p>
          
          <button
            onClick={downloadTemplate}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 w-full justify-center"
          >
            <Download className="w-4 h-4" />
            تحميل قالب Excel
          </button>
        </div>
      </div>
    </div>
  );
};