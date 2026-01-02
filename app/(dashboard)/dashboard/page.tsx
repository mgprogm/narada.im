import type { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, FileText, History, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: 'Dashboard - ภาพรวมการใช้งาน',
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-1">ภาพรวมการใช้งานของคุณ</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">คำถามวันนี้</CardTitle>
            <MessageSquare className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-slate-500 mt-1">จาก 20 ครั้ง/วัน</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">FAQ ทั้งหมด</CardTitle>
            <FileText className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-slate-500 mt-1">สูงสุด 30 รายการ</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ประวัติ</CardTitle>
            <History className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-slate-500 mt-1">คำถามที่บันทึก</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">อัตราความสำเร็จ</CardTitle>
            <TrendingUp className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-</div>
            <p className="text-xs text-slate-500 mt-1">ยังไม่มีข้อมูล</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>เริ่มต้นใช้งาน</CardTitle>
          <CardDescription>ทำตามขั้นตอนเพื่อตั้งค่าระบบของคุณ</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">
              1
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-slate-900">ตั้งค่า Bot Personality</h3>
              <p className="text-sm text-slate-500 mt-1">
                เลือกน้ำเสียงและตั้งค่าข้อความทักทายลูกค้า
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">
              2
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-slate-900">เพิ่ม FAQ</h3>
              <p className="text-sm text-slate-500 mt-1">
                เพิ่มคำถาม-คำตอบที่ลูกค้าถามบ่อย อย่างน้อย 10 รายการ
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-slate-600 font-semibold">
              3
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-slate-900">ทดลองใช้งาน</h3>
              <p className="text-sm text-slate-500 mt-1">
                ไปที่หน้า "ตอบคำถาม" เพื่อทดลองให้ AI สร้างคำตอบ
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
