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

export const LEAP_MONTH = 'Singularity';

export const ERAS: Era[] = [
  // Anthropic Claude
  { id: 'claude-3-opus', name: 'Claude 3 Opus', releaseDate: new Date('2024-03-04'), provider: 'Anthropic' },
  { id: 'claude-3-sonnet', name: 'Claude 3 Sonnet', releaseDate: new Date('2024-03-04'), provider: 'Anthropic' },
  { id: 'claude-3-haiku', name: 'Claude 3 Haiku', releaseDate: new Date('2024-03-13'), provider: 'Anthropic' },
  { id: 'claude-3.5-sonnet', name: 'Claude 3.5 Sonnet', releaseDate: new Date('2024-06-20'), provider: 'Anthropic' },
  { id: 'claude-3.5-haiku', name: 'Claude 3.5 Haiku', releaseDate: new Date('2024-11-05'), provider: 'Anthropic' },
  { id: 'claude-3.7-sonnet', name: 'Claude 3.7 Sonnet', releaseDate: new Date('2025-02-24'), provider: 'Anthropic' },
  { id: 'claude-sonnet-4', name: 'Claude Sonnet 4', releaseDate: new Date('2025-05-22'), provider: 'Anthropic' },
  { id: 'claude-opus-4', name: 'Claude Opus 4', releaseDate: new Date('2025-05-22'), provider: 'Anthropic' },
  
  // OpenAI GPT
  { id: 'gpt-4', name: 'GPT-4', releaseDate: new Date('2023-03-14'), provider: 'OpenAI' },
  { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', releaseDate: new Date('2023-11-06'), provider: 'OpenAI' },
  { id: 'gpt-4o', name: 'GPT-4o', releaseDate: new Date('2024-05-13'), provider: 'OpenAI' },
  { id: 'gpt-4o-mini', name: 'GPT-4o Mini', releaseDate: new Date('2024-07-18'), provider: 'OpenAI' },
  { id: 'o1', name: 'o1', releaseDate: new Date('2024-09-12'), provider: 'OpenAI' },
  { id: 'o1-mini', name: 'o1 Mini', releaseDate: new Date('2024-09-12'), provider: 'OpenAI' },
  { id: 'o3-mini', name: 'o3 Mini', releaseDate: new Date('2025-01-31'), provider: 'OpenAI' },
  { id: 'gpt-5', name: 'GPT-5', releaseDate: new Date('2025-06-01'), provider: 'OpenAI' },
  
  // Google Gemini
  { id: 'gemini-1.0-pro', name: 'Gemini 1.0 Pro', releaseDate: new Date('2023-12-06'), provider: 'Google' },
  { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro', releaseDate: new Date('2024-02-15'), provider: 'Google' },
  { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash', releaseDate: new Date('2024-05-14'), provider: 'Google' },
  { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash', releaseDate: new Date('2024-12-11'), provider: 'Google' },
  { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro', releaseDate: new Date('2025-03-25'), provider: 'Google' },
  
  // Meta Llama
  { id: 'llama-2', name: 'Llama 2', releaseDate: new Date('2023-07-18'), provider: 'Meta' },
  { id: 'llama-3', name: 'Llama 3', releaseDate: new Date('2024-04-18'), provider: 'Meta' },
  { id: 'llama-3.1', name: 'Llama 3.1', releaseDate: new Date('2024-07-23'), provider: 'Meta' },
  { id: 'llama-3.2', name: 'Llama 3.2', releaseDate: new Date('2024-09-25'), provider: 'Meta' },
  { id: 'llama-4', name: 'Llama 4', releaseDate: new Date('2025-04-05'), provider: 'Meta' },
  
  // Mistral
  { id: 'mistral-7b', name: 'Mistral 7B', releaseDate: new Date('2023-09-27'), provider: 'Mistral' },
  { id: 'mixtral-8x7b', name: 'Mixtral 8x7B', releaseDate: new Date('2023-12-11'), provider: 'Mistral' },
  { id: 'mistral-large', name: 'Mistral Large', releaseDate: new Date('2024-02-26'), provider: 'Mistral' },
  { id: 'mistral-large-2', name: 'Mistral Large 2', releaseDate: new Date('2024-07-24'), provider: 'Mistral' },
  
  // DeepSeek
  { id: 'deepseek-v2', name: 'DeepSeek V2', releaseDate: new Date('2024-05-06'), provider: 'DeepSeek' },
  { id: 'deepseek-v3', name: 'DeepSeek V3', releaseDate: new Date('2024-12-26'), provider: 'DeepSeek' },
  { id: 'deepseek-r1', name: 'DeepSeek R1', releaseDate: new Date('2025-01-20'), provider: 'DeepSeek' },
  
  // Qwen
  { id: 'qwen-2', name: 'Qwen 2', releaseDate: new Date('2024-06-07'), provider: 'Alibaba' },
  { id: 'qwen-2.5', name: 'Qwen 2.5', releaseDate: new Date('2024-09-19'), provider: 'Alibaba' },
  { id: 'qwq', name: 'QwQ', releaseDate: new Date('2024-11-28'), provider: 'Alibaba' },
].sort((a, b) => b.releaseDate.getTime() - a.releaseDate.getTime());

export const DEFAULT_ERA = ERAS.find(e => e.id === 'claude-3.5-sonnet')!;
