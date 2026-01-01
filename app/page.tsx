import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Clock, TrendingUp, Sparkles, Check } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-blue-600" />
            <span className="text-xl font-bold">Narada</span>
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
      <section className="py-20 bg-gradient-to-br from-blue-50 to-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4">AI-Powered Customer Support</Badge>
            <h1 className="text-5xl font-bold text-slate-900 mb-6">
              ตอบลูกค้าอัตโนมัติ 24/7
              <br />
              <span className="text-blue-600">บน Facebook Messenger</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8">
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
            <p className="text-sm text-slate-500 mt-4">
              ไม่ต้องใส่บัตรเครดิต • ตั้งค่าง่ายใน 5 นาที
            </p>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">
              ปัญหาที่ร้านค้าออนไลน์ต้องเจอทุกวัน
            </h2>
            <div className="grid gap-6 md:grid-cols-2 mt-12">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-red-600 text-4xl mb-4">😰</div>
                  <h3 className="font-semibold text-lg mb-2">ตอบลูกค้าไม่ทัน</h3>
                  <p className="text-slate-600">
                    ลูกค้าถามพร้อมกัน 10+ คน ตอบไม่ทัน เสียโอกาสขาย
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-red-600 text-4xl mb-4">🔁</div>
                  <h3 className="font-semibold text-lg mb-2">คำถามซ้ำๆ เยอะ</h3>
                  <p className="text-slate-600">
                    ราคา, การจัดส่ง, สินค้ามีสต็อกไหม - ตอบซ้ำทั้งวัน
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-red-600 text-4xl mb-4">🌙</div>
                  <h3 className="font-semibold text-lg mb-2">นอกเวลาทำการ</h3>
                  <p className="text-slate-600">
                    ลูกค้าถามตอนกลางคืน ไม่มีคนตอบ เสียยอดขาย
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-red-600 text-4xl mb-4">💸</div>
                  <h3 className="font-semibold text-lg mb-2">จ้างแอดมินแพง</h3>
                  <p className="text-slate-600">
                    จ้างคนเพิ่ม ต้นทุนสูง แต่ยอดขายไม่คุ้ม
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">
              Narada แก้ปัญหาได้ยังไง?
            </h2>
            <p className="text-center text-slate-600 mb-12">
              ระบบ AI ที่เข้าใจภาษาไทย ช่วยคุณตอบลูกค้าได้อย่างเป็นธรรมชาติ
            </p>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">ตอบทันที</h3>
                <p className="text-slate-600">
                  ตอบคำถามลูกค้าภายใน 2-5 วินาที ไม่ต้องรอแอดมิน
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">ตอบเป็นธรรมชาติ</h3>
                <p className="text-slate-600">
                  AI เข้าใจภาษาไทย ตอบเหมือนคนจริง ไม่แข็งทื่อ
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">ประหยัดเวลา</h3>
                <p className="text-slate-600">
                  ลดเวลาตอบคำถามจาก 5 นาที → 30 วินาที
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">แผนการใช้งาน</h2>
            <p className="text-center text-slate-600 mb-12">
              เริ่มต้นฟรี 7 วัน ไม่ต้องใส่บัตรเครดิต
            </p>
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Free Trial</CardTitle>
                  <CardDescription>ทดลองใช้งาน</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">0฿</span>
                    <span className="text-slate-500">/7 วัน</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm">20 คำถาม/วัน</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm">FAQ สูงสุด 30 รายการ</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm">1 น้ำเสียง</span>
                  </div>
                  <Link href="/register" className="block mt-6">
                    <Button className="w-full" variant="outline">
                      เริ่มทดลอง
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-blue-600 border-2 relative">
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
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm">200 คำถาม/วัน</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm">FAQ ไม่จำกัด</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm">ทุกน้ำเสียง</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
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
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm">ไม่จำกัดคำถาม</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Multi-user (3 accounts)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Priority support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
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
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            พร้อมที่จะลดภาระงาน<br/>และเพิ่มยอดขายแล้วหรือยัง?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
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
      <footer className="py-8 bg-slate-900 text-slate-400">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2026 Narada. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
