"use client";

import { Button } from "@/components/ui/button";
import { AnimatedRevealText } from "@/components/ui/animated-reveal-text";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Play } from "lucide-react";
import { useAuth, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";

const Instagram = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
  </svg>
);

const Youtube = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export default function Home() {
  const { isSignedIn } = useAuth();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-white selection:text-black">
      
      {/* HERO SECTION */}
      <section ref={containerRef} className="relative w-full pt-48 pb-20 px-8 flex flex-col items-center text-center overflow-hidden h-[100vh]">
        <motion.div style={{ y, opacity }} className="max-w-6xl w-full z-10 flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-[11px] font-bold tracking-[0.2em] uppercase text-zinc-500 mb-6"
          >
            freevideo OS 2.0
          </motion.div>
          
          <AnimatedRevealText 
            text="The new standard for video automation." 
            className="font-heading text-6xl md:text-8xl lg:text-[110px] font-medium tracking-tighter leading-[0.95] text-white max-w-5xl"
          />

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-3xl text-zinc-400 font-light mt-12 max-w-3xl"
          >
            Generate, schedule, and scale your content across every platform, flawlessly.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12"
          >
            {!isSignedIn ? (
              <SignUpButton mode="modal" forceRedirectUrl="/dashboard">
                <Button size="lg" className="h-14 px-10 rounded-none bg-white text-black hover:bg-zinc-200 text-[15px] font-semibold transition-all">
                  Start Building
                </Button>
              </SignUpButton>
            ) : (
              <Link href="/dashboard">
                <Button size="lg" className="h-14 px-10 rounded-none bg-white text-black hover:bg-zinc-200 text-[15px] font-semibold transition-all">
                  Go to Dashboard
                </Button>
              </Link>
            )}
          </motion.div>
        </motion.div>
      </section>

      {/* HARDWARE MOCKUP SECTION */}
      <section className="w-full max-w-[1400px] mx-auto px-8 -mt-32 relative z-20 pb-40">
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full aspect-video bg-zinc-900 rounded-[20px] md:rounded-[40px] p-2 md:p-4 border border-white/[0.05] shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden"
        >
          <div className="w-full h-full bg-black rounded-[14px] md:rounded-[30px] overflow-hidden relative flex items-center justify-center border border-white/[0.05]">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-30 grayscale"></div>
            <div className="z-10 flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center mb-6 cursor-pointer hover:scale-105 transition-transform duration-500 border border-white/20">
                <Play className="w-8 h-8 fill-white text-white ml-1" />
              </div>
              <p className="text-[13px] font-semibold tracking-widest uppercase text-white/70">Watch Film</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* EDITORIAL FEATURES */}
      <section id="platform" className="w-full py-32 border-t border-white/[0.05]">
        <div className="max-w-[1400px] mx-auto px-8">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-32"
          >
            <h2 className="font-heading text-4xl md:text-7xl font-medium tracking-tighter text-white max-w-4xl">
              Intelligence built into every frame.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-32">
            {/* Feature 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="flex flex-col"
            >
              <div className="w-full aspect-[4/3] bg-zinc-900 mb-10 overflow-hidden relative">
                {/* Abstract visualization */}
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-32 h-32 rounded-full border border-white/20 absolute animate-[spin_10s_linear_infinite]" />
                   <div className="w-48 h-48 rounded-full border border-white/10 absolute animate-[spin_15s_linear_infinite_reverse]" />
                   <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              </div>
              <h3 className="font-heading text-2xl font-semibold mb-4">Generative AI Core</h3>
              <p className="text-lg text-zinc-400 font-light leading-relaxed">
                Provide a prompt, and our infrastructure writes the script, sources the B-roll, and synthesizes human-like voiceovers in milliseconds. Zero manual editing required.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              className="flex flex-col md:mt-32"
            >
              <div className="w-full aspect-[4/3] bg-zinc-900 mb-10 overflow-hidden relative flex flex-col justify-end p-8">
                {/* Abstract calendar visualization */}
                <div className="w-full bg-black border border-white/10 h-48 relative overflow-hidden">
                  <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-white/10" />
                  <div className="absolute left-1/3 top-0 bottom-0 w-[1px] bg-white/10" />
                  <div className="absolute left-2/3 top-0 bottom-0 w-[1px] bg-white/10" />
                  <div className="absolute top-1/4 left-8 right-1/2 h-8 bg-white/20" />
                  <div className="absolute top-2/3 left-1/3 right-8 h-8 bg-white/10" />
                </div>
              </div>
              <h3 className="font-heading text-2xl font-semibold mb-4">Global Scheduling</h3>
              <p className="text-lg text-zinc-400 font-light leading-relaxed">
                Deploy your content globally. Our deterministic scheduling algorithm ensures your videos go live exactly when your audience is most active.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MARQUEE LOGOS */}
      <section className="w-full py-24 border-t border-white/[0.05] bg-black overflow-hidden relative flex flex-col items-center">
        <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-zinc-600 mb-16 text-center">Engineered for</p>
        
        <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
            className="flex items-center gap-24 pr-24 grayscale opacity-50"
          >
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-24">
                <div className="flex items-center gap-3 text-3xl font-medium tracking-tighter text-white"><Instagram className="w-8 h-8" /> Instagram</div>
                <div className="flex items-center gap-3 text-3xl font-medium tracking-tighter text-white"><Youtube className="w-9 h-9" /> YouTube Shorts</div>
                <div className="flex items-center gap-3 text-3xl font-medium tracking-tighter text-white"><span className="font-serif italic text-4xl">Mail</span>chimp</div>
                <div className="flex items-center gap-3 text-3xl font-medium tracking-tighter text-white">TikTok</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FULL BLEED CTA */}
      <section className="w-full border-t border-white/[0.05]">
        <div className="w-full h-screen min-h-[600px] flex flex-col items-center justify-center text-center px-8 relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl flex flex-col items-center"
          >
            <h2 className="font-heading text-5xl md:text-8xl font-medium tracking-tighter text-white mb-8">
              Build your audience.
            </h2>
            <p className="text-xl md:text-2xl text-zinc-400 font-light mb-12 max-w-2xl">
              Experience the power of automated video infrastructure today.
            </p>
            {!isSignedIn ? (
              <SignUpButton mode="modal" forceRedirectUrl="/sync">
                <Button size="lg" className="h-16 px-12 rounded-none bg-white text-black hover:bg-zinc-200 text-[15px] font-bold tracking-wide uppercase transition-all">
                  Create an account
                </Button>
              </SignUpButton>
            ) : (
              <Link href="/dashboard">
                <Button size="lg" className="h-16 px-12 rounded-none bg-white text-black hover:bg-zinc-200 text-[15px] font-bold tracking-wide uppercase transition-all">
                  Go to Dashboard
                </Button>
              </Link>
            )}
          </motion.div>
        </div>
      </section>

    </div>
  );
}
