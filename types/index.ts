// Global type definitions for Agno GUI Interface

// Agent Types
export interface Agent {
  id: string;
  name: string;
  description: string;
  model: string;
  systemPrompt: string;
  tools: Tool[];
  memory: MemoryConfig;
  settings: AgentSettings;
  status: AgentStatus;
  createdAt: Date;
  updatedAt: Date;
  performance: AgentPerformance;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  type: ToolType;
  config: Record<string, any>;
  enabled: boolean;
}

export interface MemoryConfig {
  type: 'short_term' | 'long_term' | 'persistent';
  maxTokens: number;
  persistenceEnabled: boolean;
  contextWindow: number;
}

export interface AgentSettings {
  temperature: number;
  maxTokens: number;
  streaming: boolean;
  rateLimit: number;
  timeout: number;
}

export interface AgentPerformance {
  totalRequests: number;
  successRate: number;
  averageResponseTime: number;
  totalTokensUsed: number;
  costPerRequest: number;
  lastActive: Date;
}

// Team Types
export interface Team {
  id: string;
  name: string;
  description: string;
  agents: Agent[];
  workflows: Workflow[];
  settings: TeamSettings;
  status: TeamStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamSettings {
  maxConcurrentAgents: number;
  communicationProtocol: 'sequential' | 'parallel' | 'hierarchical';
  conflictResolution: 'priority' | 'consensus' | 'arbitration';
  resourceAllocation: 'equal' | 'priority' | 'dynamic';
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  steps: WorkflowStep[];
  triggers: WorkflowTrigger[];
  status: WorkflowStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkflowStep {
  id: string;
  name: string;
  type: 'agent_action' | 'condition' | 'loop' | 'parallel';
  config: Record<string, any>;
  nextStepId?: string;
  errorStepId?: string;
}

export interface WorkflowTrigger {
  id: string;
  type: 'schedule' | 'event' | 'manual' | 'api';
  config: Record<string, any>;
  enabled: boolean;
}

// Model Types
export interface Model {
  id: string;
  name: string;
  provider: ModelProvider;
  modelId: string;
  capabilities: ModelCapability[];
  pricing: ModelPricing;
  limits: ModelLimits;
  status: ModelStatus;
}

export interface ModelProvider {
  id: string;
  name: string;
  baseUrl: string;
  apiKey: string;
  models: string[];
  rateLimits: RateLimit[];
}

export interface ModelCapability {
  type: 'text' | 'image' | 'audio' | 'video' | 'function_calling' | 'streaming';
  supported: boolean;
  limits?: Record<string, any>;
}

export interface ModelPricing {
  inputTokens: number; // cost per 1000 tokens
  outputTokens: number;
  imageTokens?: number;
  audioTokens?: number;
  videoTokens?: number;
}

export interface ModelLimits {
  maxTokens: number;
  maxImages?: number;
  maxAudioLength?: number;
  maxVideoLength?: number;
  requestsPerMinute: number;
}

export interface RateLimit {
  requests: number;
  period: number; // in seconds
  burst: number;
}

// MCP Context Types
export interface MCPContext {
  id: string;
  sessionId: string;
  contextData: ContextData;
  validation: ContextValidation;
  grounding: GroundingData;
  preservation: PreservationConfig;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContextData {
  facts: Fact[];
  constraints: Constraint[];
  guidelines: Guideline[];
  knowledge: KnowledgeBase[];
}

export interface Fact {
  id: string;
  content: string;
  confidence: number;
  source: string;
  timestamp: Date;
  verified: boolean;
}

export interface Constraint {
  id: string;
  type: 'hard' | 'soft';
  description: string;
  priority: number;
}

export interface Guideline {
  id: string;
  category: string;
  instruction: string;
  importance: 'low' | 'medium' | 'high' | 'critical';
}

export interface KnowledgeBase {
  id: string;
  domain: string;
  content: string;
  relevance: number;
  lastUpdated: Date;
}

// UI Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  preferences: UserPreferences;
  createdAt: Date;
  lastLogin: Date;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: NotificationSettings;
  dashboard: DashboardSettings;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  inApp: boolean;
  types: NotificationType[];
}

export interface DashboardSettings {
  layout: 'grid' | 'list';
  defaultView: 'agents' | 'teams' | 'workflows' | 'analytics';
  refreshInterval: number;
  chartType: 'line' | 'bar' | 'area';
}

// API Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
  message?: string;
  timestamp: Date;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
  timestamp: Date;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface WebSocketMessage {
  type: string;
  payload: any;
  timestamp: Date;
  sessionId?: string;
}

// Enums
export type AgentStatus = 'active' | 'inactive' | 'error' | 'training' | 'offline';
export type TeamStatus = 'active' | 'inactive' | 'error' | 'coordinating';
export type WorkflowStatus = 'active' | 'inactive' | 'error' | 'running' | 'paused';
export type ModelStatus = 'available' | 'unavailable' | 'deprecated' | 'maintenance';
export type ToolType = 'function' | 'api' | 'database' | 'file' | 'web' | 'custom';
export type UserRole = 'admin' | 'user' | 'viewer' | 'developer';
export type NotificationType = 'info' | 'warning' | 'error' | 'success';

// Context Validation Types
export interface ContextValidation {
  hallucinationScore: number;
  factAccuracy: number;
  contextRelevance: number;
  validationErrors: ValidationError[];
  lastValidated: Date;
}

export interface ValidationError {
  type: 'hallucination' | 'inconsistency' | 'irrelevance' | 'outdated';
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  location?: string;
}

export interface GroundingData {
  knowledgeBaseMatches: number;
  confidenceScore: number;
  groundingStrength: number;
  sources: GroundingSource[];
}

export interface GroundingSource {
  id: string;
  type: 'document' | 'database' | 'api' | 'user_input';
  relevance: number;
  confidence: number;
}

export interface PreservationConfig {
  maxContextAge: number; // in hours
  contextCompression: boolean;
  memoryLayers: number;
  persistenceStrategy: 'full' | 'compressed' | 'selective';
}