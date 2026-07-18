"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, PlaySquare, Camera, Mail, CalendarPlus, AlertCircle } from "lucide-react";

interface Step6DetailsProps {
  seriesName: string;
  duration: string;
  platform: string;
  publishTime: string;
  onUpdate: (field: string, value: string) => void;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting?: boolean;
}

const PLATFORMS = [
  { id: "youtube", name: "YouTube", icon: PlaySquare, color: "hover:text-red-500 hover:border-red-500/50 hover:bg-red-500/10" },
  { id: "instagram", name: "Instagram", icon: Camera, color: "hover:text-pink-500 hover:border-pink-500/50 hover:bg-pink-500/10" },
  { id: "email", name: "Email", icon: Mail, color: "hover:text-blue-500 hover:border-blue-500/50 hover:bg-blue-500/10" },
];

export function Step6Details({ seriesName, duration, platform, publishTime, onUpdate, onSubmit, onBack, isSubmitting }: Step6DetailsProps) {
  
  const isValid = seriesName.trim().length > 0 && duration && platform && publishTime;

  return (
    <div className="bg-[#111] border border-white/10 rounded-2xl p-8 shadow-2xl relative flex flex-col min-h-[650px] overflow-hidden">
      <div className="mb-8 z-10 relative">
        <h2 className="text-2xl font-bold text-white mb-2">Final Details</h2>
        <p className="text-zinc-400 font-medium">Set your series name, duration, and schedule your automated publishing.</p>
      </div>

      <div className="flex-1 w-full flex flex-col pb-24 z-10 relative overflow-y-auto custom-scrollbar pr-4">
        <div className="space-y-8 max-w-xl">
          
          {/* Series Name */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-zinc-300">Series Name</label>
            <Input 
              placeholder="e.g. Daily Motivation Shorts" 
              value={seriesName}
              onChange={(e) => onUpdate("seriesName", e.target.value)}
              className="bg-[#09090b] border-white/10 text-white h-14 rounded-xl focus-visible:ring-1 focus-visible:ring-white/30 text-lg px-4"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Video Duration */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-zinc-300">Video Duration</label>
              <Select value={duration} onValueChange={(val) => onUpdate("duration", val)}>
                <SelectTrigger className="bg-[#09090b] border-white/10 h-14 rounded-xl text-white focus:ring-1 focus:ring-white/30">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent className="bg-[#09090b] border-white/10 text-white">
                  <SelectItem value="10-30" className="focus:bg-white/10 focus:text-white cursor-pointer">10–30 sec video</SelectItem>
                  <SelectItem value="40-60" className="focus:bg-white/10 focus:text-white cursor-pointer">40–60 sec video</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Publishing Time */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-zinc-300">Daily Publishing Time</label>
              <Select value={publishTime} onValueChange={(val) => onUpdate("publishTime", val)}>
                <SelectTrigger className="bg-[#09090b] border-white/10 h-14 rounded-xl text-white focus:ring-1 focus:ring-white/30 pl-11 relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                  <SelectValue placeholder="Select a time" />
                </SelectTrigger>
                <SelectContent className="bg-[#09090b] border-white/10 text-white">
                  <SelectItem value="08:00" className="focus:bg-white/10 focus:text-white cursor-pointer">Morning (8:00 AM)</SelectItem>
                  <SelectItem value="12:00" className="focus:bg-white/10 focus:text-white cursor-pointer">Noon (12:00 PM)</SelectItem>
                  <SelectItem value="15:00" className="focus:bg-white/10 focus:text-white cursor-pointer">Afternoon (3:00 PM)</SelectItem>
                  <SelectItem value="18:00" className="focus:bg-white/10 focus:text-white cursor-pointer">Evening (6:00 PM)</SelectItem>
                  <SelectItem value="21:00" className="focus:bg-white/10 focus:text-white cursor-pointer">Night (9:00 PM)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Platform Selection */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-zinc-300">Target Platform</label>
            <div className="grid grid-cols-3 gap-4">
              {PLATFORMS.map((p) => {
                const isActive = platform === p.id;
                const Icon = p.icon;
                return (
                  <button
                    key={p.id}
                    onClick={() => onUpdate("platform", p.id)}
                    className={`h-24 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all duration-300 ${
                      isActive 
                        ? "bg-white/10 border-white/40 text-white scale-[1.02] shadow-[0_0_20px_rgba(255,255,255,0.05)]" 
                        : `bg-[#09090b] border-white/10 text-zinc-500 ${p.color}`
                    }`}
                  >
                    <Icon className={`w-6 h-6 ${isActive ? "text-white" : ""}`} />
                    <span className="text-sm font-medium">{p.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Note */}
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex gap-3 items-start">
            <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-500/90 font-medium leading-relaxed">
              <strong className="text-amber-500">Note:</strong> Video will generate 3–6 hours before video publish time to ensure it is ready and fully rendered on schedule.
            </p>
          </div>

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
          onClick={onSubmit}
          disabled={!isValid || isSubmitting}
          className={`pointer-events-auto h-12 px-8 rounded-xl font-bold transition-all duration-500 flex items-center gap-2 ${
            isValid
              ? "bg-amber-500 text-white hover:bg-amber-600 hover:scale-[1.02] shadow-[0_0_20px_rgba(245,158,11,0.3)] translate-y-0 opacity-100" 
              : "bg-white/10 text-white/30 translate-y-4 opacity-0"
          }`}
        >
          <CalendarPlus className="w-4 h-4" />
          {isSubmitting ? "Scheduling..." : "Schedule Series"}
        </Button>
      </div>
    </div>
  );
}
