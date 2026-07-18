"use client";

import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

export function DashboardHeader() {
  const pathname = usePathname();
  
  // Format pathname to display as a title (e.g., /dashboard -> Dashboard)
  const title = pathname === "/dashboard" 
    ? "Series" 
    : pathname.split('/').pop()?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || "Dashboard";

  return (
    <header className="h-20 flex items-center justify-between px-10 bg-black/50 backdrop-blur-md border-b border-white/10 sticky top-0 z-40">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">
          {title}
        </h1>
      </div>
      
      <div className="flex items-center gap-4">
        {/* Can add search or notifications here later */}
        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-[#111] hover:bg-white/10 transition-colors cursor-pointer">
          <UserButton appearance={{ elements: { userButtonAvatarBox: "w-9 h-9" } }} />
        </div>
      </div>
    </header>
  );
}
