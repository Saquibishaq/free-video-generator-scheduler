"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Square, ArrowRight, Volume2, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getVoicePreviewDataUri } from "./actions";

export const LANGUAGES = [
  { Language: "English", countryCode: "US", countryFlag: "🇺🇸", modelName: "deepgram", modelLangCode: "en-US" },
  { Language: "Spanish", countryCode: "MX", countryFlag: "🇲🇽", modelName: "deepgram", modelLangCode: "es-MX" },
  { Language: "German", countryCode: "DE", countryFlag: "🇩🇪", modelName: "deepgram", modelLangCode: "de-DE" },
  { Language: "Hindi", countryCode: "IN", countryFlag: "🇮🇳", modelName: "fonadaLab", modelLangCode: "hi-IN" },
  { Language: "Marathi", countryCode: "IN", countryFlag: "🇮🇳", modelName: "fonadaLab", modelLangCode: "mr-IN" },
  { Language: "Telugu", countryCode: "IN", countryFlag: "🇮🇳", modelName: "fonadaLab", modelLangCode: "te-IN" },
];

export const VOICES = {
  deepgram: [
    { model: "deepgram", modelName: "aura-2-odysseus-en", preview: "deepgram-aura-2-odysseus-en.wav", gender: "male" },
    { model: "deepgram", modelName: "aura-2-thalia-en", preview: "deepgram-aura-2-thalia-en.wav", gender: "female" },
    { model: "deepgram", modelName: "aura-2-amalthea-en", preview: "deepgram-aura-2-amalthea-en.wav", gender: "female" },
    { model: "deepgram", modelName: "aura-2-andromeda-en", preview: "deepgram-aura-2-andromeda-en.wav", gender: "female" },
    { model: "deepgram", modelName: "aura-2-apollo-en", preview: "deepgram-aura-2-apollo-en.wav", gender: "male" },
  ],
  fonadaLab: [
    { model: "fonadaLab", modelName: "vanee", preview: "fonadalab-vanee.mp3", gender: "female" },
    { model: "fonadaLab", modelName: "chitraa", preview: "fonadalab-chitraa.mp3", gender: "female" },
    { model: "fonadaLab", modelName: "paaga", preview: "fonadalab-paaga.mp3", gender: "male" },
  ]
};

interface Step2VoiceProps {
  selectedLanguage: string;
  selectedVoice: string;
  onLanguageSelect: (langCode: string) => void;
  onVoiceSelect: (voiceName: string) => void;
  onContinue: () => void;
  onBack: () => void;
}

export function Step2Voice({ selectedLanguage, selectedVoice, onLanguageSelect, onVoiceSelect, onContinue, onBack }: Step2VoiceProps) {
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);
  const [loadingVoice, setLoadingVoice] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Stop audio when component unmounts or language changes
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [selectedLanguage]);

  const handlePlayPreview = async (voiceName: string, previewFile: string) => {
    if (playingVoice === voiceName && audioRef.current) {
      // Toggle pause
      audioRef.current.pause();
      setPlayingVoice(null);
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
    }
    
    setLoadingVoice(voiceName);

    // Determine sample text and language code for Google TTS
    let text = "Hello, this is a sample preview of how this voice will sound.";
    let tl = "en";

    if (currentLangObj.modelLangCode.startsWith("hi")) {
      text = "नमस्ते, यह आवाज़ का नमूना है।";
      tl = "hi";
    } else if (currentLangObj.modelLangCode.startsWith("es")) {
      text = "Hola, esta es una muestra de voz.";
      tl = "es";
    } else if (currentLangObj.modelLangCode.startsWith("de")) {
      text = "Hallo, das ist ein Stimmbeispiel.";
      tl = "de";
    } else if (currentLangObj.modelLangCode.startsWith("mr")) {
      text = "नमस्कार, हे आवाजाचे नमुना आहे.";
      tl = "mr";
    } else if (currentLangObj.modelLangCode.startsWith("te")) {
      text = "నమస్కారం, ఇది వాయిస్ నమూనా.";
      tl = "te";
    }

    // Fetch the raw base64 audio data directly via Server Action
    const dataUri = await getVoicePreviewDataUri(text, tl);
    setLoadingVoice(null);

    if (!dataUri) {
      console.error("Failed to load audio data URI");
      return;
    }

    const audio = new Audio(dataUri);
    
    // Simulate gender differences using playback rate (imperfect but better than nothing)
    const voiceData = availableVoices.find(v => v.modelName === voiceName);
    if (voiceData?.gender === "male") {
      audio.playbackRate = 0.85; // Slightly deeper/slower for males
    } else {
      audio.playbackRate = 1.15; // Slightly higher/faster for females
    }

    audio.play().then(() => {
      audioRef.current = audio;
      setPlayingVoice(voiceName);
    }).catch((e) => {
      console.error("Failed to play audio preview:", e);
      setPlayingVoice(null);
    });

    audio.onended = () => {
      setPlayingVoice(null);
    };
  };

  const currentLangObj = LANGUAGES.find(l => l.modelLangCode === selectedLanguage) || LANGUAGES[0];
  const availableVoices = VOICES[currentLangObj.modelName as keyof typeof VOICES] || [];

  return (
    <div className="bg-[#111] border border-white/10 rounded-2xl p-8 shadow-2xl relative flex flex-col min-h-[600px]">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Language & Voice</h2>
        <p className="text-zinc-400 font-medium">Select the language and AI voice model for your series.</p>
      </div>

      <div className="flex-1 w-full flex flex-col pb-24">
        {/* Language Selection */}
        <div className="mb-8 max-w-sm">
          <label className="block text-sm font-medium text-zinc-300 mb-3">Video Language</label>
          <Select 
            value={selectedLanguage} 
            onValueChange={(val) => {
              if (val) {
                onLanguageSelect(val);
                onVoiceSelect(""); // Reset voice on language change
              }
            }}
          >
            <SelectTrigger className="bg-[#09090b] border-white/10 h-14 text-white focus:ring-1 focus:ring-white/30 rounded-xl">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent className="bg-[#09090b] border-white/10 text-white">
              {LANGUAGES.map((lang) => (
                <SelectItem key={lang.modelLangCode} value={lang.modelLangCode} className="focus:bg-white/10 focus:text-white cursor-pointer">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{lang.countryFlag}</span>
                    <span>{lang.Language}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Voice Selection */}
        <div className="flex-1 min-h-0 flex flex-col">
          <label className="block text-sm font-medium text-zinc-300 mb-3 flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-zinc-400" />
            Select Voice Model ({currentLangObj.modelName})
          </label>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 overflow-y-auto pr-2 custom-scrollbar max-h-[350px]">
            {availableVoices.map((voice) => {
              const isActive = selectedVoice === voice.modelName;
              const isPlaying = playingVoice === voice.modelName;
              
              const isLoading = loadingVoice === voice.modelName;
              
              return (
                <div 
                  key={voice.modelName}
                  className={`relative p-5 rounded-xl transition-all duration-300 group overflow-hidden border flex flex-col ${
                    isActive 
                      ? "bg-white/10 border-white/50 shadow-[0_0_30px_rgba(255,255,255,0.05)] ring-1 ring-white/50 scale-[1.02]" 
                      : "bg-[#09090b] border-white/5 hover:border-white/20 hover:bg-white/5 cursor-pointer"
                  }`}
                  onClick={() => onVoiceSelect(voice.modelName)}
                >
                  {isActive && (
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 blur-2xl rounded-full pointer-events-none" />
                  )}
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className={`px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider ${
                        voice.gender === 'male' ? 'bg-blue-500/10 text-blue-400' : 'bg-purple-500/10 text-purple-400'
                      }`}>
                        {voice.gender}
                      </div>
                    </div>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlayPreview(voice.modelName, voice.preview);
                      }}
                      disabled={isLoading}
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                        isPlaying 
                          ? "bg-amber-500 text-white shadow-[0_0_15px_rgba(245,158,11,0.4)]" 
                          : "bg-white/10 text-white hover:bg-white/20"
                      }`}
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                      ) : isPlaying ? (
                        <Square className="w-4 h-4 fill-current" />
                      ) : (
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      )}
                    </button>
                  </div>
                  
                  <h3 className={`text-base font-semibold ${isActive ? "text-white" : "text-zinc-200"}`}>
                    {voice.modelName.replace('aura-2-', '').replace('-en', '')}
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wider font-medium">
                    {voice.modelName}
                  </p>
                </div>
              );
            })}
          </div>
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
          disabled={!selectedVoice || !selectedLanguage}
          className={`pointer-events-auto h-12 px-8 rounded-xl font-semibold transition-all duration-500 flex items-center gap-2 ${
            selectedVoice && selectedLanguage
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
