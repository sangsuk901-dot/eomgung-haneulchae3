
import { GoogleGenAI, Type } from "@google/genai";
import { WorkflowPlan } from '../types';

// Initialize the Google GenAI SDK.
// The API key is obtained from process.env.API_KEY as per the requirement.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates an AI-optimized business workflow plan using Gemini.
 * Uses 'gemini-3-pro-preview' for complex reasoning and structured JSON output.
 */
export const generateWorkflow = async (prompt: string): Promise<WorkflowPlan> => {
  // Call generateContent with the appropriate model and configuration for JSON output.
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Design a professional business workflow automation based on this request: ${prompt}. 
    Ensure the output is a single, valid JSON object that follows the specified schema.`,
    config: {
      systemInstruction: "You are a world-class AI Architect specialized in business process automation. Create clear, logical, and high-impact workflows.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING, description: "A unique identifier for the workflow" },
          name: { type: Type.STRING, description: "A professional name for the automation" },
          industry: { type: Type.STRING, description: "The target industry" },
          benefit: { type: Type.STRING, description: "The primary efficiency gain" },
          steps: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                type: { type: Type.STRING, enum: ['trigger', 'condition', 'action'] }
              },
              required: ['id', 'title', 'description', 'type']
            }
          }
        },
        required: ['id', 'name', 'industry', 'benefit', 'steps']
      }
    }
  });

  // Extract the generated text from the response object.
  // Using .text property directly as per the current SDK guidelines.
  const text = response.text;
  if (!text) {
    throw new Error('AI failed to generate a response.');
  }

  try {
    return JSON.parse(text);
  } catch (error) {
    console.error('Failed to parse AI response:', text);
    throw new Error('The AI generated an invalid data structure. Please try again.');
  }
};
