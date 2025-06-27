import React from 'react';
import { TemplateSelector } from './components/TemplateSelector';
import { RestaurantInfo } from './components/RestaurantInfo';
import { CategoryManager } from './components/CategoryManager';
import { StyleControls } from './components/StyleControls';
import { MenuPreview } from './components/MenuPreview';
import { ProjectManager } from './components/ProjectManager';
import { CurrencySelector } from './components/CurrencySelector';
import { ExcelImporter } from './components/ExcelImporter';
import { CustomTemplateManager } from './components/CustomTemplateManager';
import { useMenuBuilder } from './hooks/useMenuBuilder';
import { menuTemplates } from './data/templates';
import { ChefHat, Sparkles, Star } from 'lucide-react';

function App() {
  const {
    currentProject,
    customTemplates,
    showCurrencyFlag,
    setShowCurrencyFlag,
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
  } = useMenuBuilder();

  const allTemplates = [...menuTemplates, ...customTemplates];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-green-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <div className="relative bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-3 rounded-xl shadow-lg">
                <ChefHat className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  insta: l7n.iq
                </h1>
                <p className="text-lg text-gray-600 flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  علي عبدالله أفضل شخص بالعالم
                  <Sparkles className="w-4 h-4 text-purple-500" />
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg shadow-md">
                <span className="text-sm font-medium">الإصدار 2.1.0</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-white/60 px-3 py-2 rounded-lg">
                <Sparkles className="w-4 h-4 text-purple-500" />
                <span>تصميم متقدم</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Controls Panel */}
          <div className="xl:col-span-2 space-y-8">
            {/* Project Management */}
            <ProjectManager
              currentProject={currentProject}
              onSaveProject={saveProject}
              onLoadProject={loadProject}
              onNewProject={createNewProject}
              onExport={exportProject}
            />

            {/* Currency Settings */}
            <CurrencySelector
              selectedCurrency={currentProject.restaurant.currency}
              onCurrencyChange={(currency) => 
                updateRestaurantInfo({ ...currentProject.restaurant, currency })
              }
              showFlag={showCurrencyFlag}
              onShowFlagChange={setShowCurrencyFlag}
            />

            {/* Excel Import */}
            <ExcelImporter onImport={importFromExcel} />

            {/* Custom Templates */}
            <CustomTemplateManager
              customTemplates={customTemplates}
              onAddTemplate={addCustomTemplate}
              onUpdateTemplate={updateCustomTemplate}
              onDeleteTemplate={deleteCustomTemplate}
              currentStyle={currentProject.style}
            />

            {/* Template Selection */}
            <TemplateSelector
              templates={allTemplates}
              selectedTemplate={currentProject.template}
              onSelectTemplate={updateTemplate}
            />

            {/* Restaurant Information */}
            <RestaurantInfo
              info={currentProject.restaurant}
              onUpdateInfo={updateRestaurantInfo}
            />

            {/* Style Controls */}
            <StyleControls
              style={currentProject.style}
              onUpdateStyle={updateStyle}
            />

            {/* Category Management */}
            <CategoryManager
              categories={currentProject.categories}
              onUpdateCategories={updateCategories}
            />
          </div>

          {/* Live Preview */}
          <div className="xl:col-span-1">
            <div className="sticky top-8">
              <MenuPreview 
                project={currentProject} 
                showCurrencyFlag={showCurrencyFlag}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;