#!/usr/bin/env node
// Patch smithers-orchestrator to use Zod 4's native .toJSONSchema()
// instead of zod-to-json-schema v3 which doesn't understand Zod 4 schemas
// and silently returns empty schema causing OpenAI to reject with:
//   "schema must be a JSON Schema of 'type: \"object\"', got 'type: \"None\"'"
//
// WHY postinstall instead of patchedDependencies:
//   bun patch --commit crashes (segfault) on GitHub-sourced packages in Bun 1.3.1.
//   The patch file in patches/ is kept as documentation but cannot be applied
//   automatically by Bun. This script is the reliable fallback.
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = join(
  __dirname,
  "../node_modules/smithers-orchestrator/src/agents/cli.ts"
);

const OLD = `        const { zodToJsonSchema } = await import("zod-to-json-schema");
        const jsonSchema = zodToJsonSchema(params.options.outputSchema);`;

const NEW = `        const jsonSchema = (params.options.outputSchema as any).toJSONSchema();`;

let content;
try {
  content = readFileSync(filePath, "utf8");
} catch {
  console.warn("⚠ smithers-orchestrator not found in node_modules — skipping patch (run bun install first)");
  process.exit(0);
}

if (content.includes(OLD)) {
  content = content.replace(OLD, NEW);
  writeFileSync(filePath, content, "utf8");
  console.log("✓ Patched smithers-orchestrator: zodToJsonSchema → toJSONSchema()");
} else if (content.includes("toJSONSchema()")) {
  console.log("✓ smithers-orchestrator already patched");
} else {
  console.error("✗ Could not find patch target in smithers-orchestrator/src/agents/cli.ts");
  console.error("  The upstream package may have changed. Check troubleshooting.md issue #15.");
  process.exit(1);
}
