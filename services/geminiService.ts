
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { PEDIATRIC_EXPERT_SYSTEM_INSTRUCTION, CHAT_MODEL_NAME, IMAGE_MODEL_NAME, IMAGE_GENERATION_PROMPT_PREFIX } from '../constants';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set. Please ensure it is configured.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

let chat: Chat | null = null;

function getChatInstance(): Chat {
    if (!chat) {
        chat = ai.chats.create({
            model: CHAT_MODEL_NAME,
            config: {
                systemInstruction: PEDIATRIC_EXPERT_SYSTEM_INSTRUCTION,
            },
        });
    }
    return chat;
}

export const generateChatResponse = async (message: string): Promise<string> => {
    try {
        const chatInstance = getChatInstance();
        const response: GenerateContentResponse = await chatInstance.sendMessage({ message });
        return response.text;
    } catch (error) {
        console.error("Error generating chat response:", error);
        return "Lo siento, ha ocurrido un error al procesar tu solicitud. Por favor, inténtalo de nuevo.";
    }
};

export const generateMedicalImage = async (prompt: string): Promise<string> => {
    try {
        const fullPrompt = `${IMAGE_GENERATION_PROMPT_PREFIX}${prompt}`;
        const response = await ai.models.generateImages({
            model: IMAGE_MODEL_NAME,
            prompt: fullPrompt,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/jpeg',
                aspectRatio: '1:1',
            },
        });

        if (response.generatedImages && response.generatedImages.length > 0) {
            return response.generatedImages[0].image.imageBytes;
        } else {
            throw new Error("No image was generated.");
        }

    } catch (error) {
        console.error("Error generating image:", error);
        throw new Error("No se pudo generar la ilustración. Por favor, revisa tu descripción e inténtalo de nuevo.");
    }
};
