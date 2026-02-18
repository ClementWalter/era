export interface Era {
  id: string;
  name: string;
  releaseDate: Date;
  provider: string;
}

export const MONTH_NAMES = [
  'Turing',    // Alan Turing
  'Shannon',   // Claude Shannon
  'McCarthy',  // John McCarthy
  'Minsky',    // Marvin Minsky
  'Hinton',    // Geoffrey Hinton
  'LeCun',     // Yann LeCun
  'Bengio',    // Yoshua Bengio
  'Hochreiter',// Sepp Hochreiter
  'Vaswani',   // Ashish Vaswani
  'Sutskever', // Ilya Sutskever
  'Hassabis',  // Demis Hassabis
  'Amodei',    // Dario Amodei
] as const;

export const MONTH_INFO = [
  { name: 'Turing', person: 'Alan Turing', contribution: 'Father of computer science, Turing test' },
  { name: 'Shannon', person: 'Claude Shannon', contribution: 'Information theory' },
  { name: 'McCarthy', person: 'John McCarthy', contribution: 'Coined "Artificial Intelligence"' },
  { name: 'Minsky', person: 'Marvin Minsky', contribution: 'Co-founder of MIT AI Lab' },
  { name: 'Hinton', person: 'Geoffrey Hinton', contribution: 'Deep learning, backpropagation' },
  { name: 'LeCun', person: 'Yann LeCun', contribution: 'Convolutional neural networks' },
  { name: 'Bengio', person: 'Yoshua Bengio', contribution: 'Deep learning research' },
  { name: 'Hochreiter', person: 'Sepp Hochreiter', contribution: 'LSTM networks' },
  { name: 'Vaswani', person: 'Ashish Vaswani', contribution: 'Transformer architecture' },
  { name: 'Sutskever', person: 'Ilya Sutskever', contribution: 'Co-founder OpenAI, scaling laws' },
  { name: 'Hassabis', person: 'Demis Hassabis', contribution: 'DeepMind, AlphaGo, AlphaFold' },
  { name: 'Amodei', person: 'Dario Amodei', contribution: 'Anthropic, AI safety' },
] as const;

export const LEAP_MONTH = 'Singularity';

export const ERAS: Era[] = [
  // ============ ANTHROPIC CLAUDE ============
  // Claude 1.x
  { id: 'claude-1', name: 'Claude', releaseDate: new Date('2023-03-14'), provider: 'Anthropic' },
  { id: 'claude-instant-1.2', name: 'Claude Instant 1.2', releaseDate: new Date('2023-08-09'), provider: 'Anthropic' },
  
  // Claude 2.x
  { id: 'claude-2', name: 'Claude 2', releaseDate: new Date('2023-07-11'), provider: 'Anthropic' },
  { id: 'claude-2.1', name: 'Claude 2.1', releaseDate: new Date('2023-11-21'), provider: 'Anthropic' },
  
  // Claude 3.x
  { id: 'claude-3', name: 'Claude 3', releaseDate: new Date('2024-03-04'), provider: 'Anthropic' },
  { id: 'claude-3.5-sonnet', name: 'Claude 3.5 Sonnet', releaseDate: new Date('2024-06-20'), provider: 'Anthropic' },
  { id: 'claude-3.5-haiku', name: 'Claude 3.5 Haiku', releaseDate: new Date('2024-10-22'), provider: 'Anthropic' },
  { id: 'claude-3.7-sonnet', name: 'Claude 3.7 Sonnet', releaseDate: new Date('2025-02-24'), provider: 'Anthropic' },
  
  // Claude 4.x
  { id: 'claude-sonnet-4', name: 'Claude Sonnet 4', releaseDate: new Date('2025-05-22'), provider: 'Anthropic' },
  { id: 'claude-opus-4', name: 'Claude Opus 4', releaseDate: new Date('2025-05-22'), provider: 'Anthropic' },
  { id: 'claude-opus-4.1', name: 'Claude Opus 4.1', releaseDate: new Date('2025-08-05'), provider: 'Anthropic' },
  { id: 'claude-sonnet-4.5', name: 'Claude Sonnet 4.5', releaseDate: new Date('2025-09-29'), provider: 'Anthropic' },
  { id: 'claude-haiku-4.5', name: 'Claude Haiku 4.5', releaseDate: new Date('2025-10-15'), provider: 'Anthropic' },
  { id: 'claude-opus-4.5', name: 'Claude Opus 4.5', releaseDate: new Date('2025-11-24'), provider: 'Anthropic' },
  { id: 'claude-opus-4.6', name: 'Claude Opus 4.6', releaseDate: new Date('2026-02-05'), provider: 'Anthropic' },
  { id: 'claude-sonnet-4.6', name: 'Claude Sonnet 4.6', releaseDate: new Date('2026-02-17'), provider: 'Anthropic' },
  
  // ============ OPENAI GPT ============
  { id: 'gpt-3.5', name: 'GPT-3.5', releaseDate: new Date('2022-11-30'), provider: 'OpenAI' },
  { id: 'gpt-4', name: 'GPT-4', releaseDate: new Date('2023-03-14'), provider: 'OpenAI' },
  { id: 'gpt-4o', name: 'GPT-4o', releaseDate: new Date('2024-05-13'), provider: 'OpenAI' },
  { id: 'gpt-4o-mini', name: 'GPT-4o Mini', releaseDate: new Date('2024-07-18'), provider: 'OpenAI' },
  
  // o1 series
  { id: 'o1-preview', name: 'o1 Preview', releaseDate: new Date('2024-09-12'), provider: 'OpenAI' },
  { id: 'o1-mini', name: 'o1 Mini', releaseDate: new Date('2024-09-12'), provider: 'OpenAI' },
  { id: 'o1', name: 'o1', releaseDate: new Date('2024-12-17'), provider: 'OpenAI' },
  { id: 'o1-pro', name: 'o1 Pro', releaseDate: new Date('2024-12-17'), provider: 'OpenAI' },
  
  // o3 series
  { id: 'o3-mini', name: 'o3 Mini', releaseDate: new Date('2025-01-31'), provider: 'OpenAI' },
  { id: 'o3-mini-high', name: 'o3 Mini High', releaseDate: new Date('2025-01-31'), provider: 'OpenAI' },
  { id: 'gpt-4.5', name: 'GPT-4.5', releaseDate: new Date('2025-02-27'), provider: 'OpenAI' },
  { id: 'gpt-4.1', name: 'GPT-4.1', releaseDate: new Date('2025-04-14'), provider: 'OpenAI' },
  { id: 'gpt-4.1-mini', name: 'GPT-4.1 Mini', releaseDate: new Date('2025-04-14'), provider: 'OpenAI' },
  { id: 'o3', name: 'o3', releaseDate: new Date('2025-04-16'), provider: 'OpenAI' },
  { id: 'o4-mini', name: 'o4 Mini', releaseDate: new Date('2025-04-16'), provider: 'OpenAI' },
  { id: 'o4-mini-high', name: 'o4 Mini High', releaseDate: new Date('2025-04-16'), provider: 'OpenAI' },
  { id: 'o3-pro', name: 'o3 Pro', releaseDate: new Date('2025-06-15'), provider: 'OpenAI' },
  
  // GPT-5 series
  { id: 'gpt-5', name: 'GPT-5', releaseDate: new Date('2025-08-07'), provider: 'OpenAI' },
  { id: 'gpt-5-mini', name: 'GPT-5 Mini', releaseDate: new Date('2025-08-07'), provider: 'OpenAI' },
  { id: 'gpt-5.1', name: 'GPT-5.1', releaseDate: new Date('2025-11-12'), provider: 'OpenAI' },
  { id: 'gpt-5.2', name: 'GPT-5.2', releaseDate: new Date('2025-12-11'), provider: 'OpenAI' },
  { id: 'gpt-5.3-codex', name: 'GPT-5.3 Codex', releaseDate: new Date('2026-02-05'), provider: 'OpenAI' },
  
  // ============ GOOGLE GEMINI ============
  { id: 'gemini-1.0-pro', name: 'Gemini 1.0 Pro', releaseDate: new Date('2023-12-06'), provider: 'Google' },
  { id: 'gemini-1.0-ultra', name: 'Gemini 1.0 Ultra', releaseDate: new Date('2024-02-08'), provider: 'Google' },
  { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro', releaseDate: new Date('2024-02-15'), provider: 'Google' },
  { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash', releaseDate: new Date('2024-05-14'), provider: 'Google' },
  { id: 'gemini-1.5-pro-002', name: 'Gemini 1.5 Pro 002', releaseDate: new Date('2024-09-24'), provider: 'Google' },
  { id: 'gemini-1.5-flash-002', name: 'Gemini 1.5 Flash 002', releaseDate: new Date('2024-09-24'), provider: 'Google' },
  { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash', releaseDate: new Date('2024-12-11'), provider: 'Google' },
  { id: 'gemini-2.0-flash-thinking', name: 'Gemini 2.0 Flash Thinking', releaseDate: new Date('2024-12-19'), provider: 'Google' },
  { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro', releaseDate: new Date('2025-03-25'), provider: 'Google' },
  { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', releaseDate: new Date('2025-04-17'), provider: 'Google' },
  { id: 'gemini-3.0-pro', name: 'Gemini 3.0 Pro', releaseDate: new Date('2025-12-01'), provider: 'Google' },
  
  // ============ META LLAMA ============
  { id: 'llama-2-7b', name: 'Llama 2 7B', releaseDate: new Date('2023-07-18'), provider: 'Meta' },
  { id: 'llama-2-13b', name: 'Llama 2 13B', releaseDate: new Date('2023-07-18'), provider: 'Meta' },
  { id: 'llama-2-70b', name: 'Llama 2 70B', releaseDate: new Date('2023-07-18'), provider: 'Meta' },
  { id: 'llama-3-8b', name: 'Llama 3 8B', releaseDate: new Date('2024-04-18'), provider: 'Meta' },
  { id: 'llama-3-70b', name: 'Llama 3 70B', releaseDate: new Date('2024-04-18'), provider: 'Meta' },
  { id: 'llama-3.1-8b', name: 'Llama 3.1 8B', releaseDate: new Date('2024-07-23'), provider: 'Meta' },
  { id: 'llama-3.1-70b', name: 'Llama 3.1 70B', releaseDate: new Date('2024-07-23'), provider: 'Meta' },
  { id: 'llama-3.1-405b', name: 'Llama 3.1 405B', releaseDate: new Date('2024-07-23'), provider: 'Meta' },
  { id: 'llama-3.2-1b', name: 'Llama 3.2 1B', releaseDate: new Date('2024-09-25'), provider: 'Meta' },
  { id: 'llama-3.2-3b', name: 'Llama 3.2 3B', releaseDate: new Date('2024-09-25'), provider: 'Meta' },
  { id: 'llama-3.2-11b', name: 'Llama 3.2 11B Vision', releaseDate: new Date('2024-09-25'), provider: 'Meta' },
  { id: 'llama-3.2-90b', name: 'Llama 3.2 90B Vision', releaseDate: new Date('2024-09-25'), provider: 'Meta' },
  { id: 'llama-3.3-70b', name: 'Llama 3.3 70B', releaseDate: new Date('2024-12-06'), provider: 'Meta' },
  { id: 'llama-4', name: 'Llama 4', releaseDate: new Date('2025-04-05'), provider: 'Meta' },
  { id: 'llama-4-maverick', name: 'Llama 4 Maverick', releaseDate: new Date('2025-04-05'), provider: 'Meta' },
  { id: 'llama-4-scout', name: 'Llama 4 Scout', releaseDate: new Date('2025-04-05'), provider: 'Meta' },
  
  // ============ MISTRAL ============
  { id: 'mistral-7b-v0.1', name: 'Mistral 7B v0.1', releaseDate: new Date('2023-09-27'), provider: 'Mistral' },
  { id: 'mistral-7b-v0.2', name: 'Mistral 7B v0.2', releaseDate: new Date('2023-12-11'), provider: 'Mistral' },
  { id: 'mixtral-8x7b', name: 'Mixtral 8x7B', releaseDate: new Date('2023-12-11'), provider: 'Mistral' },
  { id: 'mixtral-8x22b', name: 'Mixtral 8x22B', releaseDate: new Date('2024-04-17'), provider: 'Mistral' },
  { id: 'mistral-small', name: 'Mistral Small', releaseDate: new Date('2024-02-26'), provider: 'Mistral' },
  { id: 'mistral-medium', name: 'Mistral Medium', releaseDate: new Date('2023-12-11'), provider: 'Mistral' },
  { id: 'mistral-large', name: 'Mistral Large', releaseDate: new Date('2024-02-26'), provider: 'Mistral' },
  { id: 'mistral-large-2', name: 'Mistral Large 2', releaseDate: new Date('2024-07-24'), provider: 'Mistral' },
  { id: 'codestral', name: 'Codestral', releaseDate: new Date('2024-05-29'), provider: 'Mistral' },
  { id: 'pixtral-12b', name: 'Pixtral 12B', releaseDate: new Date('2024-09-11'), provider: 'Mistral' },
  { id: 'pixtral-large', name: 'Pixtral Large', releaseDate: new Date('2024-11-18'), provider: 'Mistral' },
  { id: 'mistral-small-3', name: 'Mistral Small 3', releaseDate: new Date('2025-01-30'), provider: 'Mistral' },
  
  // ============ DEEPSEEK ============
  { id: 'deepseek-v1', name: 'DeepSeek V1', releaseDate: new Date('2024-01-05'), provider: 'DeepSeek' },
  { id: 'deepseek-v2', name: 'DeepSeek V2', releaseDate: new Date('2024-05-06'), provider: 'DeepSeek' },
  { id: 'deepseek-v2.5', name: 'DeepSeek V2.5', releaseDate: new Date('2024-09-05'), provider: 'DeepSeek' },
  { id: 'deepseek-v3', name: 'DeepSeek V3', releaseDate: new Date('2024-12-26'), provider: 'DeepSeek' },
  { id: 'deepseek-r1-lite', name: 'DeepSeek R1 Lite', releaseDate: new Date('2024-11-20'), provider: 'DeepSeek' },
  { id: 'deepseek-r1', name: 'DeepSeek R1', releaseDate: new Date('2025-01-20'), provider: 'DeepSeek' },
  { id: 'deepseek-r1-0528', name: 'DeepSeek R1 0528', releaseDate: new Date('2025-05-28'), provider: 'DeepSeek' },
  
  // ============ QWEN (Alibaba) ============
  { id: 'qwen-1.5-7b', name: 'Qwen 1.5 7B', releaseDate: new Date('2024-02-05'), provider: 'Alibaba' },
  { id: 'qwen-1.5-72b', name: 'Qwen 1.5 72B', releaseDate: new Date('2024-02-05'), provider: 'Alibaba' },
  { id: 'qwen-2-7b', name: 'Qwen 2 7B', releaseDate: new Date('2024-06-07'), provider: 'Alibaba' },
  { id: 'qwen-2-72b', name: 'Qwen 2 72B', releaseDate: new Date('2024-06-07'), provider: 'Alibaba' },
  { id: 'qwen-2.5-7b', name: 'Qwen 2.5 7B', releaseDate: new Date('2024-09-19'), provider: 'Alibaba' },
  { id: 'qwen-2.5-32b', name: 'Qwen 2.5 32B', releaseDate: new Date('2024-09-19'), provider: 'Alibaba' },
  { id: 'qwen-2.5-72b', name: 'Qwen 2.5 72B', releaseDate: new Date('2024-09-19'), provider: 'Alibaba' },
  { id: 'qwen-2.5-coder-32b', name: 'Qwen 2.5 Coder 32B', releaseDate: new Date('2024-11-12'), provider: 'Alibaba' },
  { id: 'qwq-32b', name: 'QwQ 32B', releaseDate: new Date('2024-11-28'), provider: 'Alibaba' },
  { id: 'qwen-3-8b', name: 'Qwen 3 8B', releaseDate: new Date('2025-04-29'), provider: 'Alibaba' },
  { id: 'qwen-3-72b', name: 'Qwen 3 72B', releaseDate: new Date('2025-04-29'), provider: 'Alibaba' },
  
  // ============ OTHER ============
  // xAI Grok
  { id: 'grok-1', name: 'Grok 1', releaseDate: new Date('2023-11-04'), provider: 'xAI' },
  { id: 'grok-1.5', name: 'Grok 1.5', releaseDate: new Date('2024-03-28'), provider: 'xAI' },
  { id: 'grok-2', name: 'Grok 2', releaseDate: new Date('2024-08-13'), provider: 'xAI' },
  { id: 'grok-3', name: 'Grok 3', releaseDate: new Date('2025-02-17'), provider: 'xAI' },
  
  // Microsoft Phi
  { id: 'phi-3-mini', name: 'Phi-3 Mini', releaseDate: new Date('2024-04-23'), provider: 'Microsoft' },
  { id: 'phi-3-small', name: 'Phi-3 Small', releaseDate: new Date('2024-05-21'), provider: 'Microsoft' },
  { id: 'phi-3-medium', name: 'Phi-3 Medium', releaseDate: new Date('2024-05-21'), provider: 'Microsoft' },
  { id: 'phi-3.5-mini', name: 'Phi-3.5 Mini', releaseDate: new Date('2024-08-20'), provider: 'Microsoft' },
  { id: 'phi-4', name: 'Phi-4', releaseDate: new Date('2024-12-12'), provider: 'Microsoft' },
  
  // Cohere
  { id: 'command-r', name: 'Command R', releaseDate: new Date('2024-03-11'), provider: 'Cohere' },
  { id: 'command-r-plus', name: 'Command R+', releaseDate: new Date('2024-04-04'), provider: 'Cohere' },
  { id: 'command-r-08-2024', name: 'Command R 08-2024', releaseDate: new Date('2024-08-01'), provider: 'Cohere' },
  { id: 'command-a', name: 'Command A', releaseDate: new Date('2025-03-13'), provider: 'Cohere' },
  
].sort((a, b) => b.releaseDate.getTime() - a.releaseDate.getTime());

// Default to most recent model (list is sorted newest first)
export const DEFAULT_ERA = ERAS[0];
