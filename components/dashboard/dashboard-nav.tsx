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
    <aside className="w-64 bg-surface-100 border-r border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-bold text-foreground">Narada</h1>
        <p className="text-sm text-foreground-light">AI Assistant</p>
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
                  ? "bg-brand-200 text-brand-600 font-medium"
                  : "text-foreground-light hover:bg-surface-200 hover:text-foreground"
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-border">
        <div className="px-4 py-3 bg-surface-200 rounded-lg">
          <p className="text-xs font-medium text-foreground">แผน Free Trial</p>
          <p className="text-xs text-foreground-light mt-1">เหลืออีก 7 วัน</p>
        </div>
      </div>
    </aside>
  );
}
