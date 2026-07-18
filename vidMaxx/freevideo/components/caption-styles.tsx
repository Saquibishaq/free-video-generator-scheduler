"use client";

import React, { useState, useEffect } from 'react';

// A helper hook to simulate words being spoken over time for the previews
function useSimulatedSpeech(text: string, speedMs: number = 300) {
  const words = text.split(" ");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % (words.length + 2)); // +2 gives a small pause at the end
    }, speedMs);
    return () => clearInterval(interval);
  }, [words.length, speedMs]);

  return { words, currentWordIndex };
}

interface CaptionStyleProps {
  text: string;
}

export const CaptionStyle1_Highlight = ({ text }: CaptionStyleProps) => {
  const { words, currentWordIndex } = useSimulatedSpeech(text, 400);

  return (
    <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 text-center font-bold text-2xl uppercase font-sans">
      {words.map((word, i) => (
        <span 
          key={i} 
          className={`transition-all duration-200 px-1 rounded-sm ${
            i === currentWordIndex 
              ? "bg-amber-400 text-black scale-110 shadow-[0_0_15px_rgba(251,191,36,0.8)]" 
              : "text-white scale-100"
          } ${i > currentWordIndex ? "opacity-40" : "opacity-100"}`}
        >
          {word}
        </span>
      ))}
    </div>
  );
};

export const CaptionStyle2_Pop = ({ text }: CaptionStyleProps) => {
  const { words, currentWordIndex } = useSimulatedSpeech(text, 350);

  return (
    <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 text-center font-black text-3xl uppercase tracking-tight">
      {words.map((word, i) => (
        <span 
          key={i} 
          style={{ 
            textShadow: "2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 0 4px 15px rgba(0,0,0,0.5)",
            color: i === currentWordIndex ? "#22d3ee" : "#ffffff", // Cyan pop
          }}
          className={`transition-all duration-200 ${
            i === currentWordIndex 
              ? "scale-125 -translate-y-2 rotate-2 opacity-100" 
              : i < currentWordIndex ? "scale-100 opacity-90" : "scale-50 opacity-0"
          }`}
        >
          {word}
        </span>
      ))}
    </div>
  );
};

export const CaptionStyle3_Karaoke = ({ text }: CaptionStyleProps) => {
  const { words, currentWordIndex } = useSimulatedSpeech(text, 300);

  return (
    <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 text-center font-bold text-2xl font-serif">
      {words.map((word, i) => (
        <span 
          key={i} 
          className={`transition-colors duration-300 ${
            i <= currentWordIndex ? "text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.8)]" : "text-white/30"
          }`}
        >
          {word}
        </span>
      ))}
    </div>
  );
};

export const CaptionStyle4_Typewriter = ({ text }: CaptionStyleProps) => {
  const { words, currentWordIndex } = useSimulatedSpeech(text, 250);
  // Show up to the current word
  const visibleWords = words.slice(0, currentWordIndex + 1).join(" ");

  return (
    <div className="text-center font-mono text-2xl font-bold text-white tracking-widest bg-black/50 p-2 rounded border border-green-500/30">
      {visibleWords}
      <span className="animate-pulse bg-green-400 w-3 h-6 inline-block ml-1 align-middle" />
    </div>
  );
};

export const CaptionStyle5_Glitch = ({ text }: CaptionStyleProps) => {
  const { words, currentWordIndex } = useSimulatedSpeech(text, 400);

  return (
    <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-center font-black text-3xl uppercase italic transform -skew-x-12">
      {words.map((word, i) => (
        <span 
          key={i} 
          className={`relative transition-all duration-75 ${
            i === currentWordIndex ? "text-fuchsia-500 scale-110 blur-[0.5px]" : "text-white opacity-40"
          }`}
          style={i === currentWordIndex ? { textShadow: "2px 0 #0ff, -2px 0 #f0f" } : {}}
        >
          {word}
        </span>
      ))}
    </div>
  );
};

export const CaptionStyle6_Minimal = ({ text }: CaptionStyleProps) => {
  const { words, currentWordIndex } = useSimulatedSpeech(text, 500);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 shadow-2xl">
        <span className="font-medium text-xl text-white tracking-wide transition-all duration-300">
          {words[currentWordIndex] || "..."}
        </span>
      </div>
    </div>
  );
};

export const CAPTION_STYLES_LIST = [
  { id: "highlight", name: "The Viral Highlight", component: CaptionStyle1_Highlight },
  { id: "pop", name: "Dynamic Pop", component: CaptionStyle2_Pop },
  { id: "karaoke", name: "Karaoke Reveal", component: CaptionStyle3_Karaoke },
  { id: "typewriter", name: "Terminal Typewriter", component: CaptionStyle4_Typewriter },
  { id: "glitch", name: "Cyberpunk Glitch", component: CaptionStyle5_Glitch },
  { id: "minimal", name: "Sleek Minimalist", component: CaptionStyle6_Minimal },
];
