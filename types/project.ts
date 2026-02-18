// types/project.ts — Generic project configuration interface
//
// Any project using the smithers workflow must export a config satisfying this interface.
// Domain-specific content lives in the project config, not in the core workflow.

export interface Phase {
  id: string;
  name: string;
  description: string;
  /** Arbitrary per-phase data passed to instruction templates */
  metadata?: Record<string, unknown>;
}

export type AgentRole =
  | "implementer"
  | "researcher"
  | "prdReviewer"
  | "codeReviewer"
  | "finalReviewer";

export interface AgentOverride {
  model?: string;
  systemPrompt?: string;
  permissionMode?: "default" | "yolo";
  timeoutMs?: number;
}

export interface ProjectConfig {
  /** Project display name */
  name: string;
  /** Smithers workflow name (used for DB naming + cache scoping) */
  workflowName: string;
  /** Ordered phases */
  phases: Phase[];
  /** Max outer-loop passes */
  maxPasses: number;
  /** Max review-fix iterations per phase */
  maxReviewRounds: number;
  /** Absolute path to project root (agents' cwd) */
  cwd: string;
  /** Directory for runtime outputs (context docs, plans) — relative to cwd */
  outputDir: string;
  /** Instruction templates per step — loaded MDX functions keyed by component name */
  instructions: Record<string, (props: Record<string, string>) => string>;
  /** Agent configuration */
  agents: {
    /** Project-specific system prompt content (context, rules, conventions) */
    systemPromptContent: string;
    /** Per-role overrides (model, timeout, etc.) */
    overrides?: Partial<Record<AgentRole, AgentOverride>>;
  };
}
