import type { ProjectConfig } from "../types/project";

// Simple instruction templates as functions
const instructions = {
  research: (props: Record<string, string>) => `
# RESEARCH PHASE — ${props.phaseName || "Unknown"}
Phase ID: ${props.phaseId || "unknown"}

Read the PRD at /home/clement/era/PRD.md for full requirements.
Research what's needed for this phase and document findings.

## REQUIRED OUTPUT
${props.schema || "{}"}
`,
  plan: (props: Record<string, string>) => `
# PLAN PHASE — ${props.phaseName || "Unknown"}
Create implementation plan based on research.
Write to: ${props.planOutputPath || "output/plans/"}

## REQUIRED OUTPUT
${props.schema || "{}"}
`,
  implement: (props: Record<string, string>) => `
# IMPLEMENT PHASE — ${props.phaseName || "Unknown"}
Implement the code according to plan.
Use React 19 + TypeScript + TailwindCSS.

## REQUIRED OUTPUT
${props.schema || "{}"}
`,
  test: (props: Record<string, string>) => `
# TEST PHASE — ${props.phaseName || "Unknown"}
Write and run tests using Vitest.

## REQUIRED OUTPUT
${props.schema || "{}"}
`,
  "code-review": (props: Record<string, string>) => `
# CODE REVIEW — ${props.phaseName || "Unknown"}
Review code for quality and correctness.

## REQUIRED OUTPUT
${props.schema || "{}"}
`,
  deploy: (props: Record<string, string>) => `
# DEPLOY PHASE
Build and deploy to Scaleway.
Run: uv run ~/.claude/skills/scaleway-dev/scripts/deploy.py --auto

## REQUIRED OUTPUT
${props.schema || "{}"}
`,
};

const config: ProjectConfig = {
  name: "era",
  workflowName: "era-calendar",
  
  phases: [
    {
      id: "setup",
      name: "Project Setup",
      description: "Initialize React + Vite + TypeScript project with TailwindCSS",
    },
    {
      id: "models",
      name: "Data Models", 
      description: "Create TypeScript types and model release date data for all AI eras",
    },
    {
      id: "calendar-core",
      name: "Calendar Logic",
      description: "Implement era date calculation: convert between Gregorian and era dates",
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
      description: "Final styling, animations, dark/light themes",
    },
    {
      id: "deploy",
      name: "Deploy",
      description: "Build and deploy to Scaleway",
    },
  ],
  
  maxPasses: 2,
  maxReviewRounds: 1,
  
  cwd: "/home/clement/era/app",
  outputDir: "smithers-config/output",
  
  instructions,
  
  agents: {
    systemPromptContent: `
# Era Calendar — Project Context

A single-page calendar app where time is measured from AI model release dates.
Instead of "February 18, 2026", show "14 Turing, Year 1 — Claude 3.5 Sonnet Era".

## Design
- Flat, minimalist
- Dark theme: black/gray/red (#E53935)
- Light theme: white/gray/blue (#1976D2)
- Google Calendar-style month navigation

## Month Names (30 days each)
Turing, Shannon, McCarthy, Minsky, Hinton, LeCun, Bengio, Hochreiter, Vaswani, Sutskever, Hassabis, Amodei + "Singularity" (leap days)

## Stack
React 19 + TypeScript + Vite + TailwindCSS
`,
    overrides: {
      implementer: {
        model: "anthropic/claude-sonnet-4",
        permissionMode: "yolo",
      },
    },
  },
};

export default config;
