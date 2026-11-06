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
    <div className="flex items-center gap-2 rounded-xl border border-[#2a2226] bg-[#1a1518] px-3 py-2.5 shadow-inner">
      <code className="min-w-0 flex-1 truncate text-left text-sm text-[#f0d6e4]">
        {url || "/api/mcp"}
      </code>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Đã sao chép" : "Sao chép link MCP"}
        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#f9f7f2] transition hover:bg-white/10"
      >
        {copied ? (
          <Check className="h-4 w-4 text-[#d5b2c9]" strokeWidth={2.25} />
        ) : (
          <Copy className="h-4 w-4" strokeWidth={2.25} />
        )}
      </button>
    </div>
  );
}
