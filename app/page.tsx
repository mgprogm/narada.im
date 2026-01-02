import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Clock, TrendingUp, Sparkles, Check, AlertCircle, RefreshCw, Moon, DollarSign } from "lucide-react";

export const metadata: Metadata = {
  title: 'ตอบลูกค้าอัตโนมัติ 24/7 บน Facebook Messenger ด้วย AI',
  description: 'Narada ช่วยร้านค้าออนไลน์ตอบคำถามลูกค้าอัตโนมัติด้วย AI ภาษาไทย ตอบทันที 2-5 วินาที ไม่พลาดโอกาสทั้งกลางวันและกลางคืน ทดลองฟรี 7 วัน ไม่ต้องใส่บัตรเครดิต',
  openGraph: {
    title: 'Narada - ตอบลูกค้าอัตโนมัติ 24/7 บน Facebook Messenger',
    description: 'ให้ AI ช่วยตอบคำถามซ้ำๆ ของลูกค้า ลดภาระงานแอดมิน เพิ่มยอดขาย ตอบทันที 2-5 วินาที',
    url: '/',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Narada - AI Chatbot for Thai SME Businesses'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Narada - ตอบลูกค้าอัตโนมัติ 24/7 บน Facebook Messenger',
    description: 'ให้ AI ช่วยตอบคำถามซ้ำๆ ของลูกค้า ลดภาระงานแอดมิน เพิ่มยอดขาย',
    images: ['/og-image.png']
  },
  alternates: {
    canonical: '/'
  }
};

export default function Home() {
  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Narada',
    applicationCategory: 'BusinessApplication',
    description: 'ระบบตอบลูกค้าอัตโนมัติด้วย AI บน Facebook Messenger ตอบทันที 2-5 วินาที ลดภาระงานแอดมิน เพิ่มยอดขาย',
    operatingSystem: 'Web',
    offers: [
      {
        '@type': 'Offer',
        name: 'Free Trial',
        price: '0',
        priceCurrency: 'THB',
        priceValidUntil: '2027-12-31',
        category: 'Trial'
      },
      {
        '@type': 'Offer',
        name: 'Starter Plan',
        price: '499',
        priceCurrency: 'THB',
        billingDuration: 'P1M',
        category: 'Subscription'
      },
      {
        '@type': 'Offer',
        name: 'Pro Plan',
        price: '999',
        priceCurrency: 'THB',
        billingDuration: 'P1M',
        category: 'Subscription'
      }
    ],
    featureList: [
      'ตอบลูกค้าอัตโนมัติ 24/7',
      'AI เข้าใจภาษาไทย',
      'ตอบทันที 2-5 วินาที',
      'ระบบ FAQ อัจฉริยะ',
      'รองรับ Facebook Messenger'
    ],
    author: {
      '@type': 'Organization',
      name: 'Narada'
    }
  };

  return (
    <div className="min-h-screen">
      <Script
        id="software-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareSchema)
        }}
      />
      {/* Header */}
      <header className="border-b border-border bg-surface-100">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#00d4ff] via-[#52d36f] to-[#0099ff] animate-border-spin animate-gradient bg-[length:200%_auto]"></div>
              <div className="absolute inset-[2px] rounded-lg bg-white border-2 border-[#52d36f] flex items-center justify-center">
                <span className="font-black text-2xl bg-gradient-to-r from-[#52d36f] via-[#7de68f] to-[#52d36f] bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                  N
                </span>
              </div>
            </div>
            <span className="text-xl font-bold">narada</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">เข้าสู่ระบบ</Button>
            </Link>
            <Link href="/register">
              <Button>ทดลองฟรี 7 วัน</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-brand-200/20 to-surface-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4">AI-Powered Customer Support</Badge>
            <h1 className="text-5xl font-bold text-foreground mb-6">
              ตอบลูกค้าอัตโนมัติ 24/7
              <br />
              <span className="text-brand">บน Facebook Messenger</span>
            </h1>
            <p className="text-xl text-foreground-light mb-8">
              ให้ AI ช่วยตอบคำถามซ้ำๆ ของลูกค้า ลดภาระงานแอดมิน<br/>
              เพิ่มยอดขาย ไม่พลาดโอกาสทั้งกลางวันและกลางคืน
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="text-lg">
                  <Sparkles className="w-5 h-5 mr-2" />
                  เริ่มใช้งานฟรี 7 วัน
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg">
                ดูตัวอย่างการใช้งาน
              </Button>
            </div>
            <p className="text-sm text-foreground-muted mt-4">
              ไม่ต้องใส่บัตรเครดิต • ตั้งค่าง่ายใน 5 นาที
            </p>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-16 bg-surface-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-foreground mb-4">
              ปัญหาที่ร้านค้าออนไลน์ต้องเจอทุกวัน
            </h2>
            <div className="grid gap-6 md:grid-cols-2 mt-12">
              <Card>
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-destructive-200 rounded-lg flex items-center justify-center mb-4">
                    <AlertCircle className="w-6 h-6 text-destructive" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">ตอบลูกค้าไม่ทัน</h3>
                  <p className="text-foreground-light">
                    ลูกค้าถามพร้อมกัน 10+ คน ตอบไม่ทัน เสียโอกาสขาย
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-warning-200 rounded-lg flex items-center justify-center mb-4">
                    <RefreshCw className="w-6 h-6 text-warning" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">คำถามซ้ำๆ เยอะ</h3>
                  <p className="text-foreground-light">
                    ราคา, การจัดส่ง, สินค้ามีสต็อกไหม - ตอบซ้ำทั้งวัน
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-surface-300 rounded-lg flex items-center justify-center mb-4">
                    <Moon className="w-6 h-6 text-foreground-light" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">นอกเวลาทำการ</h3>
                  <p className="text-foreground-light">
                    ลูกค้าถามตอนกลางคืน ไม่มีคนตอบ เสียยอดขาย
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-destructive-200 rounded-lg flex items-center justify-center mb-4">
                    <DollarSign className="w-6 h-6 text-destructive" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">จ้างแอดมินแพง</h3>
                  <p className="text-foreground-light">
                    จ้างคนเพิ่ม ต้นทุนสูง แต่ยอดขายไม่คุ้ม
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-foreground mb-4">
              Narada แก้ปัญหาได้ยังไง?
            </h2>
            <p className="text-center text-foreground-light mb-12">
              ระบบ AI ที่เข้าใจภาษาไทย ช่วยคุณตอบลูกค้าได้อย่างเป็นธรรมชาติ
            </p>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-brand" />
                </div>
                <h3 className="font-semibold text-lg mb-2">ตอบทันที</h3>
                <p className="text-foreground-light">
                  ตอบคำถามลูกค้าภายใน 2-5 วินาที ไม่ต้องรอแอดมิน
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8 text-brand" />
                </div>
                <h3 className="font-semibold text-lg mb-2">ตอบเป็นธรรมชาติ</h3>
                <p className="text-foreground-light">
                  AI เข้าใจภาษาไทย ตอบเหมือนคนจริง ไม่แข็งทื่อ
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-brand" />
                </div>
                <h3 className="font-semibold text-lg mb-2">ประหยัดเวลา</h3>
                <p className="text-foreground-light">
                  ลดเวลาตอบคำถามจาก 5 นาที → 30 วินาที
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-surface-100">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-foreground mb-4">แผนการใช้งาน</h2>
            <p className="text-center text-foreground-light mb-12">
              เริ่มต้นฟรี 7 วัน ไม่ต้องใส่บัตรเครดิต
            </p>
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Free Trial</CardTitle>
                  <CardDescription>ทดลองใช้งาน</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">0฿</span>
                    <span className="text-foreground-light">/7 วัน</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand" />
                    <span className="text-sm">20 คำถาม/วัน</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand" />
                    <span className="text-sm">FAQ สูงสุด 30 รายการ</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand" />
                    <span className="text-sm">1 น้ำเสียง</span>
                  </div>
                  <Link href="/register" className="block mt-6">
                    <Button className="w-full" variant="outline">
                      เริ่มทดลอง
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-brand border-2 relative">
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                  แนะนำ
                </Badge>
                <CardHeader>
                  <CardTitle>Starter</CardTitle>
                  <CardDescription>สำหรับร้านค้าทั่วไป</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">499฿</span>
                    <span className="text-slate-500">/เดือน</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand" />
                    <span className="text-sm">200 คำถาม/วัน</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand" />
                    <span className="text-sm">FAQ ไม่จำกัด</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand" />
                    <span className="text-sm">ทุกน้ำเสียง</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand" />
                    <span className="text-sm">ประวัติ 30 วัน</span>
                  </div>
                  <Link href="/register" className="block mt-6">
                    <Button className="w-full">
                      เริ่มใช้งาน
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pro</CardTitle>
                  <CardDescription>สำหรับธุรกิจขนาดใหญ่</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">999฿</span>
                    <span className="text-slate-500">/เดือน</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand" />
                    <span className="text-sm">ไม่จำกัดคำถาม</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand" />
                    <span className="text-sm">Multi-user (3 accounts)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand" />
                    <span className="text-sm">Priority support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand" />
                    <span className="text-sm">Export data</span>
                  </div>
                  <Link href="/register" className="block mt-6">
                    <Button className="w-full" variant="outline">
                      เริ่มใช้งาน
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-brand text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            พร้อมที่จะลดภาระงาน<br/>และเพิ่มยอดขายแล้วหรือยัง?
          </h2>
          <p className="text-xl mb-8 text-brand-200">
            เริ่มใช้งานฟรี 7 วัน ไม่ต้องใส่บัตรเครดิต
          </p>
          <Link href="/register">
            <Button size="lg" variant="secondary" className="text-lg">
              <Sparkles className="w-5 h-5 mr-2" />
              ทดลองใช้ฟรีเลย
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-foreground text-foreground-muted">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2026 Narada. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
