export interface KnowledgeItem {
  id: string;
  title: string;
  category: string;
  categoryName: string;
  description: string;
  steps?: string[];
  errorCode?: string;
  tags: string[];
  sourceUrl: string;
  views: number;
  downloads: number;
  updatedAt: string;
  isPinned?: boolean;
}

export interface KnowledgeCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  count: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot' | 'system';
  text: string;
  timestamp: string;
  category?: string;
  suggestedActions?: string[];
  referenceItemIds?: string[];
  feedback?: 'like' | 'dislike';
  isAudioPlaying?: boolean;
}

export interface ChatSession {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messageCount: number;
  intent: string;
  sentiment: 'positive' | 'neutral' | 'urgent';
  messages: ChatMessage[];
}

export interface SyncStatus {
  sourceUrl: string;
  lastSyncedAt: string;
  isConnected: boolean;
  latencyMs: number;
  totalDocuments: number;
  statusText: string;
  version: string;
}

export interface AnalyticsSummary {
  totalChats: number;
  totalMessages: number;
  avgResponseTimeMs: number;
  satisfactionRate: number;
  resolutionRate: number;
  intentDistribution: { [key: string]: number };
  dailyVolume: { date: string; count: number }[];
  topQuestions: { query: string; count: number; category: string }[];
}

export type DeviceMode = 'desktop' | 'ios' | 'android';
