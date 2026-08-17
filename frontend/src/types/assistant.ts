export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface ChatRequest {
  message: string;
  history?: ChatMessage[];
}

export interface ChatResponse {
  reply: string;
  suggestedQuestions?: string[];
}

export interface SuggestedQuestion {
  id: string;
  text: string;
}
