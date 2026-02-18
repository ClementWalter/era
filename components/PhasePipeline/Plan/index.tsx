// Plan — Create implementation plan from research findings

import { Task, tables } from "../../../smithers.js";
import { PlanSchema } from "./schema.js";
import { makeResearcher } from "../../../agents.js";
import { renderInstructions } from "../../../utils.js";
import PlanPrompt from "./prompt.mdx";

interface PlanProps {
  nodeId: string;
  phaseId: string;
  phaseName: string;
  phaseDescription: string;
  phaseMetadata?: Record<string, unknown>;
  contextFilePath: string;
  findings: string[];
  planOutputPath: string;
}

export function Plan({
  nodeId,
  phaseId,
  phaseName,
  phaseDescription,
  phaseMetadata,
  contextFilePath,
  findings,
  planOutputPath,
}: PlanProps) {
  const projectInstructions = renderInstructions("plan", phaseMetadata);

  return (
    <Task
      id={nodeId}
      output={tables.plan}
      outputSchema={PlanSchema}
      agent={makeResearcher()} // planner uses read-only agent
      retries={2}
    >
      <PlanPrompt
        phaseId={phaseId}
        phaseName={phaseName}
        phaseDescription={phaseDescription}
        contextFilePath={contextFilePath}
        findings={findings.join("\n- ")}
        planOutputPath={planOutputPath}
        projectInstructions={projectInstructions}
      />
    </Task>
  );
}
