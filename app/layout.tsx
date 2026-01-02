import type { Metadata } from "next";
import { Sarabun } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const sarabun = Sarabun({
  subsets: ["latin", "latin-ext", "thai"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-sarabun",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Narada",
  description: "AI-powered chatbot for automating customer responses 24/7",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={sarabun.variable} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <Script
          id="theme-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){const t=localStorage.getItem('theme')||'system';if(t==='dark'||(t==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.setAttribute('data-theme','dark');document.documentElement.style.colorScheme='dark';}else{document.documentElement.setAttribute('data-theme','light');document.documentElement.style.colorScheme='light';}})();`,
          }}
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
