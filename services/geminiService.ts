
import { GoogleGenAI, Type } from "@google/genai";

// Standardized transformation service using Gemini 3 Flash
export const transformRequirementToStory = async (legacyRequirement: string) => {
  // Use the API key directly from process.env.API_KEY and initialize a new instance for the request
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Transform this legacy insurance requirement into a structured Agile User Story with Acceptance Criteria. 
    Legacy Requirement: "${legacyRequirement}"`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          asA: { type: Type.STRING, description: "The persona/user role" },
          iWant: { type: Type.STRING, description: "The action or feature" },
          soThat: { type: Type.STRING, description: "The business value" },
          acceptanceCriteria: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "List of testable criteria"
          }
        },
        required: ["asA", "iWant", "soThat", "acceptanceCriteria"]
      }
    }
  });

  // Extract text using the .text property
  return JSON.parse(response.text.trim());
};
