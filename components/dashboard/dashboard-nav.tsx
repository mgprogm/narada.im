"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MessageSquare, Settings, FileText, History, LayoutDashboard } from "lucide-react";

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "ตอบคำถาม",
    href: "/dashboard/generator",
    icon: MessageSquare,
  },
  {
    title: "จัดการ FAQ",
    href: "/dashboard/faqs",
    icon: FileText,
  },
  {
    title: "ประวัติ",
    href: "/dashboard/history",
    icon: History,
  },
  {
    title: "ตั้งค่า",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
      <div className="p-6 border-b border-slate-200">
        <h1 className="text-xl font-bold text-slate-900">Narada</h1>
        <p className="text-sm text-slate-500">AI Assistant</p>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                isActive
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-slate-200">
        <div className="px-4 py-3 bg-slate-50 rounded-lg">
          <p className="text-xs font-medium text-slate-900">แผน Free Trial</p>
          <p className="text-xs text-slate-500 mt-1">เหลืออีก 7 วัน</p>
        </div>
      </div>
    </aside>
  );
}
