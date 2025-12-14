import { GoogleGenAI, Type, Schema } from "@google/genai";
import { PredictionRequest, PredictionResult } from "../types";

const parseJSON = (text: string) => {
  try {
    // Remove markdown code blocks if present
    const cleanText = text.replace(/```json\n|\n```/g, "").trim();
    return JSON.parse(cleanText);
  } catch (e) {
    console.error("Failed to parse JSON response:", e);
    throw new Error("Invalid response format from AI model");
  }
};

export const predictDiseaseRisk = async (request: PredictionRequest): Promise<PredictionResult> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing");
  }

  const ai = new GoogleGenAI({ apiKey });

  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
      riskScore: { type: Type.NUMBER, description: "A probability score from 0 to 100 indicating risk level." },
      riskLevel: { type: Type.STRING, enum: ["Low", "Moderate", "High", "Critical"] },
      analysis: { type: Type.STRING, description: "A comprehensive medical analysis of the provided data points." },
      contributingFactors: { 
        type: Type.ARRAY, 
        items: { type: Type.STRING },
        description: "List of specific metrics that contributed most to the risk score."
      },
      recommendations: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "Actionable medical or lifestyle recommendations."
      }
    },
    required: ["riskScore", "riskLevel", "analysis", "contributingFactors", "recommendations"]
  };

  const prompt = `
    Act as an advanced medical diagnostic system (simulating Random Forest/XGBoost logic).
    
    Task: Analyze the following patient data for risk of **${request.diseaseType}**.
    
    Patient Data:
    ${JSON.stringify(request.patientData, null, 2)}
    
    Instructions:
    1. Analyze the vital signs and metrics based on standard medical datasets (e.g., Pima Indians Diabetes, Cleveland Heart Disease, Wisconsin Breast Cancer).
    2. Estimate a risk probability (0-100%).
    3. Provide a clinical explanation.
    4. Be realistic but cautious. 
    
    IMPORTANT: This is for a simulation/educational tool.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.2, // Low temperature for more consistent/analytic results
      }
    });

    if (!response.text) {
      throw new Error("No response from AI");
    }

    return parseJSON(response.text);
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
