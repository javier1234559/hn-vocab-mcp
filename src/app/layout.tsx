import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const beVietnam = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
});

const title = "HN Vocab MCP — Plugin ôn từ vựng Tutor Hoàng Nhân";
const description =
  "Plugin MCP của Tutor Hoàng Nhân Vocab giúp ôn tập từ vựng: kết nối ChatGPT với danh sách từ trên Google Sheet để quiz, đọc hiểu, luyện nói và ôn theo mọi định dạng bạn muốn.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Hoàng Nhân",
    "Tutor Hoàng Nhân",
    "HN Vocab",
    "ôn từ vựng",
    "ChatGPT MCP",
    "vocabulary",
    "English",
  ],
  openGraph: {
    title,
    description,
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${beVietnam.variable} antialiased font-sans`}>
        {children}
      </body>
    </html>
  );
}
