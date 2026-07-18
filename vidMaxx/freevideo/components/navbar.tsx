"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between w-full px-8 py-6 transition-all duration-500 ${
        scrolled ? "bg-black/80 backdrop-blur-md border-b border-white/[0.05]" : "bg-transparent border-transparent"
      }`}
    >
      <Link href="/" className="flex items-center group">
        <span className="text-xl font-bold tracking-tighter text-white">freevideo.</span>
      </Link>
      
      <nav className="hidden md:flex items-center gap-10">
        <Link href="#platform" className="text-[13px] font-semibold tracking-wide text-zinc-400 hover:text-white transition-colors">PLATFORM</Link>
        <Link href="#features" className="text-[13px] font-semibold tracking-wide text-zinc-400 hover:text-white transition-colors">FEATURES</Link>
        <Link href="#pricing" className="text-[13px] font-semibold tracking-wide text-zinc-400 hover:text-white transition-colors">PRICING</Link>
      </nav>

      <div className="flex items-center gap-6">
        <Link href="/login" className="hidden sm:block text-[13px] font-semibold tracking-wide text-zinc-400 hover:text-white transition-colors">
          Sign in
        </Link>
        <Button className="h-10 px-6 rounded-none bg-white text-black hover:bg-zinc-200 text-[13px] font-bold tracking-wide uppercase transition-all">
          Start Free
        </Button>
      </div>
    </motion.header>
  );
}
