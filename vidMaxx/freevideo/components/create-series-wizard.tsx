"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Step1Niche } from "./create-steps/step-1-niche";
import { Step2Voice, LANGUAGES } from "./create-steps/step-2-voice";
import { Step3Music } from "./create-steps/step-3-music";
import { Step4Style } from "./create-steps/step-4-style";
import { Step5Caption } from "./create-steps/step-5-caption";
import { Step6Details } from "./create-steps/step-6-details";
import { Check } from "lucide-react";

const steps = [
  "Niche",
  "Language & Voice",
  "Script",
  "Visuals",
  "Music",
  "Finalize"
];

export function CreateSeriesWizard() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    niche: "",
    language: LANGUAGES[0].modelLangCode,
    voice: "",
    music: "",
    style: "",
    caption: "",
    seriesName: "",
    duration: "",
    platform: "",
    publishTime: "",
  });

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  
  const handleSchedule = () => {
    // We will implement the actual API saving logic later
    console.log("Scheduling Series with data:", formData);
    alert("Series Scheduled Successfully! (API integration pending)");
  };

  const handleBack = () => {
    if (currentStep === 1) {
      router.push("/dashboard");
    } else {
      setCurrentStep((prev) => Math.max(prev - 1, 1));
    }
  };

  return (
    <div className="flex flex-col h-full space-y-12">
      {/* Stepper Header */}
      <div className="w-full bg-[#111] border border-white/10 rounded-2xl p-8 shadow-2xl">
        <div className="flex items-center justify-between relative px-4">
          <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-[2px] bg-white/10 z-0" />
          <div 
            className="absolute left-4 top-1/2 -translate-y-1/2 h-[2px] bg-white transition-all duration-700 ease-out z-0"
            style={{ width: `calc(${((currentStep - 1) / (steps.length - 1)) * 100}% - 2rem)` }}
          />
          
          {steps.map((step, index) => {
            const stepNum = index + 1;
            const isActive = currentStep === stepNum;
            const isCompleted = currentStep > stepNum;
            
            return (
              <div key={step} className="relative z-10 flex flex-col items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500 ${
                  isActive ? "bg-white text-black ring-[6px] ring-white/10 scale-110" : 
                  isCompleted ? "bg-zinc-800 text-white" : "bg-[#09090b] border-2 border-white/20 text-zinc-500"
                }`}>
                  {isCompleted ? <Check className="w-5 h-5" /> : stepNum}
                </div>
                <span className={`text-[11px] uppercase tracking-wider font-bold absolute -bottom-8 whitespace-nowrap transition-colors duration-300 ${
                  isActive ? "text-white" : isCompleted ? "text-zinc-500" : "text-zinc-700"
                }`}>
                  {step}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <div className="flex-1 w-full pb-10">
        {currentStep === 1 && (
          <Step1Niche 
            selectedNiche={formData.niche} 
            onSelect={(niche) => setFormData({ ...formData, niche })} 
            onContinue={nextStep}
            onBack={handleBack}
          />
        )}
        
        {currentStep === 2 && (
          <Step2Voice 
            selectedLanguage={formData.language} 
            selectedVoice={formData.voice}
            onLanguageSelect={(lang) => setFormData({ ...formData, language: lang })}
            onVoiceSelect={(voice) => setFormData({ ...formData, voice })}
            onContinue={nextStep}
            onBack={handleBack}
          />
        )}

        {currentStep === 3 && (
          <Step3Music 
            selectedMusic={formData.music}
            onSelect={(music) => setFormData({ ...formData, music })}
            onContinue={nextStep}
            onBack={handleBack}
          />
        )}

        {currentStep === 4 && (
          <Step4Style 
            selectedStyle={formData.style}
            onSelect={(style) => setFormData({ ...formData, style: style })}
            onContinue={nextStep}
            onBack={handleBack}
          />
        )}

        {currentStep === 5 && (
          <Step5Caption 
            selectedCaption={formData.caption}
            onSelect={(caption) => setFormData({ ...formData, caption: caption })}
            onContinue={nextStep}
            onBack={handleBack}
          />
        )}
        {currentStep === 6 && (
          <Step6Details 
            seriesName={formData.seriesName}
            duration={formData.duration}
            platform={formData.platform}
            publishTime={formData.publishTime}
            onUpdate={(field, value) => setFormData({ ...formData, [field]: value })}
            onSubmit={handleSchedule}
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  );
}
