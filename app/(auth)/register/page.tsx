"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [shopName, setShopName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("รหัสผ่านไม่ตรงกัน");
      setIsLoading(false);
      return;
    }

    // Validate password length
    if (password.length < 8) {
      setError("รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร");
      setIsLoading(false);
      return;
    }

    try {
      const supabase = createClient();

      // Sign up the user
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            shop_name: shopName,
          },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      if (data.user) {
        // Create user profile using database function (bypasses RLS issues)
        const { data: profileData, error: userError } = await supabase
          .rpc("create_user_profile", {
            p_user_id: data.user.id,
            p_email: email,
            p_shop_name: shopName,
            p_plan_type: "free",
            p_trial_days: 7,
          });

        if (userError) {
          console.error("User profile creation error:", userError);
          setError("เกิดข้อผิดพลาดในการสร้างโปรไฟล์");
          return;
        }

        if (profileData && !profileData.success) {
          console.error("User profile creation failed:", profileData.error);
          setError("เกิดข้อผิดพลาดในการสร้างโปรไฟล์: " + profileData.error);
          return;
        }

        // Default settings are created automatically by database trigger

        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError("เกิดข้อผิดพลาดในการสมัครสมาชิก กรุณาลองใหม่อีกครั้ง");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-surface-100 to-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">สมัครสมาชิก</CardTitle>
          <CardDescription className="text-center">
            เริ่มใช้งาน Narada ฟรี 7 วัน
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-destructive bg-destructive-200 border border-destructive-300 rounded-md">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="shopName">ชื่อร้าน/ธุรกิจ</Label>
              <Input
                id="shopName"
                type="text"
                placeholder="ชื่อร้านของคุณ"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">อีเมล</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">รหัสผ่าน</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
              <p className="text-xs text-slate-500">ต้องมีอย่างน้อย 8 ตัวอักษร</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">ยืนยันรหัสผ่าน</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "กำลังสมัครสมาชิก..." : "สมัครสมาชิก"}
            </Button>
            <div className="text-sm text-center text-foreground-light">
              มีบัญชีอยู่แล้ว?{" "}
              <Link href="/login" className="text-brand hover:text-brand-600 hover:underline font-medium">
                เข้าสู่ระบบ
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
