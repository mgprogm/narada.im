import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SmartSales Assistant",
  description: "AI-powered chatbot for automating customer responses 24/7",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
