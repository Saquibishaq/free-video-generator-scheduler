"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Ghost, Lightbulb, GraduationCap, Laptop, HeartPulse, ShieldAlert, ArrowRight } from "lucide-react";

interface Step1NicheProps {
  selectedNiche: string;
  onSelect: (niche: string) => void;
  onContinue: () => void;
  onBack: () => void;
}

const AVAILABLE_NICHES = [
  { id: "scary-stories", title: "Scary Stories", description: "Creepy pasta, horror tales, and paranormal encounters.", icon: Ghost },
  { id: "motivational", title: "Motivational", description: "Inspiring speeches, success stories, and self-improvement.", icon: Lightbulb },
  { id: "educational", title: "Educational", description: "Fascinating facts, history deep-dives, and science explained.", icon: GraduationCap },
  { id: "tech-news", title: "Tech News", description: "Latest gadgets, AI breakthroughs, and software updates.", icon: Laptop },
  { id: "health-fitness", title: "Health & Fitness", description: "Workout tips, healthy recipes, and mental wellness.", icon: HeartPulse },
  { id: "true-crime", title: "True Crime", description: "Unsolved mysteries, investigations, and criminal psychology.", icon: ShieldAlert },
];

export function Step1Niche({ selectedNiche, onSelect, onContinue, onBack }: Step1NicheProps) {
  const [customNiche, setCustomNiche] = useState("");

  const isCustomActive = selectedNiche && !AVAILABLE_NICHES.find(n => n.title === selectedNiche);

  return (
    <div className="bg-[#111] border border-white/10 rounded-2xl p-8 shadow-2xl relative flex flex-col min-h-[600px]">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">What is your series about?</h2>
        <p className="text-zinc-400 font-medium">Select a proven niche or create your own custom category.</p>
      </div>

      <Tabs defaultValue="available" className="w-full flex flex-col flex-1">
        <TabsList className="bg-white/5 border border-white/5 p-1 rounded-lg self-start mb-8">
          <TabsTrigger value="available" className="rounded-md px-6 py-2 text-sm data-[state=active]:bg-white data-[state=active]:text-black transition-all">Available Niche</TabsTrigger>
          <TabsTrigger value="custom" className="rounded-md px-6 py-2 text-sm data-[state=active]:bg-white data-[state=active]:text-black transition-all">Custom Niche</TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="flex-1 outline-none relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 overflow-y-auto max-h-[400px] pr-2 pb-24">
            {AVAILABLE_NICHES.map((niche) => {
              const isActive = selectedNiche === niche.title;
              return (
                <div 
                  key={niche.id}
                  onClick={() => onSelect(niche.title)}
                  className={`relative p-6 rounded-xl cursor-pointer transition-all duration-300 group overflow-hidden ${
                    isActive 
                      ? "bg-white/10 border-white/50 shadow-[0_0_30px_rgba(255,255,255,0.05)] ring-1 ring-white/50 scale-[1.02]" 
                      : "bg-[#09090b] border-white/5 hover:border-white/20 hover:bg-white/5"
                  } border`}
                >
                  {isActive && (
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 blur-2xl rounded-full pointer-events-none" />
                  )}
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-5 transition-colors ${
                    isActive ? "bg-white text-black" : "bg-white/5 text-white group-hover:bg-white/10"
                  }`}>
                    <niche.icon className="w-6 h-6" />
                  </div>
                  <h3 className={`text-lg font-semibold mb-2 ${isActive ? "text-white" : "text-zinc-200"}`}>
                    {niche.title}
                  </h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    {niche.description}
                  </p>
                </div>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="custom" className="flex-1 outline-none min-h-[400px]">
          <div className="max-w-xl">
            <label className="block text-sm font-medium text-zinc-300 mb-3">Describe your niche</label>
            <Input 
              placeholder="e.g. Vintage cars and restoration tips..."
              value={isCustomActive ? selectedNiche : customNiche}
              onChange={(e) => {
                setCustomNiche(e.target.value);
                onSelect(e.target.value);
              }}
              className="bg-[#09090b] border-white/10 h-14 text-white px-4 focus-visible:ring-1 focus-visible:ring-white/30 rounded-xl"
            />
            <div className="mt-6 flex items-start gap-4 p-5 bg-amber-500/10 border border-amber-500/20 rounded-xl">
              <Sparkles className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-200/70 leading-relaxed">
                Custom niches work best when they are highly specific. Try to include the target audience or the core theme of the videos to give the AI better context.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Floating Action Bar */}
      <div className="absolute bottom-0 left-0 right-0 p-8 pt-16 bg-gradient-to-t from-[#111] via-[#111] to-transparent pointer-events-none rounded-b-2xl flex justify-between items-center">
        <Button 
          onClick={onBack}
          variant="outline"
          className="pointer-events-auto h-12 px-6 rounded-xl font-medium border-white/20 text-white hover:bg-white/10 hover:text-white transition-all bg-transparent"
        >
          Back
        </Button>
        
        <Button 
          onClick={onContinue}
          disabled={!selectedNiche}
          className={`pointer-events-auto h-12 px-8 rounded-xl font-semibold transition-all duration-500 flex items-center gap-2 ${
            selectedNiche 
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
