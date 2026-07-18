"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Square, ArrowRight, Music } from "lucide-react";

export const BG_MUSIC_TRACKS = [
  {
    id: "none",
    name: "No Background Music",
    url: "",
    duration: "-",
  },
  {
    id: "track-1",
    name: "Instagram Reels Marketing",
    url: "https://ik.imagekit.io/Tubeguruji/BgMusic/instagram-reels-marketing-music-469052.mp3",
    duration: "0:30",
  },
  {
    id: "track-2",
    name: "Trending Reels Vibe",
    url: "https://ik.imagekit.io/Tubeguruji/BgMusic/trending-instagram-reels-music-447249.mp3",
    duration: "0:25",
  },
  {
    id: "track-3",
    name: "Marketing Upbeat",
    url: "https://ik.imagekit.io/Tubeguruji/BgMusic/instagram-reels-marketing-music-384448.mp3",
    duration: "0:45",
  },
  {
    id: "track-4",
    name: "Basketball Energy",
    url: "https://ik.imagekit.io/Tubeguruji/BgMusic/basketball-instagram-reels-music-461852.mp3",
    duration: "0:40",
  },
  {
    id: "track-5",
    name: "Dramatic Hip-Hop Jazz",
    url: "https://ik.imagekit.io/Tubeguruji/BgMusic/dramatic-hip-hop-music-background-jazz-music-for-short-video-148505.mp3",
    duration: "0:50",
  },
];

interface Step3MusicProps {
  selectedMusic: string;
  onSelect: (musicId: string) => void;
  onContinue: () => void;
  onBack: () => void;
}

export function Step3Music({ selectedMusic, onSelect, onContinue, onBack }: Step3MusicProps) {
  const [playingTrack, setPlayingTrack] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handlePlayPreview = (trackId: string, url: string) => {
    if (playingTrack === trackId && audioRef.current) {
      // Toggle pause
      audioRef.current.pause();
      setPlayingTrack(null);
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio(url);
    audio.play().then(() => {
      audioRef.current = audio;
      setPlayingTrack(trackId);
    }).catch((e) => {
      console.error("Failed to play bg music:", e);
      setPlayingTrack(null);
    });

    audio.onended = () => {
      setPlayingTrack(null);
    };
  };

  return (
    <div className="bg-[#111] border border-white/10 rounded-2xl p-8 shadow-2xl relative flex flex-col min-h-[600px]">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Background Music</h2>
        <p className="text-zinc-400 font-medium">Select a dynamic backing track to set the perfect vibe for your series.</p>
      </div>

      <div className="flex-1 w-full flex flex-col pb-24">
        <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar max-h-[400px]">
          {BG_MUSIC_TRACKS.map((track) => {
            const isActive = selectedMusic === track.id;
            const isPlaying = playingTrack === track.id;
            
            return (
              <div 
                key={track.id}
                className={`relative p-4 rounded-xl transition-all duration-300 group overflow-hidden border flex items-center justify-between ${
                  isActive 
                    ? "bg-white/10 border-white/50 shadow-[0_0_30px_rgba(255,255,255,0.05)] ring-1 ring-white/50 scale-[1.01]" 
                    : "bg-[#09090b] border-white/5 hover:border-white/20 hover:bg-white/5 cursor-pointer"
                }`}
                onClick={() => onSelect(track.id)}
              >
                {isActive && (
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full pointer-events-none" />
                )}
                
                <div className="flex items-center gap-4 z-10">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    isActive ? "bg-white/10 text-white" : "bg-white/5 text-zinc-500"
                  }`}>
                    <Music className={`w-5 h-5 ${isActive ? "text-white" : "text-zinc-500 group-hover:text-white"}`} />
                  </div>
                  <div>
                    <h3 className={`text-base font-semibold ${isActive ? "text-white" : "text-zinc-200 group-hover:text-white transition-colors"}`}>
                      {track.name}
                    </h3>
                    <p className="text-xs text-zinc-500 mt-0.5">High-Quality Audio Track • {track.duration}</p>
                  </div>
                </div>
                
                <div className="z-10 flex items-center gap-4">
                  {track.url && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlayPreview(track.id, track.url);
                      }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        isPlaying 
                          ? "bg-amber-500 text-white shadow-[0_0_15px_rgba(245,158,11,0.4)]" 
                          : "bg-white/10 text-white hover:bg-white/20"
                      }`}
                    >
                      {isPlaying ? <Square className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                    </button>
                  )}
                  
                  {/* Select Indicator */}
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    isActive ? "border-white bg-white" : "border-white/20"
                  }`}>
                    {isActive && <div className="w-2.5 h-2.5 bg-black rounded-full" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

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
          disabled={!selectedMusic}
          className={`pointer-events-auto h-12 px-8 rounded-xl font-semibold transition-all duration-500 flex items-center gap-2 ${
            selectedMusic
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
