import React from 'react';
import { 
  Bot, 
  BarChart3, 
  Database, 
  ShieldCheck, 
  Smartphone, 
  Monitor, 
  Sparkles
} from 'lucide-react';
import { SyncStatus, DeviceMode } from '../types/punehod';

interface HeaderProps {
  activeTab: 'chat' | 'dashboard' | 'knowledge' | 'security';
  setActiveTab: (tab: 'chat' | 'dashboard' | 'knowledge' | 'security') => void;
  syncStatus: SyncStatus;
  isSyncing: boolean;
  onRefreshSync: () => void;
  deviceMode: DeviceMode;
  setDeviceMode: (mode: DeviceMode) => void;
  onOpenSupport: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  syncStatus,
  isSyncing,
  onRefreshSync,
  deviceMode,
  setDeviceMode,
  onOpenSupport,
}) => {
  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 backdrop-blur-md bg-slate-900/95 shadow-md">
      {/* Main Header bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 shadow-lg shadow-blue-500/20 border border-blue-400/30">
              <Bot className="w-6 h-6 text-white" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-white flex items-center gap-1">
                  PUNEHOD <span className="text-blue-400">AI</span>
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  A4 Passport
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                แชทบอทสนับสนุนเทคนิคภาษาไทย & คลังความรู้อัจฉริยะ
              </p>
            </div>
          </div>

          {/* Navigation Tabs (Center) */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'chat'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Bot className="w-4 h-4" />
              แชทบอท AI
            </button>

            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              แดชบอร์ดสถิติ
            </button>

            <button
              onClick={() => setActiveTab('knowledge')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'knowledge'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Database className="w-4 h-4" />
              ฐานข้อมูลคลังความรู้
            </button>

            <button
              onClick={() => setActiveTab('security')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'security'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              ความปลอดภัย & Cloud
            </button>
          </nav>

          {/* Controls & Badges (Right) */}
          <div className="flex items-center gap-2 sm:gap-3">
          </div>
        </div>
      </div>

      {/* Mobile navigation tab bar */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-800 bg-slate-900/90 py-1.5 px-2">
        <button
          onClick={() => setActiveTab('chat')}
          className={`flex flex-col items-center gap-0.5 text-[11px] py-1 px-2 rounded-md ${
            activeTab === 'chat' ? 'text-blue-400 font-semibold' : 'text-slate-400'
          }`}
        >
          <Bot className="w-4 h-4" />
          แชทบอท
        </button>
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center gap-0.5 text-[11px] py-1 px-2 rounded-md ${
            activeTab === 'dashboard' ? 'text-blue-400 font-semibold' : 'text-slate-400'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          แดชบอร์ด
        </button>
        <button
          onClick={() => setActiveTab('knowledge')}
          className={`flex flex-col items-center gap-0.5 text-[11px] py-1 px-2 rounded-md ${
            activeTab === 'knowledge' ? 'text-blue-400 font-semibold' : 'text-slate-400'
          }`}
        >
          <Database className="w-4 h-4" />
          ฐานข้อมูล
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`flex flex-col items-center gap-0.5 text-[11px] py-1 px-2 rounded-md ${
            activeTab === 'security' ? 'text-blue-400 font-semibold' : 'text-slate-400'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          ความปลอดภัย
        </button>
      </div>
    </header>
  );
};
