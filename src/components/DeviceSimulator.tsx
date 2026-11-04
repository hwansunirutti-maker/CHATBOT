import React from 'react';
import { DeviceMode } from '../types/punehod';
import { Wifi, BatteryMedium, Signal, ChevronLeft, Home, RotateCcw, ShieldCheck } from 'lucide-react';

interface DeviceSimulatorProps {
  mode: DeviceMode;
  children: React.ReactNode;
  onResetToDesktop: () => void;
}

export const DeviceSimulator: React.FC<DeviceSimulatorProps> = ({
  mode,
  children,
  onResetToDesktop
}) => {
  if (mode === 'desktop') {
    return <div className="w-full flex-1 flex flex-col">{children}</div>;
  }

  const isIOS = mode === 'ios';

  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-slate-950 py-4 sm:py-8 px-2 flex flex-col items-center justify-start overflow-y-auto">
      
      {/* Device Toolbar / Switcher prompt */}
      <div className="mb-4 flex items-center justify-between gap-4 max-w-md w-full bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-xs text-slate-300 shadow-lg">
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${isIOS ? 'bg-indigo-400' : 'bg-emerald-400'}`} />
          <span className="font-semibold text-white">
            {isIOS ? 'Apple iOS Simulator (iPhone 16 Pro)' : 'Google Android Simulator (Galaxy S24 Ultra)'}
          </span>
        </div>
        <button
          onClick={onResetToDesktop}
          className="flex items-center gap-1 text-[11px] text-blue-400 hover:text-blue-300 font-medium"
        >
          <RotateCcw className="w-3 h-3" />
          กลับสู่จอคอมพิวเตอร์
        </button>
      </div>

      {/* Outer Phone Shell */}
      <div 
        className={`relative transition-all duration-300 shadow-2xl overflow-hidden flex flex-col ${
          isIOS 
            ? 'w-full max-w-[400px] h-[780px] rounded-[52px] border-[10px] border-slate-800 bg-slate-900 ring-4 ring-slate-700/50' 
            : 'w-full max-w-[410px] h-[780px] rounded-[38px] border-[8px] border-zinc-800 bg-zinc-950 ring-4 ring-zinc-700/40'
        }`}
      >
        {/* Device Hardware Top: Dynamic Island (iOS) vs Punch Hole (Android) */}
        <div className="bg-slate-900 text-slate-300 px-6 pt-3 pb-2 select-none shrink-0 flex items-center justify-between text-xs z-30">
          
          {/* Left: Clock */}
          <span className="font-semibold text-[13px] tracking-tight">09:41</span>

          {/* Center: Dynamic Island or Punch Hole */}
          {isIOS ? (
            <div className="w-28 h-6 bg-black rounded-full flex items-center justify-between px-2.5 text-[10px] text-slate-400 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] text-blue-400 font-mono">PUNEHOD</span>
              <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
            </div>
          ) : (
            <div className="w-3.5 h-3.5 rounded-full bg-black mx-auto ring-1 ring-zinc-700" />
          )}

          {/* Right: Signal, Wifi, Battery */}
          <div className="flex items-center gap-1.5 text-slate-300 text-[11px]">
            <Signal className="w-3 h-3" />
            <Wifi className="w-3 h-3" />
            <BatteryMedium className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* In-app Sub-header banner for Mobile Simulator */}
        <div className="bg-blue-600/10 border-b border-blue-500/20 px-3 py-1 flex items-center justify-between text-[11px] text-blue-300">
          <div className="flex items-center gap-1 truncate">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span className="font-medium truncate">PUNEHOD App Mobile Edition • ฟรี 100%</span>
          </div>
          <span className="text-[10px] bg-blue-500/20 px-1.5 py-0.2 rounded font-mono">
            {isIOS ? 'iOS 18.2' : 'Android 15'}
          </span>
        </div>

        {/* Inner Screen Content */}
        <div className="flex-1 overflow-y-auto flex flex-col bg-slate-900">
          {children}
        </div>

        {/* Device Hardware Bottom Bar */}
        {isIOS ? (
          <div className="bg-slate-900 py-2.5 flex justify-center shrink-0">
            <div className="w-32 h-1 bg-slate-400 rounded-full" />
          </div>
        ) : (
          <div className="bg-zinc-950 py-2 px-8 flex justify-between items-center text-zinc-500 shrink-0 border-t border-zinc-800">
            <button className="p-1 hover:text-zinc-300">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-1 hover:text-zinc-300">
              <div className="w-3.5 h-3.5 rounded-full border border-zinc-500" />
            </button>
            <button className="p-1 hover:text-zinc-300">
              <div className="w-3 h-3 border border-zinc-500" />
            </button>
          </div>
        )}

      </div>

    </div>
  );
};
