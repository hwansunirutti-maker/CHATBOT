import React, { useState } from 'react';
import { 
  Headphones, 
  X, 
  PhoneCall, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  Copy, 
  Check, 
  Monitor, 
  ShieldCheck, 
  QrCode, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  lastErrorMessage?: string;
}

export const SupportModal: React.FC<SupportModalProps> = ({
  isOpen,
  onClose,
  lastErrorMessage,
}) => {
  const [ticketId] = useState(`PUN-${Math.floor(100000 + Math.random() * 900000)}`);
  const [printerModel] = useState('PUNEHOD Passport Printer A4 Flatbed');
  const [issueSummary, setIssueSummary] = useState(lastErrorMessage || 'ต้องการปรึกษาการตั้งค่าและแก้ปัญหาเครื่องพิมพ์ PUNEHOD A4');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const ticketPayloadText = `[ใบแจ้งซ่อมด่วน PUNEHOD 24 ชม.]
รหัสตั๋วงาน: #${ticketId}
รุ่นเครื่องพิมพ์: ${printerModel}
อาการ/ปัญหา: ${issueSummary}
ผู้ติดต่อ: ${contactName || 'ลูกค้าทั่วไป'} (${contactPhone || 'LINE'})
เวลาแจ้ง: ${new Date().toLocaleString('th-TH')}
อ้างอิงฐานข้อมูล: https://punehod.vercel.app/`;

  const handleCopyTicket = () => {
    navigator.clipboard.writeText(ticketPayloadText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-5 sm:p-6 shadow-2xl relative overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Background glow decoration */}
        <div className="absolute -top-16 -right-16 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-2xl border border-emerald-400/30">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-white flex items-center gap-2">
                ศูนย์สนับสนุนช่างเทคนิค PUNEHOD ตลอด 24 ชม.
              </h3>
              <p className="text-xs text-slate-400">
                ทีมวิศวกรผู้เชี่ยวชาญพร้อมให้คำปรึกษาและรีโมทแก้ปัญหาให้ฟรี 100%
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 text-xs sm:text-sm">
          
          {/* Direct channels grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            {/* LINE Official Card */}
            <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-2xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4" />
                    LINE Official (ด่วนที่สุด)
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-mono">
                    Online 24/7
                  </span>
                </div>
                <div className="text-lg font-extrabold text-white mt-1 font-mono">
                  @punehod_th
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  พิมพ์คุยกับทีมช่าง หรือส่งรูปภาพ/วิดีโออาการเครื่องพิมพ์ให้ประเมินได้ทันที
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-emerald-500/20 flex gap-2">
                <a
                  href="https://line.me/R/ti/p/@punehod_th"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-center font-semibold text-xs flex items-center justify-center gap-1 transition-all"
                >
                  เปิด LINE App
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Hotline Call Center */}
            <div className="bg-blue-950/30 border border-blue-500/30 rounded-2xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-400 flex items-center gap-1.5">
                    <PhoneCall className="w-4 h-4" />
                    สายด่วน Call Center
                  </span>
                  <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full">
                    โทรฟรี
                  </span>
                </div>
                <div className="text-lg font-extrabold text-white mt-1 font-mono">
                  02-xxx-xxxx / 081-xxx-xxxx
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  ติดต่อเจ้าหน้าที่แผนกเทคนิคเครื่องพิมพ์ Passport Printer ทันที
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-blue-500/20 flex gap-2">
                <a
                  href="tel:020000000"
                  className="flex-1 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-center font-semibold text-xs flex items-center justify-center gap-1 transition-all"
                >
                  โทรออกทันที
                </a>
              </div>
            </div>

          </div>

          {/* Remote Assistance Info */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg shrink-0">
              <Monitor className="w-5 h-5" />
            </div>
            <div className="flex-1 text-xs">
              <span className="font-semibold text-white block">
                บริการรีโมทหน้าจอคอมพิวเตอร์ (TeamViewer / AnyDesk)
              </span>
              <span className="text-slate-400">
                ทีมวิศวกรสามารถรีโมทเข้าติดตั้งไดรเวอร์ USB และปรับแต่ง AcroRIP ให้ถึงหน้าจอคุณโดยตรง
              </span>
            </div>
          </div>

          {/* Open Diagnostic Ticket Form */}
          {!submitted ? (
            <form onSubmit={handleSubmitTicket} className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-xs sm:text-sm flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  เปิดใบแจ้งปัญหาด่วน (Diagnostic Ticket)
                </span>
                <span className="font-mono text-xs text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                  #{ticketId}
                </span>
              </div>

              <div>
                <label className="block text-slate-400 text-xs mb-1">ระบุอาการที่พบ หรือข้อความ Error *</label>
                <textarea
                  rows={2}
                  required
                  value={issueSummary}
                  onChange={e => setIssueSummary(e.target.value)}
                  placeholder="เช่น เกิด Error 0x01 ไฟสีแดงกะพริบ หรือหัวพิมพ์สีขาวไม่ออก..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 text-[11px] mb-1">ชื่อผู้ติดต่อ</label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={e => setContactName(e.target.value)}
                    placeholder="เช่น คุณสมชาย"
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-[11px] mb-1">เบอร์โทรศัพท์ / LINE ID</label>
                  <input
                    type="text"
                    value={contactPhone}
                    onChange={e => setContactPhone(e.target.value)}
                    placeholder="เช่น 081-234-5678"
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={handleCopyTicket}
                  className="flex items-center gap-1.5 text-slate-400 hover:text-white text-xs"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'คัดลอกข้อความแล้ว!' : 'คัดลอกข้อความเพื่อส่งใน LINE'}</span>
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold text-xs rounded-xl shadow transition-all flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'กำลังส่งข้อมูล...' : 'ส่งใบแจ้งปัญหา'}</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-2xl p-5 text-center space-y-2 animate-in zoom-in-95">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h4 className="font-bold text-base text-white">บันทึกใบแจ้งงานเรียบร้อยแล้ว!</h4>
              <p className="text-xs text-slate-300">
                รหัสใบแจ้งปัญหาของคุณคือ <strong className="font-mono text-emerald-300">#{ticketId}</strong> ทีมช่างเทคนิค PUNEHOD กำลังตรวจสอบและพร้อมติดต่อกลับทันที
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 text-xs text-blue-400 hover:underline"
              >
                สร้างใบงานอื่นเพิ่มเติม
              </button>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            ข้อมูลเข้ารหัส ปลอดภัยตามมาตรฐานสากล
          </span>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs"
          >
            ปิดหน้าต่าง
          </button>
        </div>

      </div>
    </div>
  );
};
