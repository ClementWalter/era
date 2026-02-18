// utils.ts — Shared utilities for the workflow

import { project } from "./project.js";

/**
 * Render a project instruction template for a given step and phase.
 * Returns empty string if the project doesn't provide instructions for this step.
 */
export function renderInstructions(
  stepName: string,
  phaseMetadata?: Record<string, unknown>,
): string {
  const template = project.instructions[stepName];
  if (!template) return "";

  // Convert metadata values to strings for MDX interpolation
  const props: Record<string, string> = {};
  if (phaseMetadata) {
    for (const [key, value] of Object.entries(phaseMetadata)) {
      if (Array.isArray(value)) {
        props[key] = value.join("\n- ");
      } else {
        props[key] = String(value ?? "");
      }
    }
  }

  return template(props);
}
