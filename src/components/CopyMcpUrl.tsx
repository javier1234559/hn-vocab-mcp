"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyMcpUrl() {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUrl(`${window.location.origin}/api/mcp`);
  }, []);

  async function copy() {
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="flex items-center gap-2 rounded-xl border border-[#d5b2c9]/70 bg-[#f9f7f2] px-3 py-2.5">
      <code className="min-w-0 flex-1 truncate text-left text-sm text-[#b889a8]">
        {url || "/api/mcp"}
      </code>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Copied" : "Copy MCP URL"}
        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#3d2f38] transition hover:bg-[#d5b2c9]/35"
      >
        {copied ? (
          <Check className="h-4 w-4 text-[#7a6570]" strokeWidth={2.25} />
        ) : (
          <Copy className="h-4 w-4" strokeWidth={2.25} />
        )}
      </button>
    </div>
  );
}
