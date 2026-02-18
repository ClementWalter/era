// ReviewFix — Address issues from both reviews

import { Task, tables } from "../../../../smithers.js";
import { ReviewFixSchema } from "./schema.js";
import { makeImplementer } from "../../../../agents.js";
import { renderInstructions } from "../../../../utils.js";
import type { Issue } from "../shared.js";
import ReviewFixPrompt from "./prompt.mdx";

interface ReviewFixProps {
  nodeId: string;
  phaseId: string;
  phaseName: string;
  phaseMetadata?: Record<string, unknown>;
  /** Issues from spec/PRD review */
  prdIssues: Issue[];
  prdSeverity: string;
  /** Issues from code review */
  codeIssues: Issue[];
  codeSeverity: string;
  /** Whether tests are passing */
  testsPassed: boolean;
  /** Whether to skip (both reviews approved) */
  skipIf: boolean;
}

export function ReviewFix({
  nodeId,
  phaseId,
  phaseName,
  phaseMetadata,
  prdIssues,
  prdSeverity,
  codeIssues,
  codeSeverity,
  testsPassed,
  skipIf,
}: ReviewFixProps) {
  const projectInstructions = renderInstructions("review-fix", phaseMetadata);

  return (
    <Task
      id={nodeId}
      output={tables.review_fix}
      outputSchema={ReviewFixSchema}
      agent={makeImplementer()}
      skipIf={skipIf}
      retries={1}
    >
      <ReviewFixPrompt
        phaseId={phaseId}
        phaseName={phaseName}
        prdIssues={
          prdIssues.length > 0
            ? prdIssues
                .map(
                  (i, n) =>
                    `${n + 1}. [${i.severity}]${i.reference ? ` (${i.reference})` : ""} ${i.description}`,
                )
                .join("\n")
            : "None"
        }
        prdSeverity={prdSeverity}
        codeIssues={
          codeIssues.length > 0
            ? codeIssues
                .map(
                  (i, n) =>
                    `${n + 1}. [${i.severity}] ${i.description}${i.file ? ` (${i.file})` : ""}`,
                )
                .join("\n")
            : "None"
        }
        codeSeverity={codeSeverity}
        testsPassed={String(testsPassed)}
        projectInstructions={projectInstructions}
      />
    </Task>
  );
}
