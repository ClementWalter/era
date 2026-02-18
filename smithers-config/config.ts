import type { ProjectConfig } from "../types/project";
import { ResearchInstructions } from "./instructions/research.mdx";
import { PlanInstructions } from "./instructions/plan.mdx";
import { ImplementInstructions } from "./instructions/implement.mdx";
import { TestInstructions } from "./instructions/test.mdx";
import { CodeReviewInstructions } from "./instructions/code-review.mdx";
import { DeployInstructions } from "./instructions/deploy.mdx";

const config: ProjectConfig = {
  name: "era",
  workflowName: "era-calendar",
  
  phases: [
    {
      id: "setup",
      name: "Project Setup",
      description: "Initialize React + Vite + TypeScript project with TailwindCSS",
      metadata: {
        stack: "React 19, Vite, TypeScript, TailwindCSS",
      },
    },
    {
      id: "models",
      name: "Data Models",
      description: "Create TypeScript types and model release date data for all AI eras",
      metadata: {
        models: "Claude, GPT, Gemini, Llama, Mistral, DeepSeek, Qwen",
      },
    },
    {
      id: "calendar-core",
      name: "Calendar Logic",
      description: "Implement era date calculation: convert between Gregorian and era dates",
      metadata: {
        monthNames: "Turing, Shannon, McCarthy, Minsky, Hinton, LeCun, Bengio, Hochreiter, Vaswani, Sutskever, Hassabis, Amodei",
      },
    },
    {
      id: "ui-calendar",
      name: "Calendar UI",
      description: "Build the Google Calendar-style month view component",
    },
    {
      id: "ui-chrome",
      name: "App Chrome",
      description: "Era selector dropdown, theme toggle, header, responsive layout",
    },
    {
      id: "polish",
      name: "Polish",
      description: "Final styling, animations, dark/light themes, build optimization",
    },
    {
      id: "deploy",
      name: "Deploy",
      description: "Build production bundle and deploy to Scaleway using the scaleway-dev skill",
      metadata: {
        target: "Scaleway Serverless Container or Object Storage",
        skill: "scaleway-dev",
      },
    },
  ],
  
  maxPasses: 3,
  maxReviewRounds: 2,
  
  cwd: "/home/clement/era/app",
  outputDir: "smithers-config/output",
  
  instructions: {
    research: ResearchInstructions,
    plan: PlanInstructions,
    implement: ImplementInstructions,
    test: TestInstructions,
    "code-review": CodeReviewInstructions,
    deploy: DeployInstructions,
  },
  
  agents: {
    systemPromptContent: `
# Era Calendar — Project Context

## What We're Building
A single-page calendar app where time is measured from AI model release dates.
Instead of "February 18, 2026", we show "14 Turing, Year 1 — Claude 3.5 Sonnet Era".

## Design Principles
- Flat, minimalist design
- Dark theme (default): black/gray/red (#E53935 accent)
- Light theme: white/gray/blue (#1976D2 accent)
- Google Calendar-style month navigation
- Era dropdown in top-right, theme toggle in top-left

## Month Names (30 days each)
1. Turing, 2. Shannon, 3. McCarthy, 4. Minsky, 5. Hinton, 6. LeCun,
7. Bengio, 8. Hochreiter, 9. Vaswani, 10. Sutskever, 11. Hassabis, 12. Amodei
+ "Singularity" (5-6 leap days)

## Technical Stack
- React 19 + TypeScript
- Vite for build
- TailwindCSS for styling
- No backend needed (static SPA)

## Key Files
- PRD.md — Full product requirements
- app/ — React application code
    `,
    overrides: {
      implementer: {
        model: "anthropic/claude-sonnet-4",
        permissionMode: "yolo",
      },
      codeReviewer: {
        model: "anthropic/claude-sonnet-4",
      },
    },
  },
};

export default config;
