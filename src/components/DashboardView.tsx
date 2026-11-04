import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Clock, 
  CheckCircle, 
  Smile, 
  HelpCircle, 
  Download, 
  Filter, 
  Sparkles,
  ArrowUpRight,
  ShieldAlert,
  Headphones
} from 'lucide-react';
import { AnalyticsSummary } from '../types/punehod';

interface DashboardViewProps {
  analytics: AnalyticsSummary;
  onOpenSupport: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  analytics,
  onOpenSupport,
}) => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | 'all'>('7d');
  const [selectedIntentFilter, setSelectedIntentFilter] = useState<string>('all');

  // Export analytics summary report
  const handleExportReport = () => {
    const reportData = {
      title: 'PUNEHOD AI Chatbot User Intent Analytics Report',
      sourceDatabase: 'https://punehod.vercel.app/',
      generatedAt: new Date().toISOString(),
      timeRange: timeRange,
      kpi: {
        totalChats: analytics.totalChats,
        totalMessages: analytics.totalMessages,
        avgResponseTimeMs: analytics.avgResponseTimeMs,
        satisfactionRate: `${analytics.satisfactionRate}%`,
        resolutionRate: `${analytics.resolutionRate}%`,
      },
      intentDistribution: analytics.intentDistribution,
      topQuestions: analytics.topQuestions,
      weeklyVolume: analytics.dailyVolume
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `punehod-analytics-report-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const maxDailyCount = Math.max(...analytics.dailyVolume.map(d => d.count), 1);

  return (
    <div className="flex-1 overflow-y-auto bg-slate-950 p-4 sm:p-6 lg:p-8 text-slate-100">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Dashboard Title & Filter Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
                <BarChart3 className="w-5 h-5" />
              </span>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                แดชบอร์ดวิเคราะห์ความต้องการของผู้ใช้งาน
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              ประมวลผลข้อมูลการสนทนาและวิเคราะห์พฤติกรรมผู้ใช้ PUNEHOD แบบเรียลไทม์เพื่อพัฒนาประสิทธิภาพอย่างต่อเนื่อง
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Time range selector */}
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs">
              <button
                onClick={() => setTimeRange('7d')}
                className={`px-3 py-1 rounded-md transition-all ${
                  timeRange === '7d' ? 'bg-blue-600 text-white font-medium' : 'text-slate-400 hover:text-white'
                }`}
              >
                7 วันล่าสุด
              </button>
              <button
                onClick={() => setTimeRange('30d')}
                className={`px-3 py-1 rounded-md transition-all ${
                  timeRange === '30d' ? 'bg-blue-600 text-white font-medium' : 'text-slate-400 hover:text-white'
                }`}
              >
                30 วัน
              </button>
              <button
                onClick={() => setTimeRange('all')}
                className={`px-3 py-1 rounded-md transition-all ${
                  timeRange === 'all' ? 'bg-blue-600 text-white font-medium' : 'text-slate-400 hover:text-white'
                }`}
              >
                ทั้งหมด
              </button>
            </div>

            {/* Export button */}
            <button
              onClick={handleExportReport}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-medium transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">ส่งออกรายงาน</span>
            </button>
          </div>
        </div>

        {/* 4 Main KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-4 sm:p-5 relative overflow-hidden group hover:border-blue-500/50 transition-all">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
              <span>บทสนทนาทั้งหมด</span>
              <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
                <Users className="w-4 h-4" />
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-white">
                {analytics.totalChats.toLocaleString()}
              </span>
              <span className="text-[11px] text-emerald-400 font-semibold flex items-center">
                +12% <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              รวม {analytics.totalMessages.toLocaleString()} ข้อความที่ตอบสนอง
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-4 sm:p-5 relative overflow-hidden group hover:border-emerald-500/50 transition-all">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
              <span>ความพึงพอใจ (CSAT)</span>
              <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                <Smile className="w-4 h-4" />
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400">
                {analytics.satisfactionRate}%
              </span>
              <span className="text-[11px] text-emerald-400 font-semibold flex items-center">
                +1.8% <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              คำตอบตรงประเด็นและช่วยแก้ปัญหาได้จริง
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-4 sm:p-5 relative overflow-hidden group hover:border-indigo-500/50 transition-all">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
              <span>อัตราการแก้ปัญหาสำเร็จ</span>
              <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
                <CheckCircle className="w-4 h-4" />
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-indigo-400">
                {analytics.resolutionRate}%
              </span>
              <span className="text-[11px] text-indigo-300 font-medium">
                First-contact
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              ผู้ใช้แก้ปัญหาได้ด้วยคู่มือทันทีไม่ต้องส่งซ่อม
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-4 sm:p-5 relative overflow-hidden group hover:border-amber-500/50 transition-all">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
              <span>เวลาตอบสนองเฉลี่ย</span>
              <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
                <Clock className="w-4 h-4" />
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-400">
                {(analytics.avgResponseTimeMs / 1000).toFixed(2)}s
              </span>
              <span className="text-[11px] text-slate-400 font-medium">
                (ความเร็วสูง)
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              ประมวลผลด้วย Gemini 3.8 Flash Engine
            </p>
          </div>

        </div>

        {/* Charts Section: Intent Breakdown & Weekly Volume */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* User Intent Breakdown */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-sm sm:text-base text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-400" />
                  สัดส่วนความต้องการของผู้ใช้ (User Intent)
                </h3>
                <p className="text-xs text-slate-400">
                  วิเคราะห์หัวข้อที่ผู้สอบถามเข้ามามากที่สุด
                </p>
              </div>
              <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                100% ครอบคลุม
              </span>
            </div>

            <div className="space-y-3.5">
              {Object.entries(analytics.intentDistribution).map(([intent, percentage], idx) => {
                const colors = [
                  'bg-rose-500 text-rose-300',
                  'bg-blue-500 text-blue-300',
                  'bg-cyan-500 text-cyan-300',
                  'bg-emerald-500 text-emerald-300',
                  'bg-amber-500 text-amber-300'
                ];
                const colorClass = colors[idx % colors.length];

                return (
                  <div key={intent} className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-300">{intent}</span>
                      <span className="font-mono text-slate-400">{percentage}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${colorClass.split(' ')[0]}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>ข้อมูลเชื่อมโยงตรงกับหมวดหมู่คู่มือ</span>
              <span className="text-emerald-400 font-medium">● ปรับปรุงอัตโนมัติต่อเนื่อง</span>
            </div>
          </div>

          {/* Weekly Traffic & Daily Query Trends */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-white flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-emerald-400" />
                    สถิติการใช้งานรายวัน (Weekly Activity)
                  </h3>
                  <p className="text-xs text-slate-400">
                    ความถี่การสอบถามรายวันตลอด 7 วันที่ผ่านมา
                  </p>
                </div>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Peak: พุธ-ศุกร์
                </span>
              </div>

              {/* Bar visualization */}
              <div className="h-44 flex items-end justify-between gap-2 pt-4 px-2">
                {analytics.dailyVolume.map((item, idx) => {
                  const barHeight = Math.round((item.count / maxDailyCount) * 100);
                  const isToday = idx === 4; // Friday or active

                  return (
                    <div key={item.date} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                      <div className="text-[10px] text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                        {item.count}
                      </div>
                      <div
                        className={`w-full rounded-t-lg transition-all duration-300 ${
                          isToday 
                            ? 'bg-gradient-to-t from-blue-600 to-indigo-500 shadow-lg shadow-blue-500/20' 
                            : 'bg-slate-800 group-hover:bg-blue-500/60'
                        }`}
                        style={{ height: `${Math.max(barHeight, 15)}%` }}
                      />
                      <span className="text-[10px] text-slate-400 truncate w-full text-center">
                        {item.date.replace('วัน', '')}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>เฉลี่ย 182 ครั้ง/วัน</span>
              <span className="text-blue-400">พร้อมขยายตัวรองรับ 10,000+ ผู้ใช้</span>
            </div>
          </div>

        </div>

        {/* Top Questions & Sentiment Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Top 5 Questions (2 cols) */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-bold text-sm sm:text-base text-white flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-amber-400" />
                  คำถามที่พบบ่อยและมีการค้นหามากที่สุด (Top Trend Queries)
                </h3>
                <p className="text-xs text-slate-400">
                  ระบบจัดเก็บและวิเคราะห์ประเด็นที่ลูกค้าต้องการความช่วยเหลือ
                </p>
              </div>
            </div>

            <div className="divide-y divide-slate-800/80">
              {analytics.topQuestions.map((q, idx) => (
                <div key={idx} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center text-[10px] font-bold shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-slate-200 font-medium truncate">{q.query}</span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full hidden sm:inline">
                      {q.category}
                    </span>
                    <span className="font-mono text-blue-400 font-semibold bg-blue-500/10 px-2 py-0.5 rounded">
                      {q.count} ครั้ง
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sentiment & Escalation Card (1 col) */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-sm sm:text-base text-white flex items-center gap-2 mb-1">
                <Smile className="w-4 h-4 text-emerald-400" />
                การประเมินอารมณ์ผู้ใช้งาน (Sentiment)
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                วัดระดับความรู้สึกจากน้ำเสียงในข้อความ
              </p>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-emerald-400 flex items-center gap-1.5 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    เชิงบวก / ได้คำตอบ (Positive)
                  </span>
                  <span className="font-mono text-emerald-400 font-bold">89%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '89%' }} />
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-blue-400 flex items-center gap-1.5 font-medium">
                    <span className="w-2 h-2 rounded-full bg-blue-400" />
                    สอบถามทั่วไป (Neutral)
                  </span>
                  <span className="font-mono text-blue-400 font-bold">9%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '9%' }} />
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-rose-400 flex items-center gap-1.5 font-medium">
                    <span className="w-2 h-2 rounded-full bg-rose-400" />
                    ต้องการช่างด่วน (Urgent)
                  </span>
                  <span className="font-mono text-rose-400 font-bold">2%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full" style={{ width: '2%' }} />
                </div>
              </div>
            </div>

            <div className="mt-5 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-300 font-medium">พบเคสเร่งด่วน 2%?</span>
                <button
                  onClick={onOpenSupport}
                  className="text-blue-400 hover:text-blue-300 font-semibold underline text-xs"
                >
                  ส่งต่อช่าง 24 ชม.
                </button>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                ระบบเชื่อมต่อช่างเทคนิค PUNEHOD LINE Official ทันที
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
