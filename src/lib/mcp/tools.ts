import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/server";
import { loadVocabFromSheet } from "@/lib/sheets";

const PRACTICE_OPTIONS = [
  "Quiz (multiple choice / fill-in)",
  "Reading passage using these words",
  "Speaking / voice discussion",
  "Flashcards (EN → VI or VI → EN)",
  "Example sentences / rewrite",
  "Custom format (user describes)",
];

function ok(data: unknown) {
  return {
    content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
    structuredContent:
      typeof data === "object" && data !== null ? data : { data },
  };
}

function fail(message: string) {
  return {
    isError: true as const,
    content: [{ type: "text" as const, text: message }],
    structuredContent: { error: message },
  };
}

/**
 * Register vocab MCP tools for ChatGPT connectors.
 */
export function registerVocabTools(server: McpServer) {
  server.registerTool(
    "get_vocab_list",
    {
      title: "Get vocabulary list",
      description: [
        "Load the full review vocabulary list from the Google Sheet tab `vocab`.",
        "Call this first whenever the user wants to practice, review, quiz, read, or speak with their words.",
        "After you receive the list:",
        "1) Tell the user how many items are available (count).",
        "2) Briefly show a short preview (a few words).",
        "3) Present practice options and ASK which format they want:",
        PRACTICE_OPTIONS.map((o, i) => `   ${i + 1}. ${o}`).join("\n"),
        "4) Then run the chosen format using ONLY words from this list. Do not invent extra target vocabulary.",
        "Supports any format the user requests (reading, quiz, voice chat, etc.).",
      ].join("\n"),
      inputSchema: z.object({}),
    },
    async () => {
      try {
        const { count, items, spreadsheetUrl } = await loadVocabFromSheet();
        return ok({
          count,
          spreadsheetUrl,
          practiceOptions: PRACTICE_OPTIONS,
          instruction:
            "Show count, preview a few items, list practiceOptions, and ask the user which option they want.",
          items,
        });
      } catch (error) {
        return fail(error instanceof Error ? error.message : "Unknown error");
      }
    },
  );

  server.registerTool(
    "get_vocab_count",
    {
      title: "Count vocabulary items",
      description:
        "Return only the number of vocabulary rows in the Sheet tab `vocab`. Use when the user only asks how many words they have.",
      inputSchema: z.object({}),
    },
    async () => {
      try {
        const { count, spreadsheetUrl } = await loadVocabFromSheet();
        return ok({ count, spreadsheetUrl });
      } catch (error) {
        return fail(error instanceof Error ? error.message : "Unknown error");
      }
    },
  );
}
