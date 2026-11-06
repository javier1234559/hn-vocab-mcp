export type VocabItem = {
  stt: string;
  english: string;
  ipa: string;
  meaningEn: string;
  meaningVi: string;
  raw: Record<string, unknown>;
};

function pick(row: Record<string, unknown>, keys: string[]): string {
  for (const key of keys) {
    const value = row[key];
    if (value !== undefined && value !== null && String(value).trim()) {
      return String(value).trim();
    }
  }
  return "";
}

function normalize(row: Record<string, unknown>): VocabItem {
  return {
    stt: pick(row, ["STT", "stt", "No", "#"]),
    english: pick(row, [
      "Tiếng Anh",
      "tiếng anh",
      "English",
      "Word",
      "Phrase",
      "Từ/cụm",
      "word",
    ]),
    ipa: pick(row, ["IPA", "ipa", "Pronunciation"]),
    meaningEn: pick(row, [
      "Meaning (Tiếng Anh)",
      "Meaning",
      "English meaning",
      "Definition",
    ]),
    meaningVi: pick(row, [
      "Nghĩa (Tiếng Việt)",
      "Nghĩa",
      "Vietnamese",
      "Meaning VI",
    ]),
    raw: row,
  };
}

export async function loadVocabFromSheet(): Promise<{
  count: number;
  items: VocabItem[];
  spreadsheetUrl?: string;
}> {
  const sheetsUrl = process.env.SHEETS_WEB_APP_URL || "";
  const syncToken = process.env.SYNC_TOKEN || "";

  if (!sheetsUrl || !syncToken) {
    throw new Error(
      "CONFIG_ERROR: Set SHEETS_WEB_APP_URL and SYNC_TOKEN in .env.local",
    );
  }

  const url = new URL(sheetsUrl);
  url.searchParams.set("token", syncToken);
  url.searchParams.set("action", "load");

  const res = await fetch(url.toString(), {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ token: syncToken, action: "load" }),
    redirect: "follow",
    cache: "no-store",
  });

  const text = await res.text();
  let data: { ok?: boolean; error?: string; vocab?: Record<string, unknown>[]; spreadsheetUrl?: string };
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(
      "SHEETS_ERROR: Apps Script did not return JSON. Redeploy the Web App.",
    );
  }

  if (!data.ok) {
    throw new Error(`SHEETS_ERROR: ${data.error || "Request failed"}`);
  }

  const items = (data.vocab || []).map(normalize);
  return {
    count: items.length,
    items,
    spreadsheetUrl: data.spreadsheetUrl,
  };
}
