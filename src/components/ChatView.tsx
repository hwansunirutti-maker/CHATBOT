import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  ThumbsUp, 
  ThumbsDown, 
  Sparkles, 
  Download, 
  Trash2, 
  Plus, 
  History, 
  ExternalLink, 
  ShieldCheck,
  AlertTriangle,
  Info,
  Mic,
  MicOff,
  BookOpen
} from 'lucide-react';
import { ChatMessage, ChatSession, KnowledgeItem } from '../types/punehod';
import { resolvePunehodResponse } from '../utils/punehodEngine';

interface ChatViewProps {
  knowledgeItems: KnowledgeItem[];
  onOpenSupport: () => void;
  onOpenKnowledgeDetail: (item: KnowledgeItem) => void;
}

export const ChatView: React.FC<ChatViewProps> = ({
  knowledgeItems,
  onOpenSupport,
  onOpenKnowledgeDetail,
}) => {
  // Chat state
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'bot',
      text: `สวัสดีครับ! ยินดีต้อนรับสู่ **PUNEHOD AI Expert Support** 🇹🇭 
ผู้ช่วยอัจฉริยะภาษาไทย เชื่อมต่อข้อมูลโดยตรงจากคลังความรู้ **https://punehod.vercel.app/**

ผมพร้อมตอบคำถาม แนะนำการแก้ปัญหา และให้คำปรึกษาเกี่ยวกับเครื่องพิมพ์ **Passport Printer PUNEHOD A4 Flatbed** และงานพิมพ์ UV/DTF ตลอด 24 ชั่วโมง ใช้งานฟรี 100% ครับ!

สามารถพิมพ์คำถามหรือแจ้งปัญหาที่พบได้ทันทีครับ:`,
      timestamp: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
      category: 'ทั่วไป'
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [showHistoryDrawer, setShowHistoryDrawer] = useState(false);
  
  // Stored chat sessions
  const [sessions, setSessions] = useState<ChatSession[]>([
    {
      id: 'session-default',
      title: 'การสอบถามปัญหาเครื่องพิมพ์ทั่วไป',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messageCount: 1,
      intent: 'เริ่มต้นการใช้งาน',
      sentiment: 'positive',
      messages: []
    }
  ]);
  const [currentSessionId, setCurrentSessionId] = useState('session-default');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Handle Thai Speech Synthesis
  const handleToggleSpeak = (msgId: string, textToSpeak: string) => {
    if (!('speechSynthesis' in window)) {
      alert('เบราว์เซอร์นี้ไม่รองรับระบบสังเคราะห์เสียง (Text-to-Speech)');
      return;
    }

    if (playingAudioId === msgId) {
      window.speechSynthesis.cancel();
      setPlayingAudioId(null);
      return;
    }

    window.speechSynthesis.cancel();
    
    // Clean markdown symbols for cleaner speech
    const cleanText = textToSpeak
      .replace(/[#*`_~]/g, '')
      .replace(/https?:\/\/\S+/g, 'ตามลิงก์ที่แนบไว้')
      .replace(/0x01/g, 'ศูนย์เอ็กซ์ศูนย์หนึ่ง')
      .replace(/0x50/g, 'ศูนย์เอ็กซ์ห้าศูนย์');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'th-TH';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    // Try finding Thai voice
    const voices = window.speechSynthesis.getVoices();
    const thaiVoice = voices.find(v => v.lang.includes('th') || v.lang.includes('TH'));
    if (thaiVoice) {
      utterance.voice = thaiVoice;
    }

    utterance.onend = () => {
      setPlayingAudioId(null);
    };

    utterance.onerror = () => {
      setPlayingAudioId(null);
    };

    setPlayingAudioId(msgId);
    window.speechSynthesis.speak(utterance);
  };

  // Handle Copy text
  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Send message to server
  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInputMessage('');
    setIsLoading(true);

    try {
      let data: any = null;

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: text,
            history: newHistory.slice(-8)
          })
        });

        if (response.ok) {
          data = await response.json();
        }
      } catch (networkErr) {
        console.warn('API call offline or static host, using in-app knowledge engine:', networkErr);
      }

      // If server returned data, use it; otherwise seamlessly resolve via in-app knowledge engine
      if (!data || !data.reply) {
        data = resolvePunehodResponse(text, knowledgeItems);
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: data.reply,
        timestamp: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
        category: data.category,
        suggestedActions: data.suggestedActions,
        referenceItemIds: data.referenceItemIds
      };

      setMessages(prev => [...prev, botMsg]);

      // Update current session
      setSessions(prev =>
        prev.map(s =>
          s.id === currentSessionId
            ? {
                ...s,
                updatedAt: new Date().toISOString(),
                messageCount: s.messageCount + 2,
                title: text.length > 28 ? text.slice(0, 28) + '...' : text
              }
            : s
        )
      );
    } catch (err) {
      console.error('Chat resolution error:', err);
      const fallbackData = resolvePunehodResponse(text, knowledgeItems);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: fallbackData.reply,
        timestamp: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
        category: fallbackData.category,
        suggestedActions: fallbackData.suggestedActions,
        referenceItemIds: fallbackData.referenceItemIds
      };
      setMessages(prev => [...prev, botMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Speech Recognition (Dictation) simulation or browser API
  const handleToggleVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('เบราว์เซอร์นี้ไม่รองรับระบบตรวจจับเสียงพูด (Speech Recognition) กรุณาใช้การพิมพ์ข้อความ');
      return;
    }

    if (isRecording) {
      setIsRecording(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'th-TH';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      setIsRecording(true);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsRecording(false);
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start();
    } catch (e) {
      console.error(e);
      setIsRecording(false);
    }
  };

  // Feedback on message
  const handleFeedback = (id: string, type: 'like' | 'dislike') => {
    setMessages(prev =>
      prev.map(m => (m.id === id ? { ...m, feedback: type } : m))
    );
  };

  // Start new session
  const handleNewChat = () => {
    const newSessionId = `session-${Date.now()}`;
    const newSession: ChatSession = {
      id: newSessionId,
      title: 'การสนทนาใหม่',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messageCount: 1,
      intent: 'ทั่วไป',
      sentiment: 'positive',
      messages: []
    };

    setSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newSessionId);
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'bot',
        text: `สวัสดีครับ เริ่มต้นการสนทนาใหม่กับ **PUNEHOD AI** มีข้อสงสัยหรือติดปัญหาการใช้งานจุดไหน สอบถามได้ทันทีครับ!`,
        timestamp: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
        suggestedActions: [
          'วิธีแก้ Error 0x01 Carriage Lock',
          'ขอลิงก์ไดรเวอร์ Windows 11',
          'วิธีล้างหัวพิมพ์และหมึกขาว'
        ]
      }
    ]);
    setShowHistoryDrawer(false);
  };

  // Export current conversation
  const handleExportChat = () => {
    const exportData = {
      app: 'PUNEHOD AI Thai Chatbot',
      source: 'https://punehod.vercel.app/',
      sessionId: currentSessionId,
      exportedAt: new Date().toISOString(),
      totalMessages: messages.length,
      conversation: messages
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `punehod-chat-history-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex-1 flex overflow-hidden relative bg-slate-950 text-slate-100">
      
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full max-w-4xl mx-auto w-full">
        
        {/* Chat Sub-bar */}
        <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-slate-200">
              PUNEHOD Support Bot (ภาษาไทย)
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleNewChat}
              className="p-1.5 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg transition-colors text-xs flex items-center gap-1"
              title="เริ่มการสนทนาใหม่"
            >
              <Plus className="w-4 h-4 text-blue-400" />
              <span className="hidden sm:inline text-xs">แชทใหม่</span>
            </button>

            <button
              onClick={() => setShowHistoryDrawer(!showHistoryDrawer)}
              className="p-1.5 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg transition-colors text-xs flex items-center gap-1"
              title="ดูประวัติการสนทนา"
            >
              <History className="w-4 h-4 text-slate-400" />
              <span className="hidden sm:inline text-xs">ประวัติ</span>
            </button>

            <button
              onClick={handleExportChat}
              className="p-1.5 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg transition-colors text-xs"
              title="ส่งออกประวัติสนทนา (JSON)"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Message Log Window */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(msg => {
            const isUser = msg.sender === 'user';

            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shrink-0 shadow-md border border-blue-400/30 mt-1">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}

                <div className={`max-w-[85%] sm:max-w-[78%] flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                  
                  {/* Bubble Container */}
                  <div
                    className={`rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm transition-all ${
                      isUser
                        ? 'bg-blue-600 text-white rounded-tr-none'
                        : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
                    }`}
                  >
                    {/* Render message body with simple markdown paragraphs */}
                    <div className="whitespace-pre-wrap font-normal break-words">
                      {msg.text.split('\n').map((line, lIdx) => {
                        // Header or Bold item formatting
                        if (line.startsWith('**') || line.includes('**')) {
                          const parts = line.split('**');
                          return (
                            <p key={lIdx} className="my-1">
                              {parts.map((p, pIdx) =>
                                pIdx % 2 === 1 ? (
                                  <strong key={pIdx} className="font-semibold text-white">
                                    {p}
                                  </strong>
                                ) : (
                                  p
                                )
                              )}
                            </p>
                          );
                        }
                        if (line.trim().startsWith('- ') || line.trim().startsWith('• ')) {
                          return (
                            <div key={lIdx} className="flex items-start gap-1.5 my-0.5 ml-1">
                              <span className="text-blue-400">•</span>
                              <span>{line.replace(/^[-•]\s*/, '')}</span>
                            </div>
                          );
                        }
                        if (/^\d+\./.test(line.trim())) {
                          return (
                            <div key={lIdx} className="my-1 ml-1 text-slate-100">
                              {line}
                            </div>
                          );
                        }
                        return <p key={lIdx} className={line.trim() === '' ? 'h-2' : 'my-0.5'}>{line}</p>;
                      })}
                    </div>

                    {/* Reference Documentation links if any */}
                    {!isUser && msg.referenceItemIds && msg.referenceItemIds.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-slate-800/80">
                        <div className="text-[11px] text-slate-400 mb-1.5 font-medium flex items-center gap-1">
                          <BookOpen className="w-3 h-3 text-blue-400" />
                          เปิดอ่านคู่มือฉบับเต็มในแอปทันที (ดึงตรงจาก punehod.vercel.app):
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {msg.referenceItemIds.map(refId => {
                            const refItem = knowledgeItems.find(k => k.id === refId);
                            if (!refItem) return null;
                            return (
                              <button
                                key={refId}
                                onClick={() => onOpenKnowledgeDetail(refItem)}
                                className="text-[11px] bg-slate-800/90 hover:bg-blue-600/30 border border-slate-700/80 hover:border-blue-400 text-blue-300 hover:text-white px-2.5 py-1 rounded-lg transition-all flex items-center gap-1.5 shadow-sm"
                                title="คลิกเพื่อเปิดอ่านเอกสารคู่มือฉบับเต็มในแอป"
                              >
                                <BookOpen className="w-3 h-3 text-blue-400" />
                                <span className="font-medium">{refItem.title.slice(0, 36)}...</span>
                                <span className="text-[9px] bg-blue-500/20 text-blue-200 px-1 rounded">เปิดอ่านในแอป</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions & Timestamp Footer */}
                  <div className="flex items-center gap-2 mt-1 px-1 text-[11px] text-slate-400">
                    <span>{msg.timestamp}</span>

                    {!isUser && (
                      <div className="flex items-center gap-1.5 ml-1">
                        {/* Audio Speak */}
                        <button
                          onClick={() => handleToggleSpeak(msg.id, msg.text)}
                          className={`p-1 rounded hover:bg-slate-800 transition-colors ${
                            playingAudioId === msg.id ? 'text-amber-400' : 'text-slate-400 hover:text-white'
                          }`}
                          title="ฟังเสียงอ่านภาษาไทย"
                        >
                          {playingAudioId === msg.id ? (
                            <VolumeX className="w-3.5 h-3.5 animate-pulse" />
                          ) : (
                            <Volume2 className="w-3.5 h-3.5" />
                          )}
                        </button>

                        {/* Copy button */}
                        <button
                          onClick={() => handleCopyText(msg.id, msg.text)}
                          className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                          title="คัดลอกคำตอบ"
                        >
                          {copiedId === msg.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>

                        {/* Like/Dislike feedback */}
                        <button
                          onClick={() => handleFeedback(msg.id, 'like')}
                          className={`p-1 rounded hover:bg-slate-800 transition-colors ${
                            msg.feedback === 'like' ? 'text-emerald-400' : 'text-slate-400 hover:text-white'
                          }`}
                          title="คำตอบมีประโยชน์"
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleFeedback(msg.id, 'dislike')}
                          className={`p-1 rounded hover:bg-slate-800 transition-colors ${
                            msg.feedback === 'dislike' ? 'text-rose-400' : 'text-slate-400 hover:text-white'
                          }`}
                          title="ยังไม่ตรงประเด็น"
                        >
                          <ThumbsDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Suggested follow-up action buttons */}
                  {!isUser && msg.suggestedActions && msg.suggestedActions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {msg.suggestedActions.map((action, aIdx) => (
                        <button
                          key={aIdx}
                          onClick={() => {
                            if (action.includes('ติดต่อช่าง')) {
                              onOpenSupport();
                            } else {
                              handleSendMessage(action);
                            }
                          }}
                          className="text-xs bg-slate-800/80 hover:bg-blue-600 hover:text-white text-slate-300 border border-slate-700/60 px-2.5 py-1 rounded-lg transition-all"
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  )}

                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 mt-1">
                    <User className="w-4 h-4 text-slate-300" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shrink-0 border border-blue-400/30">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-2xl rounded-tl-none px-4 py-3 text-sm text-slate-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.3s]" />
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.15s]" />
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" />
                <span className="text-xs ml-1 font-medium">กำลังค้นหาข้อมูลจาก punehod.vercel.app...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-slate-900/95 border-t border-slate-800 shrink-0">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            {/* Voice Dictation Button */}
            <button
              type="button"
              onClick={handleToggleVoiceInput}
              className={`p-2.5 rounded-xl border transition-all ${
                isRecording
                  ? 'bg-rose-600 text-white border-rose-500 animate-pulse'
                  : 'bg-slate-800 text-slate-400 hover:text-white border-slate-700'
              }`}
              title={isRecording ? 'กำลังฟังเสียงพูดภาษาไทย...' : 'กดเพื่อพูดคำถามภาษาไทย'}
            >
              {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            {/* Main Text Input */}
            <input
              type="text"
              value={inputMessage}
              onChange={e => setInputMessage(e.target.value)}
              placeholder="พิมพ์คำถามเกี่ยวกับเครื่องพิมพ์ PUNEHOD หรือรหัส Error..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              disabled={isLoading}
            />

            {/* Send Button */}
            <button
              type="submit"
              disabled={isLoading || !inputMessage.trim()}
              className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:hover:bg-blue-600 text-white transition-all shadow-md active:scale-95 flex items-center justify-center shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Micro Footer Note */}
          <div className="mt-2 flex items-center justify-end text-[11px] text-slate-500 px-1">
            <span className="hidden sm:inline">
              กด Enter เพื่อส่งคำถาม
            </span>
          </div>
        </div>

      </div>

      {/* History Drawer on the right (collapsible) */}
      {showHistoryDrawer && (
        <div className="absolute inset-y-0 right-0 w-80 bg-slate-900 border-l border-slate-800 shadow-2xl z-30 flex flex-col p-4 animate-in slide-in-from-right duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
              <History className="w-4 h-4 text-blue-400" />
              ประวัติการสนทนา
            </h3>
            <button
              onClick={() => setShowHistoryDrawer(false)}
              className="text-xs text-slate-400 hover:text-white"
            >
              ปิด
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-3 space-y-2">
            {sessions.map(s => (
              <div
                key={s.id}
                onClick={() => {
                  setCurrentSessionId(s.id);
                  setShowHistoryDrawer(false);
                }}
                className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                  s.id === currentSessionId
                    ? 'bg-blue-600/20 border-blue-500/40 text-blue-200'
                    : 'bg-slate-950 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <div className="font-medium text-white truncate">{s.title}</div>
                <div className="flex items-center justify-between mt-1 text-[10px] text-slate-500">
                  <span>{new Date(s.updatedAt).toLocaleDateString('th-TH')}</span>
                  <span className="bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">
                    {s.messageCount} ข้อความ
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={handleNewChat}
              className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              เริ่มการสนทนาใหม่
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
