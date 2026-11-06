import { CopyMcpUrl } from "@/components/CopyMcpUrl";
import { GuideImage } from "@/components/GuideImage";

const steps = [
  {
    n: "01",
    title: "Copy the MCP link",
    body: "Copy this URL and paste it when ChatGPT asks for your MCP server address.",
    slot: "copy" as const,
  },
  {
    n: "02",
    title: "Authenticate the MCP",
    body: "In ChatGPT, add a connector / MCP server, paste the link, then confirm or allow access when prompted.",
    slot: "auth" as const,
    image: "02-authenticate.png",
  },
  {
    n: "03",
    title: "Use it in chat",
    body: "Enable the connector, tag it in a chat, and ask it to load your vocab and practice (quiz, reading, voice, …).",
    slot: "use" as const,
    image: "03-use.png",
  },
];

export default function Home() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 0%, #d5b2c9 0%, transparent 55%),
            radial-gradient(ellipse 70% 50% at 100% 100%, #e8d4e0 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 0% 80%, #f0e6ec 0%, transparent 45%),
            #f9f7f2
          `,
        }}
      />

      <section className="relative z-10 mx-auto w-full max-w-xl text-center">
        <p className="mb-4 text-sm font-medium tracking-[0.18em] text-[#b889a8] uppercase">
          ChatGPT · MCP
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-[#3d2f38] sm:text-5xl">
          HN Vocab MCP
        </h1>
        <p className="mt-5 text-base leading-relaxed text-[#7a6570] sm:text-lg">
          Pull your Google Sheet vocabulary into ChatGPT — then quiz, read, or
          speak with the same list.
        </p>

        <ol className="mt-12 space-y-5 text-left">
          {steps.map((step) => (
            <li
              key={step.n}
              className="rounded-2xl border border-[#d5b2c9]/60 bg-[#f9f7f2]/85 px-5 py-5 backdrop-blur-sm"
            >
              <div className="flex items-baseline gap-3">
                <span className="text-xs font-semibold tracking-widest text-[#b889a8]">
                  {step.n}
                </span>
                <h2 className="text-base font-semibold text-[#3d2f38]">
                  {step.title}
                </h2>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[#7a6570]">
                {step.body}
              </p>

              {step.slot === "copy" && (
                <div className="mt-4">
                  <CopyMcpUrl />
                </div>
              )}

              {step.slot === "auth" && step.image && (
                <GuideImage file={step.image} alt="Authenticate MCP in ChatGPT" />
              )}

              {step.slot === "use" && step.image && (
                <GuideImage file={step.image} alt="Using HN Vocab MCP in chat" />
              )}
            </li>
          ))}
        </ol>

        <p className="mt-8 text-xs text-[#7a6570]">
          Drop screenshots into{" "}
          <code className="text-[#b889a8]">public/guide/</code>
        </p>
      </section>
    </main>
  );
}
