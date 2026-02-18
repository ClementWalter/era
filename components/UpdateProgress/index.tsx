// UpdateProgress — Rewrite PROGRESS.md with current state

import { Task, tables } from "../../smithers.js";
import { ProgressSchema } from "./schema.js";
import { makeResearcher } from "../../agents.js";
import { project } from "../../project.js";
import { renderInstructions } from "../../utils.js";
import UpdateProgressPrompt from "./prompt.mdx";

interface UpdateProgressProps {
  nodeId: string;
  /** Per-phase completion from FinalReview outputs */
  phaseStatuses: Array<{
    phaseId: string;
    phaseName: string;
    complete: boolean;
    qualityScore: number | undefined;
  }>;
  currentPass: number;
}

export function UpdateProgress({
  nodeId,
  phaseStatuses,
  currentPass,
}: UpdateProgressProps) {
  const statusSummary = phaseStatuses
    .map(
      (p) =>
        `- ${p.phaseName}: ${p.complete ? "COMPLETE" : "IN PROGRESS"}${p.qualityScore ? ` (quality: ${p.qualityScore}/10)` : ""}`,
    )
    .join("\n");

  const phaseDefinitions = project.phases
    .map((p) => `- ${p.id}: ${p.name}`)
    .join("\n");

  const projectInstructions = renderInstructions("update-progress");

  return (
    <Task
      id={nodeId}
      output={tables.progress}
      outputSchema={ProgressSchema}
      agent={makeResearcher()} // read-only
      retries={1}
    >
      <UpdateProgressPrompt
        currentPass={String(currentPass)}
        totalPhases={String(project.phases.length)}
        phaseStatuses={statusSummary}
        phaseDefinitions={phaseDefinitions}
        projectInstructions={projectInstructions}
      />
    </Task>
  );
}
