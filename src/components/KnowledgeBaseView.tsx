import React, { useState } from 'react';
import { 
  Database, 
  Search, 
  Filter, 
  ExternalLink, 
  Download, 
  Eye, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  Plus, 
  BookOpen, 
  Layers, 
  Sliders, 
  Wrench, 
  Video, 
  FileText,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { KnowledgeItem, KnowledgeCategory, SyncStatus } from '../types/punehod';

interface KnowledgeBaseViewProps {
  categories: KnowledgeCategory[];
  items: KnowledgeItem[];
  syncStatus: SyncStatus;
  isSyncing: boolean;
  onRefreshSync: () => void;
  onSelectItem: (item: KnowledgeItem) => void;
  onAddNewItem: (item: Partial<KnowledgeItem>) => void;
}

export const KnowledgeBaseView: React.FC<KnowledgeBaseViewProps> = ({
  categories,
  items,
  syncStatus,
  isSyncing,
  onRefreshSync,
  onSelectItem,
  onAddNewItem,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // New item form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('troubleshooting');
  const [newDescription, setNewDescription] = useState('');
  const [newSteps, setNewSteps] = useState('');
  const [newErrorCode, setNewErrorCode] = useState('');
  const [newTags, setNewTags] = useState('');

  // Filter items
  const filteredItems = items.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCategory;

    const matchesSearch = 
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      (item.errorCode && item.errorCode.toLowerCase().includes(q)) ||
      item.tags.some(t => t.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Download': return <Download className="w-4 h-4" />;
      case 'BookOpen': return <BookOpen className="w-4 h-4" />;
      case 'AlertTriangle': return <AlertTriangle className="w-4 h-4" />;
      case 'Wrench': return <Wrench className="w-4 h-4" />;
      case 'Sliders': return <Sliders className="w-4 h-4" />;
      case 'Video': return <Video className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const handleCreateNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDescription.trim()) return;

    const catObj = categories.find(c => c.id === newCategory);

    const newItem: Partial<KnowledgeItem> = {
      title: newTitle.trim(),
      category: newCategory,
      categoryName: catObj?.name || 'คู่มือทั่วไป',
      description: newDescription.trim(),
      steps: newSteps.split('\n').filter(s => s.trim().length > 0),
      errorCode: newErrorCode.trim() || undefined,
      tags: newTags.split(',').map(t => t.trim()).filter(Boolean),
      sourceUrl: 'https://punehod.vercel.app/#custom',
      views: 1,
      downloads: 0,
      isPinned: false
    };

    onAddNewItem(newItem);
    setShowAddModal(false);
    setNewTitle('');
    setNewDescription('');
    setNewSteps('');
    setNewErrorCode('');
    setNewTags('');
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-950 p-4 sm:p-6 lg:p-8 text-slate-100">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Live Database Sync Banner */}
        <div className="bg-gradient-to-r from-blue-900/60 via-slate-900 to-indigo-950/70 border border-blue-500/30 rounded-2xl p-4 sm:p-5 shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-400/30">
                  <Database className="w-4 h-4" />
                </span>
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  ฐานข้อมูลคลังความรู้ PUNEHOD Knowledge Base
                  <span className="text-[11px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-full">
                    {syncStatus.isConnected ? 'ออนไลน์สด' : 'แคช'}
                  </span>
                </h3>
              </div>
              <p className="text-xs text-slate-300 flex items-center gap-1.5 flex-wrap">
                <span>ดึงข้อมูลและแสดงผลในแอปโดยตรงจาก:</span>
                <span className="text-blue-400 font-mono font-medium">https://punehod.vercel.app/</span>
                <span className="hidden sm:inline">• ตอบสนอง: {syncStatus.latencyMs}ms</span>
                <span className="text-emerald-400 font-medium ml-1">● ไม่ต้องเข้าหน้าเว็บภายนอก</span>
              </p>
              <div className="text-[11px] text-slate-400">
                {syncStatus.statusText}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={onRefreshSync}
                disabled={isSyncing}
                className="flex items-center gap-2 px-3.5 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-xl text-xs font-semibold shadow transition-all active:scale-95"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>{isSyncing ? 'กำลังดึงข้อมูลสด...' : 'ซิงค์ฐานข้อมูลสดทันที'}</span>
              </button>

              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold transition-all"
              >
                <Plus className="w-4 h-4 text-emerald-400" />
                <span>เพิ่มคู่มือใหม่</span>
              </button>
            </div>

          </div>
        </div>

        {/* Search & Category Filter Section */}
        <div className="space-y-3">
          
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="ค้นหาคู่มือ, รหัสข้อผิดพลาด (เช่น 0x01, 0x50), หรือคำค้นหา เช่น ไดรเวอร์, หมึกขาว..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  ล้าง
                </button>
              )}
            </div>

            {/* Total count badge */}
            <div className="flex items-center px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-400 shrink-0">
              พบ {filteredItems.length} จากทั้งหมด {items.length} รายการ
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              ทั้งหมด ({items.length})
            </button>

            {categories.map(cat => {
              const count = items.filter(i => i.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-blue-600 text-white shadow'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {getCategoryIcon(cat.icon)}
                  <span>{cat.name}</span>
                  <span className="text-[10px] opacity-75">({count})</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Knowledge Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.map(item => (
            <div
              key={item.id}
              onClick={() => onSelectItem(item)}
              className="bg-slate-900 border border-slate-800/90 hover:border-blue-500/60 rounded-2xl p-4 sm:p-5 flex flex-col justify-between cursor-pointer group transition-all duration-200 shadow-sm hover:shadow-lg hover:shadow-blue-500/5"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-md border border-blue-500/20">
                    {item.categoryName}
                  </span>

                  {item.errorCode && (
                    <span className="text-[11px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-rose-400" />
                      {item.errorCode}
                    </span>
                  )}
                  {item.isPinned && !item.errorCode && (
                    <span className="text-[10px] font-medium bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded">
                      แนะนำ
                    </span>
                  )}
                </div>

                <h4 className="font-bold text-sm sm:text-base text-white group-hover:text-blue-300 transition-colors line-clamp-2">
                  {item.title}
                </h4>

                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {item.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {item.tags.slice(0, 4).map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-[11px]">
                    <Eye className="w-3 h-3" />
                    {item.views.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1 text-[11px]">
                    <Download className="w-3 h-3" />
                    {item.downloads.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-blue-400 font-medium group-hover:translate-x-1 transition-transform">
                  <span>เปิดอ่านคู่มือในแอป</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>

            </div>
          ))}

          {filteredItems.length === 0 && (
            <div className="col-span-full py-12 text-center bg-slate-900/50 border border-slate-800 rounded-2xl">
              <Search className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <p className="text-sm text-slate-400 font-medium">ไม่พบคู่มือหรือข้อมูลที่ตรงกับคำค้นหา "{searchQuery}"</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-3 text-xs text-blue-400 hover:underline"
              >
                รีเซ็ตการค้นหา
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Add New Knowledge Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl">
            <h3 className="font-bold text-lg text-white mb-2 flex items-center gap-2">
              <Plus className="w-5 h-5 text-blue-400" />
              เพิ่มคู่มือหรือบันทึกเทคนิคใหม่
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              ข้อมูลจะถูกบันทึกลงในคลังความรู้ AI เพื่อนำไปใช้ตอบคำถามผู้ใช้งานภาษาไทยอัตโนมัติ
            </p>

            <form onSubmit={handleCreateNew} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">หัวข้อคู่มือ / ปัญหา *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="เช่น วิธีแก้ปัญหาหมึกขาวพิมพ์ไม่ออกบนเล่มหนาพิเศษ"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">หมวดหมู่</label>
                  <select
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">รหัส Error (ถ้ามี)</label>
                  <input
                    type="text"
                    value={newErrorCode}
                    onChange={e => setNewErrorCode(e.target.value)}
                    placeholder="เช่น 0x01 หรือ 0x50"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">คำอธิบายและสาเหตุ *</label>
                <textarea
                  required
                  rows={2}
                  value={newDescription}
                  onChange={e => setNewDescription(e.target.value)}
                  placeholder="อธิบายอาการของปัญหาหรือข้อมูลสรุปของคู่มือนี้..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">ขั้นตอนการปฏิบัติ / วิธีแก้ (แยกทีละบรรทัด)</label>
                <textarea
                  rows={3}
                  value={newSteps}
                  onChange={e => setNewSteps(e.target.value)}
                  placeholder="ขั้นตอนที่ 1: ปิดสวิตช์เครื่องทันที&#10;ขั้นตอนที่ 2: ใช้แอลกอฮอล์เช็ด Encoder&#10;ขั้นตอนที่ 3: เปิดเครื่องใหม่"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">แท็ก (คั่นด้วยเครื่องหมายจุลภาค)</label>
                <input
                  type="text"
                  value={newTags}
                  onChange={e => setNewTags(e.target.value)}
                  placeholder="พาสปอร์ต, หมึกขาว, Error 0x01"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg shadow transition-colors"
                >
                  บันทึกลงฐานข้อมูล
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
