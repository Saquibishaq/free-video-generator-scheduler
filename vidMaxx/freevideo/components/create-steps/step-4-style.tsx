"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export const VIDEO_STYLES = [
  {
    id: "realistic",
    name: "Hyper Realistic",
    description: "4K photorealistic rendering",
    image: "/video-style/realistic.png",
  },
  {
    id: "cinematic",
    name: "Cinematic",
    description: "Moody lighting & film grain",
    image: "/video-style/cinematic.png",
  },
  {
    id: "anime",
    name: "Anime Style",
    description: "Vibrant Japanese animation",
    image: "/video-style/anime.png",
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk",
    description: "Neon lit futuristic aesthetic",
    image: "/video-style/cyberpunk.png",
  },
  {
    id: "gta",
    name: "GTA Style",
    description: "Iconic cel-shaded artwork",
    image: "/video-style/gta.png",
  },
];

interface Step4StyleProps {
  selectedStyle: string;
  onSelect: (styleId: string) => void;
  onContinue: () => void;
  onBack: () => void;
}

export function Step4Style({ selectedStyle, onSelect, onContinue, onBack }: Step4StyleProps) {
  return (
    <div className="bg-[#111] border border-white/10 rounded-2xl p-8 shadow-2xl relative flex flex-col min-h-[600px] overflow-hidden">
      <div className="mb-8 z-10 relative">
        <h2 className="text-2xl font-bold text-white mb-2">Visual Style</h2>
        <p className="text-zinc-400 font-medium">Select the artistic direction and visual aesthetic for your video generations.</p>
      </div>

      <div className="flex-1 w-full flex flex-col pb-24 z-10 relative">
        {/* Horizontal Scroll Container */}
        <div className="flex overflow-x-auto gap-6 pb-8 pt-4 px-2 -mx-2 custom-scrollbar snap-x snap-mandatory">
          {VIDEO_STYLES.map((style) => {
            const isActive = selectedStyle === style.id;
            
            return (
              <div 
                key={style.id}
                onClick={() => onSelect(style.id)}
                className={`relative shrink-0 w-[220px] sm:w-[260px] aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer group transition-all duration-500 snap-center ${
                  isActive 
                    ? "ring-4 ring-white shadow-[0_0_40px_rgba(255,255,255,0.2)] scale-[1.02] z-10" 
                    : "ring-1 ring-white/10 hover:ring-white/30 hover:shadow-2xl opacity-70 hover:opacity-100"
                }`}
              >
                {/* Image Background */}
                <Image 
                  src={style.image} 
                  alt={style.name} 
                  fill
                  sizes="(max-width: 768px) 220px, 260px"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
                <div className={`absolute inset-0 transition-opacity duration-500 ${isActive ? "bg-white/10" : "bg-transparent group-hover:bg-white/5"}`} />

                {/* Selection Indicator */}
                {isActive && (
                  <div className="absolute top-4 right-4 bg-white text-black rounded-full p-1 animate-in zoom-in duration-300 shadow-lg">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                )}

                {/* Text Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 transform transition-transform duration-300">
                  <div className="flex items-center gap-2 mb-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                    <Sparkles className={`w-3.5 h-3.5 ${isActive ? "text-amber-400" : "text-white"}`} />
                    <span className="text-[10px] font-bold tracking-wider uppercase text-white/80">Premium Style</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1 tracking-tight">{style.name}</h3>
                  <p className="text-sm text-zinc-300 font-medium line-clamp-2">{style.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Action Bar */}
      <div className="absolute bottom-0 left-0 right-0 p-8 pt-16 bg-gradient-to-t from-[#111] via-[#111] to-transparent pointer-events-none rounded-b-2xl flex justify-between items-center z-20">
        <Button 
          onClick={onBack}
          variant="outline"
          className="pointer-events-auto h-12 px-6 rounded-xl font-medium border-white/20 text-white hover:bg-white/10 hover:text-white transition-all bg-transparent"
        >
          Back
        </Button>
        
        <Button 
          onClick={onContinue}
          disabled={!selectedStyle}
          className={`pointer-events-auto h-12 px-8 rounded-xl font-semibold transition-all duration-500 flex items-center gap-2 ${
            selectedStyle
              ? "bg-white text-black hover:bg-zinc-200 hover:scale-[1.02] translate-y-0 opacity-100" 
              : "bg-white/10 text-white/30 translate-y-4 opacity-0"
          }`}
        >
          Continue
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
