// ImplementAndValidate — Implement → Test → Review → Fix sequence
//
// Reads latest outputs from DB for iterative refinement.
// ReviewFix is skipped when both reviews approve.
// Note: this does NOT loop internally — iteration comes from the outer Ralph loop.

import { Sequence, useCtx } from "../../../smithers.js";
import { Implement } from "./Implement/index.js";
import { Test } from "./Test/index.js";
import { Review } from "./Review/index.js";
import { ReviewFix } from "./ReviewFix/index.js";

interface ImplementAndValidateProps {
  phaseId: string;
  phaseName: string;
  phaseMetadata?: Record<string, unknown>;
  planFilePath: string;
  contextFilePath: string;
  implementationSteps: string[];
  pass: number;
}

export function ImplementAndValidate({
  phaseId,
  phaseName,
  phaseMetadata,
  planFilePath,
  contextFilePath,
  implementationSteps,
  pass,
}: ImplementAndValidateProps) {
  const ctx = useCtx();

  // Read latest outputs from previous iterations
  const latestImpl = ctx.outputMaybe("implement", {
    nodeId: `${phaseId}:implement`,
  });
  const latestTest = ctx.outputMaybe("test_results", {
    nodeId: `${phaseId}:test`,
  });
  const latestPRDReview = ctx.outputMaybe("prd_review", {
    nodeId: `${phaseId}:prd-review`,
  });
  const latestCodeReview = ctx.outputMaybe("code_review", {
    nodeId: `${phaseId}:code-review`,
  });
  const latestReviewFix = ctx.outputMaybe("review_fix", {
    nodeId: `${phaseId}:review-fix`,
  });
  const latestFinalReview = ctx.outputMaybe("final_review", {
    nodeId: `${phaseId}:final-review`,
  });

  // Compute review feedback for next iteration
  const prdApproved = latestPRDReview?.severity === "none";
  const codeApproved = latestCodeReview?.severity === "none";
  const noReviewIssues = prdApproved && codeApproved;

  return (
    <Sequence>
      {/* 1. Implement (with feedback from previous iteration) */}
      <Implement
        nodeId={`${phaseId}:implement`}
        phaseId={phaseId}
        phaseName={phaseName}
        phaseMetadata={phaseMetadata}
        planFilePath={planFilePath}
        contextFilePath={contextFilePath}
        implementationSteps={implementationSteps}
        previousSummary={latestImpl?.summary}
        previousNextSteps={latestImpl?.nextSteps ?? undefined}
        prdReviewFeedback={latestPRDReview?.feedback}
        codeReviewFeedback={latestCodeReview?.feedback}
        failingTests={
          latestTest && !latestTest.testsPassed
            ? (latestTest.failingSummary ?? latestTest.testOutput)
            : undefined
        }
        finalReviewFeedback={latestFinalReview?.reasoning}
        reviewFixSummary={latestReviewFix?.summary}
        pass={pass}
      />

      {/* 2. Test */}
      <Test
        nodeId={`${phaseId}:test`}
        phaseId={phaseId}
        phaseName={phaseName}
        phaseMetadata={phaseMetadata}
        filesCreated={latestImpl?.filesCreated ?? []}
        filesModified={latestImpl?.filesModified ?? []}
        whatWasDone={latestImpl?.whatWasDone ?? ""}
      />

      {/* 3. Parallel reviews */}
      <Review
        phaseId={phaseId}
        phaseName={phaseName}
        phaseMetadata={phaseMetadata}
        filesCreated={latestImpl?.filesCreated ?? []}
        filesModified={latestImpl?.filesModified ?? []}
        whatWasDone={latestImpl?.whatWasDone ?? ""}
        buildPassed={latestTest?.buildPassed ?? false}
        testsPassed={latestTest?.testsPassed ?? false}
        testsPassCount={latestTest?.testsPassCount ?? 0}
        testsFailCount={latestTest?.testsFailCount ?? 0}
        failingSummary={latestTest?.failingSummary ?? null}
      />

      {/* 4. ReviewFix — skipped when both reviews approve */}
      <ReviewFix
        nodeId={`${phaseId}:review-fix`}
        phaseId={phaseId}
        phaseName={phaseName}
        phaseMetadata={phaseMetadata}
        prdIssues={latestPRDReview?.issues ?? []}
        prdSeverity={latestPRDReview?.severity ?? "none"}
        codeIssues={latestCodeReview?.issues ?? []}
        codeSeverity={latestCodeReview?.severity ?? "none"}
        testsPassed={latestTest?.testsPassed ?? false}
        skipIf={noReviewIssues}
      />
    </Sequence>
  );
}
