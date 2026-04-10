import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function test() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "teste",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            test: { type: Type.OBJECT }
          }
        }
      }
    });
    console.log("Text generation successful:", response.text);
  } catch (e: any) {
    console.error("Text generation failed:", e.message);
  }
}

test();
