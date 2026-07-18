"use server";

export async function getVoicePreviewDataUri(text: string, tl: string) {
  try {
    const url = `https://translate.googleapis.com/translate_tts?client=gtx&ie=UTF-8&tl=${tl}&q=${encodeURIComponent(text)}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error("Failed to fetch from Google TTS");
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString("base64");
    
    return `data:audio/mpeg;base64,${base64}`;
  } catch (error) {
    console.error("TTS Server Action Error:", error);
    return null;
  }
}
