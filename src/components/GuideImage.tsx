"use client";

import { useEffect, useState } from "react";

type Props = {
  /** Short folder name under /public/guide — loads `image.png` inside */
  folder: string;
  alt: string;
};

/** Ảnh minh họa: `public/guide/<folder>/image.png` */
export function GuideImage({ folder, alt }: Props) {
  const path = `/guide/${folder}/image.png`;
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
          className="max-h-80 w-full object-contain object-center"
        />
      </div>
    );
  }

  return (
    <div className="mt-4 flex min-h-36 flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-[#d5b2c9] bg-[#f9f7f2]/70 px-4 py-8 text-center text-sm text-[#7a6570]">
      <span className="font-medium text-[#b889a8]">Sẽ thêm ảnh hướng dẫn</span>
      <span className="text-xs">
        Thả vào:{" "}
        <code className="text-[#3d2f38]">public/guide/{folder}/image.png</code>
      </span>
    </div>
  );
}
