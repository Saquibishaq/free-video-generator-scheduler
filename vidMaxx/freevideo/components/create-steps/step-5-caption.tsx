"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Type, CheckCircle2 } from "lucide-react";
import { CAPTION_STYLES_LIST } from "@/components/caption-styles";

interface Step5CaptionProps {
  selectedCaption: string;
  onSelect: (captionId: string) => void;
  onContinue: () => void;
  onBack: () => void;
}

export function Step5Caption({ selectedCaption, onSelect, onContinue, onBack }: Step5CaptionProps) {
  const SAMPLE_TEXT = "This is a live preview of your captions.";

  return (
    <div className="bg-[#111] border border-white/10 rounded-2xl p-8 shadow-2xl relative flex flex-col min-h-[650px] overflow-hidden">
      <div className="mb-8 z-10 relative">
        <h2 className="text-2xl font-bold text-white mb-2">Caption Style</h2>
        <p className="text-zinc-400 font-medium">Choose how your AI-generated subtitles will animate on screen.</p>
      </div>

      <div className="flex-1 w-full flex flex-col pb-24 z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto pr-2 custom-scrollbar max-h-[450px]">
          {CAPTION_STYLES_LIST.map((style) => {
            const isActive = selectedCaption === style.id;
            const StyleComponent = style.component;
            
            return (
              <div 
                key={style.id}
                onClick={() => onSelect(style.id)}
                className={`relative rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 flex flex-col h-[200px] ${
                  isActive 
                    ? "ring-2 ring-white shadow-[0_0_30px_rgba(255,255,255,0.15)] scale-[1.02] bg-white/10" 
                    : "ring-1 ring-white/10 hover:ring-white/30 bg-[#09090b] hover:bg-white/5"
                }`}
              >
                {/* Selection Indicator */}
                {isActive && (
                  <div className="absolute top-4 right-4 bg-white text-black rounded-full p-1 animate-in zoom-in duration-300 shadow-lg z-20">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                )}

                {/* Animated Preview Area */}
                <div className="flex-1 relative flex items-center justify-center p-6 overflow-hidden bg-black/40">
                  {/* Subtle grid background for aesthetic */}
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
                  <div className="z-10 w-full flex items-center justify-center">
                     <StyleComponent text={SAMPLE_TEXT} />
                  </div>
                </div>

                {/* Info Bar */}
                <div className="h-14 border-t border-white/10 flex items-center px-4 bg-black/50 backdrop-blur-md">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 transition-colors ${
                    isActive ? "bg-white text-black" : "bg-white/10 text-white group-hover:bg-white/20"
                  }`}>
                    <Type className="w-4 h-4" />
                  </div>
                  <h3 className={`font-semibold text-sm ${isActive ? "text-white" : "text-zinc-300"}`}>
                    {style.name}
                  </h3>
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
          disabled={!selectedCaption}
          className={`pointer-events-auto h-12 px-8 rounded-xl font-semibold transition-all duration-500 flex items-center gap-2 ${
            selectedCaption
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
