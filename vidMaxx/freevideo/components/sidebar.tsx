"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Film, BookOpen, CreditCard, Settings, Zap, Plus, UserCircle } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";

const routes = [
  { label: "Series", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Videos", icon: Film, href: "/videos" },
  { label: "Guides", icon: BookOpen, href: "/guides" },
  { label: "Billing", icon: CreditCard, href: "/billing" },
  { label: "Settings", icon: Settings, href: "/settings" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <div className="flex flex-col h-full w-72 bg-[#09090b] border-r border-white/10">
      {/* Header / Logo */}
      <div className="h-20 flex items-center px-8 border-b border-white/10">
        <Link href="/" className="flex items-center gap-3 group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/logo.png" 
            alt="VidMaxx Logo" 
            className="w-7 h-7 rounded-md object-cover bg-black"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="black"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="white" fill="none" stroke-width="2"></path></svg>';
            }}
          />
          <span className="text-xl font-bold tracking-tight text-white group-hover:text-zinc-300 transition-colors">
            VidMaxx
          </span>
        </Link>
      </div>

      {/* Primary Action */}
      <div className="p-6">
        <Link href="/dashboard/create">
          <Button className="w-full bg-white text-black hover:bg-zinc-200 hover:scale-[1.02] transition-all h-12 shadow-sm rounded-lg flex items-center justify-center gap-2 font-semibold text-[15px]">
            <Plus className="w-5 h-5" />
            Create New Series
          </Button>
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
        {routes.map((route) => {
          const isActive = pathname === route.href;
          return (
            <Link 
              key={route.href} 
              href={route.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive 
                  ? "bg-white/10 text-white font-semibold" 
                  : "text-zinc-400 hover:bg-white/5 hover:text-white font-medium"
              }`}
            >
              <route.icon className={`w-[22px] h-[22px] ${isActive ? "text-white" : "text-zinc-500"}`} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[15px]">{route.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Footer / User Area */}
      <div className="p-4 border-t border-white/10">
        {/* Upgrade Card */}
        <div className="mb-4 bg-[#111] border border-white/10 rounded-xl p-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-3xl rounded-full" />
          <div className="flex items-center gap-2 mb-2 relative z-10">
            <Zap className="w-5 h-5 text-amber-500" fill="currentColor" />
            <span className="font-semibold text-[14px] text-white">Upgrade Plan</span>
          </div>
          <p className="text-[13px] text-zinc-400 mb-3 leading-relaxed relative z-10">
            Unlock unlimited video generation and premium voices.
          </p>
          <Button variant="outline" className="w-full bg-transparent border-white/20 text-white hover:bg-white/10 h-9 text-[13px] font-semibold relative z-10">
            View Plans
          </Button>
        </div>

        {/* Profile Settings */}
        <div className="flex items-center justify-between px-2 py-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer border border-transparent hover:border-white/10">
          <div className="flex items-center gap-3">
            <UserButton appearance={{ elements: { userButtonAvatarBox: "w-9 h-9" } }} />
            <div className="flex flex-col">
              <span className="text-[14px] font-semibold text-white leading-tight">
                {user?.firstName || "Profile"}
              </span>
              <span className="text-[12px] text-zinc-500 font-medium">Settings</span>
            </div>
          </div>
          <Settings className="w-4 h-4 text-zinc-500" />
        </div>
      </div>
    </div>
  );
}
