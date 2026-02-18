// Simple instruction templates as functions
var instructions = {
    research: function (props) { return "\n# RESEARCH PHASE \u2014 ".concat(props.phaseName || "Unknown", "\nPhase ID: ").concat(props.phaseId || "unknown", "\n\nRead the PRD at /home/clement/era/PRD.md for full requirements.\nResearch what's needed for this phase and document findings.\n\n## REQUIRED OUTPUT\n").concat(props.schema || "{}", "\n"); },
    plan: function (props) { return "\n# PLAN PHASE \u2014 ".concat(props.phaseName || "Unknown", "\nCreate implementation plan based on research.\nWrite to: ").concat(props.planOutputPath || "output/plans/", "\n\n## REQUIRED OUTPUT\n").concat(props.schema || "{}", "\n"); },
    implement: function (props) { return "\n# IMPLEMENT PHASE \u2014 ".concat(props.phaseName || "Unknown", "\nImplement the code according to plan.\nUse React 19 + TypeScript + TailwindCSS.\n\n## REQUIRED OUTPUT\n").concat(props.schema || "{}", "\n"); },
    test: function (props) { return "\n# TEST PHASE \u2014 ".concat(props.phaseName || "Unknown", "\nWrite and run tests using Vitest.\n\n## REQUIRED OUTPUT\n").concat(props.schema || "{}", "\n"); },
    "code-review": function (props) { return "\n# CODE REVIEW \u2014 ".concat(props.phaseName || "Unknown", "\nReview code for quality and correctness.\n\n## REQUIRED OUTPUT\n").concat(props.schema || "{}", "\n"); },
    deploy: function (props) { return "\n# DEPLOY PHASE\nBuild and deploy to Scaleway.\nRun: uv run ~/.claude/skills/scaleway-dev/scripts/deploy.py --auto\n\n## REQUIRED OUTPUT\n".concat(props.schema || "{}", "\n"); },
};
var config = {
    name: "era",
    workflowName: "era-calendar",
    phases: [
        {
            id: "setup",
            name: "Project Setup",
            description: "Initialize React + Vite + TypeScript project with TailwindCSS",
        },
        {
            id: "models",
            name: "Data Models",
            description: "Create TypeScript types and model release date data for all AI eras",
        },
        {
            id: "calendar-core",
            name: "Calendar Logic",
            description: "Implement era date calculation: convert between Gregorian and era dates",
        },
        {
            id: "ui-calendar",
            name: "Calendar UI",
            description: "Build the Google Calendar-style month view component",
        },
        {
            id: "ui-chrome",
            name: "App Chrome",
            description: "Era selector dropdown, theme toggle, header, responsive layout",
        },
        {
            id: "polish",
            name: "Polish",
            description: "Final styling, animations, dark/light themes",
        },
        {
            id: "deploy",
            name: "Deploy",
            description: "Build and deploy to Scaleway",
        },
    ],
    maxPasses: 2,
    maxReviewRounds: 1,
    cwd: "/home/clement/era/app",
    outputDir: "smithers-config/output",
    instructions: instructions,
    agents: {
        systemPromptContent: "\n# Era Calendar \u2014 Project Context\n\nA single-page calendar app where time is measured from AI model release dates.\nInstead of \"February 18, 2026\", show \"14 Turing, Year 1 \u2014 Claude 3.5 Sonnet Era\".\n\n## Design\n- Flat, minimalist\n- Dark theme: black/gray/red (#E53935)\n- Light theme: white/gray/blue (#1976D2)\n- Google Calendar-style month navigation\n\n## Month Names (30 days each)\nTuring, Shannon, McCarthy, Minsky, Hinton, LeCun, Bengio, Hochreiter, Vaswani, Sutskever, Hassabis, Amodei + \"Singularity\" (leap days)\n\n## Stack\nReact 19 + TypeScript + Vite + TailwindCSS\n",
        overrides: {
            implementer: {
                model: "anthropic/claude-sonnet-4",
                permissionMode: "yolo",
            },
        },
    },
};
export default config;
