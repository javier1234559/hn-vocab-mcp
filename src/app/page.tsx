import { CopyMcpUrl } from "@/components/CopyMcpUrl";
import { GuideImage } from "@/components/GuideImage";

const steps = [
  {
    n: "01",
    folder: "copy-mcp",
    title: "Sao chép link MCP",
    body: "Bấm icon copy để lấy đường dẫn /api/mcp của trang này. Giữ link này để dán vào ChatGPT ở bước sau.",
    showCopy: true,
  },
  {
    n: "02",
    folder: "chatgpt-web",
    title: "Mở ChatGPT trên web",
    body: "Vào ChatGPT dạng trình duyệt (web) để thao tác dễ nhất, rồi tìm phần plugin / connector / MCP.",
  },
  {
    n: "03",
    folder: "them-mcp",
    title: "Thêm MCP tùy chỉnh",
    body: "Bấm nút Add và chọn thêm một MCP tùy chỉnh (custom) mới.",
  },
  {
    n: "04",
    folder: "cau-hinh",
    title: "Đặt tên, dán link và lưu",
    body: "Nhập tên plugin như trong ảnh, dán đường link đã copy. Mục xác thực chọn Không xác thực, tích checkbox, rồi bấm Save.",
  },
  {
    n: "05",
    folder: "ket-noi",
    title: "Kết nối",
    body: "Ở màn hình xác nhận, bấm Kết nối (Connect) để hoàn tất gắn MCP.",
  },
  {
    n: "06",
    folder: "goi-plugin",
    title: "Gọi @hn-vocab trong chat mới",
    body: "Mở một trang chat mới, gõ @hn-vocab để gọi plugin vừa thêm, kèm một prompt muốn ôn tập.",
  },
  {
    n: "07",
    folder: "on-tap",
    title: "Ôn tập theo chỉ dẫn",
    body: "ChatGPT đã có toàn bộ từ vựng cần ôn. Làm theo gợi ý của ChatGPT để quiz, đọc, nói hoặc bất kỳ dạng nào bạn muốn.",
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
          Tutor Hoàng Nhân · ChatGPT MCP
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-[#3d2f38] sm:text-5xl">
          HN Vocab MCP
        </h1>
        <p className="mt-5 text-base leading-relaxed text-[#7a6570] sm:text-lg">
          Plugin ôn từ vựng của Tutor Hoàng Nhân — kéo danh sách từ Google Sheet
          vào ChatGPT để quiz, đọc hiểu, luyện nói và ôn theo mọi định dạng bạn
          muốn.
        </p>

        <ol className="mt-12 space-y-5 text-left">
          {steps.map((step) => (
            <li
              key={step.folder}
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

              {step.showCopy && (
                <div className="mt-4">
                  <CopyMcpUrl />
                </div>
              )}

              {!step.showCopy && (
                <GuideImage folder={step.folder} alt={step.title} />
              )}
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
