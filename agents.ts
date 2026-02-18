// agents.ts — Generic agent factory with per-role overrides from project config
//
// The project config provides:
// - systemPromptContent: domain-specific context, rules, conventions
// - overrides: per-role model, timeout, permission mode adjustments

import { ClaudeCodeAgent, CodexAgent } from "smithers-orchestrator";
import { project } from "./project.js";
import type { AgentRole } from "./types/project.js";

// ─────────────────────────────────────────────────────────────
// Generic system prompt sections (project-agnostic)
// ─────────────────────────────────────────────────────────────

const WORKSPACE_POLICY = `
## WORKSPACE POLICY

Uncommitted changes in the worktree are expected and normal.
Do NOT refuse to work because of dirty git state. Proceed with implementation regardless.
Other agents in this workflow may have made changes that are not yet committed.
`;

const JSON_OUTPUT = `
CRITICAL OUTPUT REQUIREMENT:
When you have completed your work, you MUST end your response with a JSON object
wrapped in a code fence. The JSON format is specified in your task prompt.
Do NOT output natural language after the JSON block.
`;

// ─────────────────────────────────────────────────────────────
// Defaults per agent role
// ─────────────────────────────────────────────────────────────

const ROLE_DEFAULTS: Record<
  AgentRole,
  {
    model: string;
    timeoutMs: number;
    permissionMode: "default" | "yolo";
    description: string;
  }
> = {
  implementer: {
    model: "gpt-5.3-codex",
    timeoutMs: 3600000, // 60 min
    permissionMode: "yolo",
    description: "Implementer — Write code and make changes",
  },
  researcher: {
    model: "claude-opus-4-6",
    timeoutMs: 1800000, // 30 min
    permissionMode: "default",
    description:
      "Researcher — Gather reference material from existing codebases",
  },
  prdReviewer: {
    model: "claude-opus-4-6",
    timeoutMs: 1800000,
    permissionMode: "default",
    description: "Spec Reviewer — Verify implementation matches specification",
  },
  codeReviewer: {
    model: "claude-opus-4-6",
    timeoutMs: 1800000,
    permissionMode: "default",
    description:
      "Code Reviewer — Check code quality, conventions, test coverage, security",
  },
  finalReviewer: {
    model: "claude-opus-4-6",
    timeoutMs: 1800000,
    permissionMode: "default",
    description:
      "Final Reviewer — Decide if a phase is complete and ready to move on",
  },
};

// ─────────────────────────────────────────────────────────────
// System prompt builder
// ─────────────────────────────────────────────────────────────

function buildSystemPrompt(role: AgentRole): string {
  const defaults = ROLE_DEFAULTS[role];
  const override = project.agents.overrides?.[role];

  return [
    `# Role: ${defaults.description}`,
    project.agents.systemPromptContent,
    override?.systemPrompt ?? "",
    WORKSPACE_POLICY,
    JSON_OUTPUT,
  ]
    .filter(Boolean)
    .join("\n\n");
}

// ─────────────────────────────────────────────────────────────
// Resolved config (defaults merged with project overrides)
// ─────────────────────────────────────────────────────────────

function resolveConfig(role: AgentRole) {
  const defaults = ROLE_DEFAULTS[role];
  const override = project.agents.overrides?.[role] ?? {};
  return {
    model: override.model ?? defaults.model,
    timeoutMs: override.timeoutMs ?? defaults.timeoutMs,
    permissionMode: override.permissionMode ?? defaults.permissionMode,
  };
}

// ─────────────────────────────────────────────────────────────
// Agent factories
// ─────────────────────────────────────────────────────────────

export function makeImplementer() {
  const cfg = resolveConfig("implementer");
  return new CodexAgent({
    model: cfg.model,
    systemPrompt: buildSystemPrompt("implementer"),
    yolo: cfg.permissionMode === "yolo",
    cwd: project.cwd,
    timeoutMs: cfg.timeoutMs,
  });
}

export function makeResearcher() {
  const cfg = resolveConfig("researcher");
  return new ClaudeCodeAgent({
    model: cfg.model,
    systemPrompt: buildSystemPrompt("researcher"),
    permissionMode: cfg.permissionMode,
    cwd: project.cwd,
    timeoutMs: cfg.timeoutMs,
  });
}

export function makePRDReviewer() {
  const cfg = resolveConfig("prdReviewer");
  return new ClaudeCodeAgent({
    model: cfg.model,
    systemPrompt: buildSystemPrompt("prdReviewer"),
    permissionMode: cfg.permissionMode,
    cwd: project.cwd,
    timeoutMs: cfg.timeoutMs,
  });
}

export function makeCodeReviewer() {
  const cfg = resolveConfig("codeReviewer");
  return new ClaudeCodeAgent({
    model: cfg.model,
    systemPrompt: buildSystemPrompt("codeReviewer"),
    permissionMode: cfg.permissionMode,
    cwd: project.cwd,
    timeoutMs: cfg.timeoutMs,
  });
}

export function makeFinalReviewer() {
  const cfg = resolveConfig("finalReviewer");
  return new ClaudeCodeAgent({
    model: cfg.model,
    systemPrompt: buildSystemPrompt("finalReviewer"),
    permissionMode: cfg.permissionMode,
    cwd: project.cwd,
    timeoutMs: cfg.timeoutMs,
  });
}
