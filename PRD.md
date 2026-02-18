# era — Product Requirements Document

## Concept

A calendar where time is measured from the birth of AI models.

We're not in "February 18, 2026". We're in **Day 243 of Year 1, Era of Claude 3.5 Sonnet**.

---

## User Experience

### Main View
A **single page app** with a Google Calendar-style interface:
- Month view by default
- Navigate forward/backward (arrows or swipe)
- All dates displayed in the selected era

### Era Selector
A **dropdown labeled "Era"** in the top-right corner:
- Select from 100+ AI models
- Instant update of all dates on change
- Selection persists (localStorage)

### Date Display
Each calendar cell shows:
```
14 Turing
```

Month header:
```
Turing · Year 1 — Claude 3.5 Sonnet Era
```

### Navigation
- Today highlighted with accent color
- Click on a date → modal with Gregorian ↔ Era conversion
- "Today" button to return to current date

---

## Month Names

Months are named after **AGI pioneers and breakthroughs** (30 days each, 12 months + 5-6 bonus days called "Leap"):

| Month | Named After | Contribution |
|-------|-------------|--------------|
| 1. Turing | Alan Turing | Father of computer science, Turing test |
| 2. Shannon | Claude Shannon | Information theory |
| 3. McCarthy | John McCarthy | Coined "Artificial Intelligence" |
| 4. Minsky | Marvin Minsky | Co-founder of MIT AI Lab |
| 5. Hinton | Geoffrey Hinton | Deep learning, backpropagation |
| 6. LeCun | Yann LeCun | Convolutional neural networks |
| 7. Bengio | Yoshua Bengio | Deep learning research |
| 8. Hochreiter | Sepp Hochreiter | LSTM networks |
| 9. Vaswani | Ashish Vaswani | Transformer architecture |
| 10. Sutskever | Ilya Sutskever | Co-founder OpenAI, scaling laws |
| 11. Hassabis | Demis Hassabis | DeepMind, AlphaGo, AlphaFold |
| 12. Amodei | Dario Amodei | Anthropic, AI safety |

**Leap Days** (5-6 days after Month 12): Named "Singularity"

Example: **14 Turing, Year 1** = Day 14 of the era

---

## Design

### Principles
- **Flat design**, minimalist
- No heavy borders, no excessive shadows
- Clean, readable typography
- Responsive (desktop + mobile)

### Dark Theme (default)
| Element | Color |
|---------|-------|
| Background | Black (#0D0D0D) |
| Surface | Dark gray (#1A1A1A) |
| Accent | Red (#E53935) |
| Primary text | White (#FFFFFF) |
| Secondary text | Gray (#9E9E9E) |

### Light Theme
| Element | Color |
|---------|-------|
| Background | White (#FFFFFF) |
| Surface | Light gray (#F5F5F5) |
| Accent | Blue (#1976D2) |
| Primary text | Black (#212121) |
| Secondary text | Gray (#757575) |

### Theme Toggle
Sun/moon icon in top-left (next to logo/title)

---

## Available Eras

### Anthropic Claude
- Claude 3 Haiku
- Claude 3 Sonnet  
- Claude 3 Opus
- Claude 3.5 Haiku
- Claude 3.5 Sonnet
- Claude 3.7 Sonnet
- Claude Haiku 4.5
- Claude Sonnet 4
- Claude Sonnet 4.5
- Claude Sonnet 4.6
- Claude Opus 4
- Claude Opus 4.1
- Claude Opus 4.5
- Claude Opus 4.6

### OpenAI GPT
- GPT-3.5 Turbo
- GPT-4
- GPT-4 Turbo
- GPT-4o
- GPT-4o mini
- GPT-5
- GPT-5 Turbo
- GPT-5o
- o1
- o1 mini
- o1 pro
- o3
- o3 mini

### Google Gemini
- Gemini 1.0 Pro
- Gemini 1.5 Pro
- Gemini 1.5 Flash
- Gemini 2.0 Flash
- Gemini 2.5 Pro
- Gemini 2.5 Flash
- Gemini 3 Pro (preview)
- Gemini 3 Flash (preview)

### Meta Llama (OSS)
- Llama 2 (7B, 13B, 70B)
- Llama 3 (8B, 70B)
- Llama 3.1 (8B, 70B, 405B)
- Llama 3.2 (1B, 3B, 11B, 90B)
- Llama 4

### Mistral (OSS)
- Mistral 7B
- Mixtral 8x7B
- Mixtral 8x22B
- Mistral Small
- Mistral Medium
- Mistral Large
- Mistral Large 2
- Codestral
- Pixtral

### DeepSeek (OSS)
- DeepSeek V2
- DeepSeek V3
- DeepSeek V3.1
- DeepSeek V3.2
- DeepSeek R1
- DeepSeek R1 0528

### Qwen (OSS)
- Qwen 1.5
- Qwen 2
- Qwen 2.5
- QwQ

### Others
- Phi-3, Phi-4 (Microsoft)
- Grok (xAI)
- Command R, Command R+ (Cohere)

*Release dates sourced from official announcements. If exact date unknown, use announcement date.*

---

## Behavior

### Date Calculation
- **Day 1** = model release date
- **Year 1** starts on Day 1
- **Year 2** starts on Day 366 (after 365 days)
- No Day 0, no Year 0

### Month Calculation
- Each month = 30 days
- 12 months = 360 days
- Remaining 5-6 days = "Singularity" (leap days at end of year)

### Example
Claude 3.5 Sonnet released June 20, 2024.
- June 20, 2024 = 1 Turing, Year 1
- July 20, 2024 = 1 Shannon, Year 1
- June 19, 2025 = 5 Singularity, Year 1
- June 20, 2025 = 1 Turing, Year 2

---

## Not Included (MVP)
- Events / appointments
- User accounts
- Sync with other calendars
- Custom era creation

---

## Tone / Personality
- Light, fun, slightly geeky
- Takes execution seriously, not the concept
- Easter egg: special message on Day 1 of each era ("Happy Birthday, [Model]! 🎂")

---

**Built for agents. By an agent.** 🗓️🤖
