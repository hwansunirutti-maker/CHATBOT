import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ChatView } from './components/ChatView';
import { DashboardView } from './components/DashboardView';
import { KnowledgeBaseView } from './components/KnowledgeBaseView';
import { SecurityView } from './components/SecurityView';
import { SupportModal } from './components/SupportModal';
import { KnowledgeDetailModal } from './components/KnowledgeDetailModal';
import { DeviceSimulator } from './components/DeviceSimulator';
import { 
  KnowledgeItem, 
  KnowledgeCategory, 
  SyncStatus, 
  AnalyticsSummary, 
  DeviceMode 
} from './types/punehod';
import { 
  INITIAL_KNOWLEDGE_BASE, 
  PUNEHOD_CATEGORIES, 
  INITIAL_ANALYTICS 
} from './data/punehodKnowledge';

export default function App() {
  const [activeTab, setActiveTab] = useState<'chat' | 'dashboard' | 'knowledge' | 'security'>('chat');
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop');
  
  // Knowledge Base & Categories
  const [knowledgeItems, setKnowledgeItems] = useState<KnowledgeItem[]>(INITIAL_KNOWLEDGE_BASE);
  const [categories] = useState<KnowledgeCategory[]>(PUNEHOD_CATEGORIES);

  // Sync status with https://punehod.vercel.app/
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    sourceUrl: 'https://punehod.vercel.app/',
    lastSyncedAt: new Date().toISOString(),
    isConnected: true,
    latencyMs: 145,
    totalDocuments: INITIAL_KNOWLEDGE_BASE.length,
    statusText: 'เชื่อมต่อและซิงค์ข้อมูลกับ punehod.vercel.app สำเร็จ',
    version: '3.4.2'
  });
  const [isSyncing, setIsSyncing] = useState(false);

  // Analytics
  const [analytics, setAnalytics] = useState<AnalyticsSummary>(INITIAL_ANALYTICS);

  // Modals
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [selectedKnowledgeItem, setSelectedKnowledgeItem] = useState<KnowledgeItem | null>(null);

  // Fetch initial sync & knowledge from server
  const fetchKnowledgeData = async () => {
    try {
      const res = await fetch('/api/punehod/knowledge');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.items) && data.items.length > 0) {
          setKnowledgeItems(data.items);
        }
        if (data.syncInfo) {
          setSyncStatus(data.syncInfo);
        }
      }
    } catch (e) {
      console.warn('Using client knowledge cache:', e);
    }
  };

  const fetchAnalyticsData = async () => {
    try {
      const res = await fetch('/api/analytics');
      if (res.ok) {
        const data = await res.json();
        setAnalytics(data);
      }
    } catch (e) {
      console.warn('Using initial analytics:', e);
    }
  };

  useEffect(() => {
    fetchKnowledgeData();
    fetchAnalyticsData();
  }, []);

  // Trigger real-time probe and re-sync
  const handleRefreshSync = async () => {
    setIsSyncing(true);
    try {
      const res = await fetch('/api/punehod/sync');
      if (res.ok) {
        const data = await res.json();
        if (data.syncInfo) {
          setSyncStatus(data.syncInfo);
        }
      }
      await fetchKnowledgeData();
      await fetchAnalyticsData();
    } catch (err) {
      console.error('Sync failed:', err);
    } finally {
      setIsSyncing(false);
    }
  };

  // Add new knowledge item
  const handleAddNewItem = async (newItem: Partial<KnowledgeItem>) => {
    try {
      const res = await fetch('/api/punehod/knowledge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
      });
      if (res.ok) {
        const data = await res.json();
        if (data.item) {
          setKnowledgeItems(prev => [data.item, ...prev]);
        }
      }
    } catch (e) {
      console.error('Failed to add knowledge item:', e);
      // Fallback local addition
      const localItem: KnowledgeItem = {
        id: `custom-${Date.now()}`,
        title: newItem.title || 'คู่มือใหม่',
        category: newItem.category || 'troubleshooting',
        categoryName: newItem.categoryName || 'การแก้ปัญหา & รหัสข้อผิดพลาด',
        description: newItem.description || '',
        steps: newItem.steps || [],
        errorCode: newItem.errorCode,
        tags: newItem.tags || [],
        sourceUrl: 'https://punehod.vercel.app/#custom',
        views: 1,
        downloads: 0,
        updatedAt: new Date().toISOString()
      };
      setKnowledgeItems(prev => [localItem, ...prev]);
    }
  };

  // Switch to chatbot tab and ask question
  const handleAskChatbot = (_promptText: string) => {
    setActiveTab('chat');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 font-sans text-slate-100 antialiased selection:bg-blue-600 selection:text-white">
      
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        syncStatus={syncStatus}
        isSyncing={isSyncing}
        onRefreshSync={handleRefreshSync}
        deviceMode={deviceMode}
        setDeviceMode={setDeviceMode}
        onOpenSupport={() => setIsSupportModalOpen(true)}
      />

      {/* Main Content Area (Wraps in Device Simulator for iOS & Android or standard Desktop) */}
      <DeviceSimulator
        mode={deviceMode}
        onResetToDesktop={() => setDeviceMode('desktop')}
      >
        {activeTab === 'chat' && (
          <ChatView
            knowledgeItems={knowledgeItems}
            onOpenSupport={() => setIsSupportModalOpen(true)}
            onOpenKnowledgeDetail={(item) => setSelectedKnowledgeItem(item)}
          />
        )}

        {activeTab === 'dashboard' && (
          <DashboardView
            analytics={analytics}
            onOpenSupport={() => setIsSupportModalOpen(true)}
          />
        )}

        {activeTab === 'knowledge' && (
          <KnowledgeBaseView
            categories={categories}
            items={knowledgeItems}
            syncStatus={syncStatus}
            isSyncing={isSyncing}
            onRefreshSync={handleRefreshSync}
            onSelectItem={(item) => setSelectedKnowledgeItem(item)}
            onAddNewItem={handleAddNewItem}
          />
        )}

        {activeTab === 'security' && (
          <SecurityView />
        )}
      </DeviceSimulator>

      {/* Support Escalation Modal */}
      <SupportModal
        isOpen={isSupportModalOpen}
        onClose={() => setIsSupportModalOpen(false)}
      />

      {/* Knowledge Item Detailed Guide Modal */}
      <KnowledgeDetailModal
        item={selectedKnowledgeItem}
        onClose={() => setSelectedKnowledgeItem(null)}
        onAskChatbot={handleAskChatbot}
      />

    </div>
  );
}
