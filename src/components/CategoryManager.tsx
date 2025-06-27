import React, { useState } from 'react';
import { MenuCategory, MenuItem } from '../types/menu';
import { predefinedCategories } from '../data/categories';
import { Plus, Edit2, Trash2, Upload, Image as ImageIcon, Play, ChevronDown, Save, X } from 'lucide-react';

interface CategoryManagerProps {
  categories: MenuCategory[];
  onUpdateCategories: (categories: MenuCategory[]) => void;
}

export const CategoryManager: React.FC<CategoryManagerProps> = ({
  categories,
  onUpdateCategories
}) => {
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newItem, setNewItem] = useState<Partial<MenuItem>>({});
  const [showPredefined, setShowPredefined] = useState(false);
  const [editItemData, setEditItemData] = useState<Partial<MenuItem>>({});

  const addCategory = (categoryName?: string) => {
    const name = categoryName || newCategoryName;
    if (!name.trim()) return;
    
    const newCategory: MenuCategory = {
      id: Date.now().toString(),
      name: name,
      items: []
    };
    
    onUpdateCategories([...categories, newCategory]);
    setNewCategoryName('');
    setShowPredefined(false);
  };

  const updateCategory = (categoryId: string, updates: Partial<MenuCategory>) => {
    const updatedCategories = categories.map(cat =>
      cat.id === categoryId ? { ...cat, ...updates } : cat
    );
    onUpdateCategories(updatedCategories);
  };

  const deleteCategory = (categoryId: string) => {
    const updatedCategories = categories.filter(cat => cat.id !== categoryId);
    onUpdateCategories(updatedCategories);
  };

  const addItem = (categoryId: string) => {
    if (!newItem.name || !newItem.price) return;

    const item: MenuItem = {
      id: Date.now().toString(),
      name: newItem.name,
      description: newItem.description || '',
      price: newItem.price,
      image: newItem.image,
      video: newItem.video,
      icon: newItem.icon
    };

    const updatedCategories = categories.map(cat =>
      cat.id === categoryId
        ? { ...cat, items: [...cat.items, item] }
        : cat
    );
    
    onUpdateCategories(updatedCategories);
    setNewItem({});
    setEditingCategory(null);
  };

  const startEditItem = (categoryId: string, item: MenuItem) => {
    setEditingItem(item.id);
    setEditItemData({ ...item });
  };

  const saveEditItem = (categoryId: string, itemId: string) => {
    const updatedCategories = categories.map(cat =>
      cat.id === categoryId
        ? {
            ...cat,
            items: cat.items.map(item =>
              item.id === itemId ? { ...item, ...editItemData } : item
            )
          }
        : cat
    );
    onUpdateCategories(updatedCategories);
    setEditingItem(null);
    setEditItemData({});
  };

  const cancelEditItem = () => {
    setEditingItem(null);
    setEditItemData({});
  };

  const deleteItem = (categoryId: string, itemId: string) => {
    const updatedCategories = categories.map(cat =>
      cat.id === categoryId
        ? { ...cat, items: cat.items.filter(item => item.id !== itemId) }
        : cat
    );
    onUpdateCategories(updatedCategories);
  };

  const handleImageUpload = (file: File, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.onload = (e) => callback(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, callback: (url: string) => void) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const file = files[0];
    if (file && (file.type.startsWith('image/') || file.type.startsWith('video/'))) {
      handleImageUpload(file, callback);
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-100 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">إدارة الأصناف والعناصر</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="اسم الصنف الجديد"
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
              dir="rtl"
            />
            <button
              onClick={() => setShowPredefined(!showPredefined)}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
            
            {showPredefined && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white/95 backdrop-blur-sm border border-gray-300 rounded-lg shadow-xl z-10 max-h-48 overflow-y-auto">
                {predefinedCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => addCategory(category)}
                    className="w-full text-right px-3 py-2 hover:bg-gray-100 text-sm transition-colors"
                    dir="rtl"
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={() => addCategory()}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            إضافة صنف
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {categories.map((category) => (
          <div key={category.id} className="border border-gray-200 rounded-xl p-6 bg-gradient-to-br from-gray-50/80 to-white/80 backdrop-blur-sm shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditingCategory(editingCategory === category.id ? null : category.id)}
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-lg text-sm hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center gap-1 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  <Plus className="w-3 h-3" />
                  إضافة عنصر
                </button>
                <button
                  onClick={() => deleteCategory(category.id)}
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-lg text-sm hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>

            {editingCategory === category.id && (
              <div className="bg-gradient-to-br from-blue-50/80 to-indigo-50/80 backdrop-blur-sm p-4 rounded-xl mb-4 border border-blue-100">
                <h4 className="font-medium mb-3 text-blue-800">إضافة عنصر جديد</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="اسم العنصر"
                    value={newItem.name || ''}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
                    dir="rtl"
                  />
                  <input
                    type="number"
                    placeholder="السعر"
                    value={newItem.price || ''}
                    onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
                  />
                  <textarea
                    placeholder="الوصف"
                    value={newItem.description || ''}
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm md:col-span-2 focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
                    rows={2}
                    dir="rtl"
                  />
                  <div className="flex gap-2">
                    <div
                      className="cursor-pointer bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center gap-1 shadow-md border-2 border-dashed border-transparent hover:border-blue-300 transform hover:scale-105"
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, (url) => setNewItem({ ...newItem, image: url }))}
                    >
                      <label className="cursor-pointer flex items-center gap-1">
                        <ImageIcon className="w-3 h-3" />
                        صورة
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleImageUpload(file, (url) => setNewItem({ ...newItem, image: url }));
                            }
                          }}
                          className="hidden"
                        />
                      </label>
                    </div>
                    <div
                      className="cursor-pointer bg-gradient-to-r from-purple-500 to-purple-600 text-white px-3 py-2 rounded-lg text-sm hover:from-purple-600 hover:to-purple-700 transition-all duration-200 flex items-center gap-1 shadow-md border-2 border-dashed border-transparent hover:border-purple-300 transform hover:scale-105"
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, (url) => setNewItem({ ...newItem, video: url }))}
                    >
                      <label className="cursor-pointer flex items-center gap-1">
                        <Play className="w-3 h-3" />
                        فيديو
                        <input
                          type="file"
                          accept="video/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleImageUpload(file, (url) => setNewItem({ ...newItem, video: url }));
                            }
                          }}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => addItem(category.id)}
                      className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg text-sm hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md transform hover:scale-105"
                    >
                      إضافة
                    </button>
                    <button
                      onClick={() => setEditingCategory(null)}
                      className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-4 py-2 rounded-lg text-sm hover:from-gray-600 hover:to-gray-700 transition-all duration-200 shadow-md transform hover:scale-105"
                    >
                      إلغاء
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {category.items.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-xl p-4 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-[1.02]">
                  {editingItem === item.id ? (
                    // Edit Mode
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={editItemData.name || ''}
                        onChange={(e) => setEditItemData({ ...editItemData, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="اسم العنصر"
                        dir="rtl"
                      />
                      <textarea
                        value={editItemData.description || ''}
                        onChange={(e) => setEditItemData({ ...editItemData, description: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="الوصف"
                        rows={2}
                        dir="rtl"
                      />
                      <input
                        type="number"
                        value={editItemData.price || ''}
                        onChange={(e) => setEditItemData({ ...editItemData, price: parseFloat(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="السعر"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => saveEditItem(category.id, item.id)}
                          className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-lg text-sm hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center gap-1 shadow-md"
                        >
                          <Save className="w-3 h-3" />
                          حفظ
                        </button>
                        <button
                          onClick={cancelEditItem}
                          className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-3 py-1 rounded-lg text-sm hover:from-gray-600 hover:to-gray-700 transition-all duration-200 flex items-center gap-1 shadow-md"
                        >
                          <X className="w-3 h-3" />
                          إلغاء
                        </button>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">{item.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                        <p className="text-lg font-bold text-blue-600 mt-2">{item.price} ر.س</p>
                      </div>
                      {item.image && (
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg ml-3 shadow-sm" />
                      )}
                      <div className="flex flex-col gap-1 mr-2">
                        <button
                          onClick={() => startEditItem(category.id, item)}
                          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-1 rounded-lg text-xs hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-sm transform hover:scale-110"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => deleteItem(category.id, item.id)}
                          className="bg-gradient-to-r from-red-500 to-red-600 text-white p-1 rounded-lg text-xs hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-sm transform hover:scale-110"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};