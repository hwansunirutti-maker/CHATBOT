import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Eye, 
  CheckCircle, 
  AlertTriangle, 
  BookOpen, 
  ArrowRight,
  FileText,
  Copy,
  Check,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Printer,
  ShieldCheck,
  Wrench,
  HelpCircle
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
  const [activeTab, setActiveTab] = useState<'manual' | 'steps' | 'spec'>('manual');
  const [copied, setCopied] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);

  if (!item) return null;

  const handleCopyFullManual = () => {
    const fullText = `[PUNEHOD Passport Printer A4 - เอกสารคู่มือทางเทคนิค]
หัวข้อ: ${item.title}
หมวดหมู่: ${item.categoryName} ${item.errorCode ? `(รหัสข้อผิดพลาด: ${item.errorCode})` : ''}
แหล่งข้อมูล: https://punehod.vercel.app/

【คำอธิบายภาพรวม】
${item.description}

【ขั้นตอนวิธีปฏิบัติทีละขั้นตอน】
${item.steps ? item.steps.map((s, idx) => `${idx + 1}. ${s}`).join('\n') : 'ดูคำอธิบายภาพรวม'}

【ข้อควรระวังเพื่อความปลอดภัย】
- ปิดสวิตช์เครื่องพิมพ์และถอดปลั๊กก่อนสัมผัสชุดตลับหัวพิมพ์ (Carriage Unit)
- ระวังอย่าให้แอลกอฮอล์หรือของเหลวหยดลงบนแผงวงจรหลัก Mainboard
- หมั่นตรวจสอบระดับน้ำหมึกทิ้งในถัง Waste Ink ไม่ให้ล้นเกิน 80%

ศูนย์บริการเทคนิค PUNEHOD โทร 02-xxx-xxxx | LINE: @punehod_th (24 ชม.)`;

    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadManualFile = () => {
    const content = `PUNEHOD Knowledge Base - เอกสารคู่มือทางการ
======================================================
หัวข้อ: ${item.title}
หมวดหมู่: ${item.categoryName}
รหัส Error: ${item.errorCode || 'N/A'}
อ้างอิง: https://punehod.vercel.app/
วันที่ซิงค์: ${new Date(item.updatedAt).toLocaleDateString('th-TH')}
======================================================

1. รายละเอียดและสาเหตุ
${item.description}

2. ขั้นตอนการแก้ไข / การตั้งค่า (Step-by-Step)
${item.steps ? item.steps.map((s, idx) => `   ${idx + 1}. ${s}`).join('\n') : 'ดูคำแนะนำในคู่มือ'}

3. ข้อมูลทางเทคนิคและสเปกเครื่อง (PUNEHOD A4 Passport Edition)
- ขนาดหัวพิมพ์: Flatbed Passport Size (ICAO Doc 9303 - 125 x 88 mm)
- ความละเอียด: 1440 x 1440 DPI / 2880 x 1440 DPI
- ระบบหมึก: UV Eco Series / White Ink Circulation (WIMS)
- พอร์ตเชื่อมต่อ: USB 2.0 / USB 3.0 (Virtual Printer Port USB001)

======================================================
ศูนย์บริการเทคนิค PUNEHOD (24 ชั่วโมง):
โทร: 02-xxx-xxxx | LINE Official: @punehod_th | อีเมล: support@punehod.co.th`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PUNEHOD-MANUAL-${item.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full p-4 sm:p-6 shadow-2xl relative overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="text-[11px] font-semibold text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-md border border-blue-500/20 flex items-center gap-1">
                <FileText className="w-3 h-3" />
                {item.categoryName}
              </span>

              {item.errorCode && (
                <span className="text-[11px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2 py-0.5 rounded-md flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3 text-rose-400" />
                  รหัส {item.errorCode}
                </span>
              )}

              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md font-mono">
                ดึงข้อมูลจาก punehod.vercel.app โดยตรง
              </span>
            </div>

            <h3 className="font-bold text-base sm:text-xl text-white leading-snug">
              {item.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors shrink-0"
            title="ปิดหน้าต่าง"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation & Toolbar inside reader */}
        <div className="flex flex-wrap items-center justify-between gap-2 py-2.5 border-b border-slate-800/80 bg-slate-950/40 px-2 rounded-xl my-2 text-xs">
          
          {/* Reader Tabs */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab('manual')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'manual'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>เอกสารคู่มือเต็มในแอป</span>
            </button>

            <button
              onClick={() => setActiveTab('steps')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'steps'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>ขั้นตอนทีละสเต็ป</span>
            </button>

            <button
              onClick={() => setActiveTab('spec')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'spec'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>สเปก & ข้อควรระวัง</span>
            </button>
          </div>

          {/* Document Actions */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setZoomLevel(prev => Math.min(prev + 10, 140))}
              className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors"
              title="ขยายตัวอักษร"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel(prev => Math.max(prev - 10, 90))}
              className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors"
              title="ย่อตัวอักษร"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleCopyFullManual}
              className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
              title="คัดลอกเนื้อหาทั้งหมด"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="text-[11px]">{copied ? 'คัดลอกแล้ว' : 'คัดลอก'}</span>
            </button>
            <button
              onClick={handleDownloadManualFile}
              className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-blue-300 rounded-lg transition-colors"
              title="ดาวน์โหลดไฟล์คู่มือเก็บไว้อ่านออฟไลน์"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="text-[11px]">ดาวน์โหลด</span>
            </button>
          </div>

        </div>

        {/* Scrollable Document Content */}
        <div className="flex-1 overflow-y-auto py-3 space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed pr-1" style={{ fontSize: `${zoomLevel}%` }}>
          
          {/* TAB 1: Complete In-App Manual Viewer */}
          {activeTab === 'manual' && (
            <div className="space-y-4 bg-slate-950 p-5 rounded-2xl border border-slate-800/90 shadow-inner">
              
              {/* Document Official Banner Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                <div className="space-y-0.5">
                  <span className="font-extrabold tracking-wider text-blue-400 uppercase text-[11px] block">
                    PUNEHOD PASSPORT PRINTER A4 - OFFICIAL TECHNICAL MANUAL
                  </span>
                  <span className="text-slate-400 text-[11px]">
                    คลังความรู้ทางการ: https://punehod.vercel.app/ • รหัสเอกสาร: {item.id}
                  </span>
                </div>
                <span className="font-mono text-[10px] bg-slate-800 px-2 py-1 rounded text-slate-300">
                  REV. 3.4
                </span>
              </div>

              {/* Description callout */}
              <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-1.5">
                <h4 className="font-bold text-white text-xs uppercase tracking-wide flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                  คำอธิบายอาการและสาเหตุของปัญหา
                </h4>
                <p className="text-slate-200 leading-relaxed">{item.description}</p>
              </div>

              {/* Step By Step List */}
              {item.steps && item.steps.length > 0 && (
                <div className="space-y-2.5">
                  <h4 className="font-bold text-white text-xs uppercase tracking-wide flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    วิธีปฏิบัติและการตั้งค่าอย่างละเอียด
                  </h4>
                  <div className="space-y-2">
                    {item.steps.map((step, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-slate-900 border border-slate-800/80 rounded-xl flex items-start gap-3 hover:border-slate-700 transition-colors"
                      >
                        <span className="w-6 h-6 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <div className="flex-1 text-slate-200">
                          {step}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notice / In-App Reader Guarantee */}
              <div className="p-3.5 bg-blue-950/20 border border-blue-500/30 rounded-xl text-xs flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-slate-300">
                  <strong className="text-white block mb-0.5">ระบบดึงข้อมูลและแสดงผลในแอปโดยตรง 100%:</strong>
                  ท่านสามารถอ่านคู่มือ ดาวน์โหลดไฟล์ และนำขั้นตอนไปปฏิบัติตามได้ทันทีโดยไม่ต้องเปิดเบราว์เซอร์ออกไปดูหน้าเว็บภายนอก ข้อมูลทั้งหมดได้รับการซิงค์และรับรองความถูกต้องจากศูนย์เทคนิค PUNEHOD
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: Step-by-Step Focus */}
          {activeTab === 'steps' && (
            <div className="space-y-3">
              {item.steps && item.steps.length > 0 ? (
                item.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex items-start gap-3.5 shadow-sm"
                  >
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-md">
                      {idx + 1}
                    </div>
                    <div className="flex-1 pt-1">
                      <span className="text-white font-medium block text-sm">{step}</span>
                      <span className="text-[11px] text-slate-500 mt-1 block">
                        ปฏิบัติตามลำดับขั้นตอนเพื่อผลลัพธ์และความปลอดภัยสูงสุด
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-slate-400 bg-slate-950 rounded-2xl border border-slate-800">
                  ไม่มีขั้นตอนย่อยสำหรับหัวข้อนี้ ดูข้อมูลสรุปได้ในแท็บแรก
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Specifications & Safety */}
          {activeTab === 'spec' && (
            <div className="space-y-3 bg-slate-950 p-5 rounded-2xl border border-slate-800">
              <h4 className="font-bold text-white text-xs uppercase tracking-wide flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5 text-amber-400" />
                ข้อมูลจำเพาะทางเทคนิค & มาตรฐานการบำรุงรักษา
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">ขนาดแท่นพิมพ์พาสปอร์ต</span>
                  <span className="text-white font-semibold">125 x 88 มม. (ICAO Doc 9303 B7)</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">ระยะห่างเซนเซอร์อินฟราเรด</span>
                  <span className="text-white font-semibold">1.5 - 2.0 มิลลิเมตร (Clearance)</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">การเชื่อมต่อพอร์ต</span>
                  <span className="text-white font-semibold">High-speed USB 2.0 / USB001</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">ระบบหมึกและหลอดแสง</span>
                  <span className="text-white font-semibold">UV LED Dual Lamp + WIMS Circulation</span>
                </div>
              </div>

              <div className="p-3.5 bg-amber-950/20 border border-amber-500/30 rounded-xl text-xs space-y-1">
                <strong className="text-amber-300 font-semibold block flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  ข้อควรระวังสำคัญสำหรับช่างผู้ใช้งาน:
                </strong>
                <p className="text-slate-300 text-[11px]">
                  1. ห้ามใช้แอลกอฮอล์เช็ดหัวพิมพ์โดยตรง ให้ใช้เฉพาะน้ำยา Cleaning Solution สำหรับหมึก UV เท่านั้น
                  <br />
                  2. ให้กดปุ่มหมุนเวียนหมึกขาว WIMS ทุกเช้า 3-5 นาทีก่อนเริ่มเปิดสั่งพิมพ์เล่ม เพื่อป้องกันหัวพิมพ์ตัน
                </p>
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {item.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-[11px] bg-slate-800 text-slate-300 px-2.5 py-0.5 rounded-md"
              >
                #{tag}
              </span>
            ))}
          </div>

        </div>

        {/* Modal Bottom Footer */}
        <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-4 text-slate-500">
            <span className="flex items-center gap-1 text-[11px]">
              <Eye className="w-3.5 h-3.5" />
              {item.views.toLocaleString()} ผู้เข้าชม
            </span>
            <span className="flex items-center gap-1 text-[11px]">
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
              <span>ถามแชทบอทเกี่ยวกับคู่มือนี้</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
