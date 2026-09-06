export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface ChatRequest {
  message: string;
  language?: string;
  history?: ChatMessage[];
  session_id?: number;
}

export interface ChatResponse {
  response?: string;
  reply?: string;
  session_id?: number;
  language?: string;
  suggestedQuestions?: string[];
}

export interface SuggestedQuestion {
  id: string;
  text: string;
}
