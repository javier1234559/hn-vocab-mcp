"use client";

import { useEffect, useState } from "react";

type Props = {
  /** Filename under /public/guide */
  file: string;
  alt: string;
};

/** Screenshot slot — drop files into `public/guide/`. */
export function GuideImage({ file, alt }: Props) {
  const path = `/guide/${file}`;
  const [status, setStatus] = useState<"loading" | "ready" | "missing">(
    "loading",
  );

  useEffect(() => {
    let cancelled = false;
    const img = new window.Image();
    img.onload = () => {
      if (!cancelled) setStatus("ready");
    };
    img.onerror = () => {
      if (!cancelled) setStatus("missing");
    };
    img.src = path;
    return () => {
      cancelled = true;
    };
  }, [path]);

  if (status === "ready") {
    return (
      <div className="mt-4 overflow-hidden rounded-xl border border-[#d5b2c9]/70 bg-[#f9f7f2]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={path}
          alt={alt}
          className="max-h-72 w-full object-contain object-center"
        />
      </div>
    );
  }

  return (
    <div className="mt-4 flex min-h-36 flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-[#d5b2c9] bg-[#f9f7f2]/70 px-4 py-8 text-center text-sm text-[#7a6570]">
      <span className="font-medium text-[#b889a8]">Screenshot coming soon</span>
      <span className="text-xs">
        Add: <code className="text-[#3d2f38]">public/guide/{file}</code>
      </span>
    </div>
  );
}
