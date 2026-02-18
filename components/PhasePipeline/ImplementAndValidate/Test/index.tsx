// Test — Run build + tests, report results

import { Task, tables } from "../../../../smithers.js";
import { TestSchema } from "./schema.js";
import { makeImplementer } from "../../../../agents.js";
import { renderInstructions } from "../../../../utils.js";
import TestPrompt from "./prompt.mdx";

interface TestProps {
  nodeId: string;
  phaseId: string;
  phaseName: string;
  phaseMetadata?: Record<string, unknown>;
  /** Files created/modified by Implement step */
  filesCreated: string[];
  filesModified: string[];
  /** What was done in implementation */
  whatWasDone: string;
}

export function Test({
  nodeId,
  phaseId,
  phaseName,
  phaseMetadata,
  filesCreated,
  filesModified,
  whatWasDone,
}: TestProps) {
  const projectInstructions = renderInstructions("test", phaseMetadata);

  return (
    <Task
      id={nodeId}
      output={tables.test_results}
      outputSchema={TestSchema}
      agent={makeImplementer()} // needs write access to fix compilation errors
      retries={2}
    >
      <TestPrompt
        phaseId={phaseId}
        phaseName={phaseName}
        filesCreated={filesCreated.join("\n- ")}
        filesModified={filesModified.join("\n- ")}
        whatWasDone={whatWasDone}
        projectInstructions={projectInstructions}
      />
    </Task>
  );
}
