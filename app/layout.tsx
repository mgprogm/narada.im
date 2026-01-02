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
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://narada.im'),
  title: {
    default: 'Narada - ระบบตอบลูกค้าอัตโนมัติด้วย AI บน Facebook Messenger 24/7',
    template: '%s | Narada'
  },
  description: 'ให้ AI ช่วยตอบคำถามซ้ำๆ ของลูกค้าบน Facebook Messenger ตลอด 24 ชั่วโมง ลดภาระงานแอดมิน เพิ่มยอดขาย เหมาะสำหรับร้านค้าออนไลน์ คลินิก และธุรกิจบริการ',
  keywords: [
    'AI chatbot ภาษาไทย',
    'ตอบลูกค้าอัตโนมัติ',
    'Facebook Messenger bot',
    'ระบบตอบแชทอัตโนมัติ',
    'AI สำหรับร้านค้าออนไลน์',
    'chatbot สำหรับ SME',
    'ตอบข้อความลูกค้าอัตโนมัติ',
    'FAQ bot ภาษาไทย'
  ],
  authors: [{ name: 'Narada' }],
  creator: 'Narada',
  publisher: 'Narada',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'th_TH',
    url: '/',
    siteName: 'Narada',
    title: 'Narada - ตอบลูกค้าอัตโนมัติ 24/7 บน Facebook Messenger',
    description: 'ระบบ AI ที่เข้าใจภาษาไทย ช่วยตอบคำถามลูกค้าได้อย่างเป็นธรรมชาติ ลดเวลาตอบจาก 5 นาที → 30 วินาที',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Narada - AI Chatbot สำหรับร้านค้าออนไลน์'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Narada - ตอบลูกค้าอัตโนมัติด้วย AI',
    description: 'ให้ AI ช่วยตอบคำถามซ้ำๆ ของลูกค้า ลดภาระงานแอดมิน เพิ่มยอดขาย',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: '/'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Narada',
    description: 'ระบบตอบลูกค้าอัตโนมัติด้วย AI บน Facebook Messenger สำหรับธุรกิจ SME ไทย',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://narada.im',
    logo: `${process.env.NEXT_PUBLIC_APP_URL || 'https://narada.im'}/logo.png`,
    foundingDate: '2026',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: ['Thai', 'English']
    }
  };

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
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema)
          }}
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
