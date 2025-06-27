import React, { useState, useEffect } from 'react';
import { MenuProject } from '../types/menu';
import { Save, FolderOpen, Download, Trash2, Plus } from 'lucide-react';

interface ProjectManagerProps {
  currentProject: MenuProject;
  onSaveProject: (project: MenuProject) => void;
  onLoadProject: (project: MenuProject) => void;
  onNewProject: () => void;
  onExport: (format: 'pdf' | 'html' | 'png') => void;
}

export const ProjectManager: React.FC<ProjectManagerProps> = ({
  currentProject,
  onSaveProject,
  onLoadProject,
  onNewProject,
  onExport
}) => {
  const [savedProjects, setSavedProjects] = useState<MenuProject[]>([]);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [projectName, setProjectName] = useState('');

  useEffect(() => {
    loadSavedProjects();
  }, []);

  const loadSavedProjects = () => {
    const saved = localStorage.getItem('menuBuilderProjects');
    if (saved) {
      setSavedProjects(JSON.parse(saved));
    }
  };

  const saveProject = () => {
    if (!projectName.trim()) return;

    const updatedProject = {
      ...currentProject,
      name: projectName,
      updatedAt: new Date()
    };

    const existingIndex = savedProjects.findIndex(p => p.id === currentProject.id);
    let updatedProjects;

    if (existingIndex >= 0) {
      updatedProjects = [...savedProjects];
      updatedProjects[existingIndex] = updatedProject;
    } else {
      updatedProjects = [...savedProjects, updatedProject];
    }

    setSavedProjects(updatedProjects);
    localStorage.setItem('menuBuilderProjects', JSON.stringify(updatedProjects));
    onSaveProject(updatedProject);
    setShowSaveDialog(false);
    setProjectName('');
  };

  const deleteProject = (projectId: string) => {
    const updatedProjects = savedProjects.filter(p => p.id !== projectId);
    setSavedProjects(updatedProjects);
    localStorage.setItem('menuBuilderProjects', JSON.stringify(updatedProjects));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">إدارة المشاريع</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={onNewProject}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            مشروع جديد
          </button>
          <button
            onClick={() => {
              setProjectName(currentProject.name || '');
              setShowSaveDialog(true);
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            حفظ المشروع
          </button>
        </div>
      </div>

      {/* Export Options */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2 text-gray-700">تصدير المنيو</h3>
        <div className="flex gap-2">
          <button
            onClick={() => onExport('pdf')}
            className="bg-red-500 text-white px-3 py-2 rounded text-sm hover:bg-red-600 transition-colors flex items-center gap-1"
          >
            <Download className="w-3 h-3" />
            PDF
          </button>
          <button
            onClick={() => onExport('html')}
            className="bg-orange-500 text-white px-3 py-2 rounded text-sm hover:bg-orange-600 transition-colors flex items-center gap-1"
          >
            <Download className="w-3 h-3" />
            HTML
          </button>
          <button
            onClick={() => onExport('png')}
            className="bg-purple-500 text-white px-3 py-2 rounded text-sm hover:bg-purple-600 transition-colors flex items-center gap-1"
          >
            <Download className="w-3 h-3" />
            PNG
          </button>
        </div>
      </div>

      {/* Saved Projects */}
      <div>
        <h3 className="font-semibold mb-3 text-gray-700 flex items-center gap-2">
          <FolderOpen className="w-4 h-4" />
          المشاريع المحفوظة
        </h3>
        {savedProjects.length === 0 ? (
          <p className="text-gray-500 text-sm">لا توجد مشاريع محفوظة</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {savedProjects.map((project) => (
              <div key={project.id} className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">{project.name}</h4>
                    <p className="text-xs text-gray-600">{project.restaurant.name}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      آخر تحديث: {new Date(project.updatedAt).toLocaleDateString('ar-SA')}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => onLoadProject(project)}
                      className="bg-blue-500 text-white p-1 rounded text-xs hover:bg-blue-600 transition-colors"
                      title="تحميل المشروع"
                    >
                      <FolderOpen className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => deleteProject(project.id)}
                      className="bg-red-500 text-white p-1 rounded text-xs hover:bg-red-600 transition-colors"
                      title="حذف المشروع"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Save Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">حفظ المشروع</h3>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="اسم المشروع"
              className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
              dir="rtl"
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowSaveDialog(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
              >
                إلغاء
              </button>
              <button
                onClick={saveProject}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                حفظ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};