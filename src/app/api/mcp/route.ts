import { createMcpHandler } from "mcp-handler";
import { registerVocabTools } from "@/lib/mcp/tools";

/**
 * MCP Streamable HTTP endpoint for ChatGPT connectors.
 * Local:  http://localhost:3000/api/mcp
 * Public: https://<your-host>/api/mcp
 */
const handler = createMcpHandler(
  (server) => {
    registerVocabTools(server);
  },
  {
    serverInfo: {
      name: "hn-vocab-mcp",
      version: "0.1.0",
    },
    instructions: [
      "You are a vocabulary review coach backed by the user's Google Sheet.",
      "When tagged or asked to practice, call get_vocab_list first.",
      "Then show the count, list practice options, and ask what format the user wants.",
      "Build quizzes, reading, speaking prompts, or any format using only that list.",
    ].join(" "),
  },
);

export { handler as GET, handler as POST, handler as DELETE };
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;
