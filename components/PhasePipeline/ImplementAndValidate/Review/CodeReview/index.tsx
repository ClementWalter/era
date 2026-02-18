// CodeReview — Code quality, conventions, security review

import { Task, tables } from "../../../../../smithers.js";
import { CodeReviewSchema } from "./schema.js";
import { makeCodeReviewer } from "../../../../../agents.js";
import { renderInstructions } from "../../../../../utils.js";
import CodeReviewPrompt from "./prompt.mdx";

interface CodeReviewProps {
  nodeId: string;
  phaseId: string;
  phaseName: string;
  phaseMetadata?: Record<string, unknown>;
  filesCreated: string[];
  filesModified: string[];
  whatWasDone: string;
  buildPassed: boolean;
  failingSummary: string | null;
}

export function CodeReview({
  nodeId,
  phaseId,
  phaseName,
  phaseMetadata,
  filesCreated,
  filesModified,
  whatWasDone,
  buildPassed,
  failingSummary,
}: CodeReviewProps) {
  const projectInstructions = renderInstructions("code-review", phaseMetadata);

  return (
    <Task
      id={nodeId}
      output={tables.code_review}
      outputSchema={CodeReviewSchema}
      agent={makeCodeReviewer()}
      continueOnFail
      retries={1}
    >
      <CodeReviewPrompt
        phaseId={phaseId}
        phaseName={phaseName}
        filesCreated={filesCreated.join("\n- ")}
        filesModified={filesModified.join("\n- ")}
        whatWasDone={whatWasDone}
        buildPassed={String(buildPassed)}
        failingSummary={failingSummary ?? "none"}
        projectInstructions={projectInstructions}
      />
    </Task>
  );
}
