// Research — Gather reference material before implementation

import { Task, tables } from "../../../smithers.js";
import { ResearchSchema } from "./schema.js";
import { makeResearcher } from "../../../agents.js";
import { renderInstructions } from "../../../utils.js";
import ResearchPrompt from "./prompt.mdx";

interface ResearchProps {
  nodeId: string;
  phaseId: string;
  phaseName: string;
  phaseDescription: string;
  phaseMetadata?: Record<string, unknown>;
  outputPath: string;
}

export function Research({
  nodeId,
  phaseId,
  phaseName,
  phaseDescription,
  phaseMetadata,
  outputPath,
}: ResearchProps) {
  const projectInstructions = renderInstructions("research", phaseMetadata);

  return (
    <Task
      id={nodeId}
      output={tables.research}
      outputSchema={ResearchSchema}
      agent={makeResearcher()}
      retries={2}
    >
      <ResearchPrompt
        phaseId={phaseId}
        phaseName={phaseName}
        phaseDescription={phaseDescription}
        outputPath={outputPath}
        projectInstructions={projectInstructions}
      />
    </Task>
  );
}
