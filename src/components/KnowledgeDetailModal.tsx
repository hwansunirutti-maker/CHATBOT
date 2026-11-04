import React from 'react';
import { 
  X, 
  ExternalLink, 
  Download, 
  Eye, 
  CheckCircle, 
  AlertTriangle, 
  Share2, 
  BookOpen, 
  ArrowRight
} from 'lucide-react';
import { KnowledgeItem } from '../types/punehod';

interface KnowledgeDetailModalProps {
  item: KnowledgeItem | null;
  onClose: () => void;
  onAskChatbot: (title: string) => void;
}

export const KnowledgeDetailModal: React.FC<KnowledgeDetailModalProps> = ({
  item,
  onClose,
  onAskChatbot,
}) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-5 sm:p-7 shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-md border border-blue-500/20">
                {item.categoryName}
              </span>

              {item.errorCode && (
                <span className="text-xs font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2.5 py-0.5 rounded-md flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                  รหัส {item.errorCode}
                </span>
              )}
            </div>

            <h3 className="font-bold text-lg sm:text-xl text-white leading-snug">
              {item.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          
          {/* Summary description */}
          <div className="p-4 bg-slate-950 border border-slate-800/80 rounded-2xl">
            <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider mb-1">
              คำอธิบายภาพรวม & อาการ
            </h4>
            <p className="text-slate-300">{item.description}</p>
          </div>

          {/* Step-by-Step guides */}
          {item.steps && item.steps.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                ขั้นตอนการปฏิบัติ / วิธีแก้ปัญหาทีละสเต็ป (Step-by-Step)
              </h4>
              <div className="space-y-2">
                {item.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl flex items-start gap-3"
                  >
                    <span className="w-6 h-6 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-slate-200">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {item.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Source origin banner */}
          <div className="p-3.5 bg-blue-950/30 border border-blue-500/30 rounded-xl flex items-center justify-between">
            <div className="text-xs">
              <span className="text-slate-400 block">อ้างอิงจากคลังความรู้ทางการ:</span>
              <span className="text-white font-medium">{item.sourceUrl}</span>
            </div>
            <a
              href={item.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1"
            >
              <span>เปิดต้นฉบับ</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-4 text-slate-500">
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              {item.views.toLocaleString()} ผู้เข้าชม
            </span>
            <span className="flex items-center gap-1">
              <Download className="w-3.5 h-3.5" />
              {item.downloads.toLocaleString()} ดาวน์โหลด
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onAskChatbot(`ขอวิธีแก้หรืออธิบายเพิ่มเติมเกี่ยวกับ "${item.title}"`);
              }}
              className="flex-1 sm:flex-none px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-semibold shadow transition-all flex items-center justify-center gap-1.5"
            >
              <span>ถามแชทบอทเกี่ยวกับเรื่องนี้</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
