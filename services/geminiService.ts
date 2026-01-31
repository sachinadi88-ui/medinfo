
import { GoogleGenAI, Type } from "@google/genai";
import { MedicineInfo } from "../types.ts";

const SYSTEM_INSTRUCTION = `
You are a medical information assistant. 
Your goal is to explain medicines clearly using simple, educational, and neutral language.
Strict Constraints:
- Do NOT give dosage instructions.
- Do NOT give medical advice.
- Do NOT state the medicine is safe or unsafe.
- Maintain a neutral, educational tone.
- Always include a short disclaimer at the end stating users should consult a doctor.
`;

export const fetchMedicineDetails = async (medicineName: string): Promise<MedicineInfo> => {
  // Always initialize GoogleGenAI with the API key from process.env
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Explain the medicine "${medicineName}" clearly.`,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          medicineName: { type: Type.STRING, description: "Official name of the medicine" },
          composition: { type: Type.STRING, description: "Active ingredients and components" },
          uses: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "List of common uses for this medicine"
          },
          sideEffects: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "Commonly reported side effects"
          },
          warnings: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "Important safety precautions and warnings"
          },
          otherDetails: { type: Type.STRING, description: "Additional neutral educational details" }
        },
        required: ["medicineName", "composition", "uses", "sideEffects", "warnings", "otherDetails"]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("No response received from the assistant.");
  
  try {
    return JSON.parse(text) as MedicineInfo;
  } catch (e) {
    console.error("JSON Parsing Error:", e);
    throw new Error("Failed to format medicine information correctly.");
  }
};
