
import { GoogleGenAI, GenerateContentResponse, GroundingChunk } from "@google/genai";
import type { FileObject, UserProfile, AiResponse } from '../types';

if (!process.env.API_KEY) {
    console.warn("API_KEY environment variable not set. Using a placeholder. The app may not function correctly.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "YOUR_API_KEY_HERE" });

const MODEL_NAME = 'gemini-2.5-flash';

interface RAGPayload {
    prompt: string;
    files: FileObject[];
    userProfile: UserProfile;
    useWebSearch: boolean;
}

function fileToPart(file: FileObject) {
    if (file.type.startsWith('image/')) {
        return {
            inlineData: {
                mimeType: file.type,
                data: file.content,
            },
        };
    }
    return null;
}

export const generateContentWithRAG = async ({ prompt, files, userProfile, useWebSearch }: RAGPayload): Promise<AiResponse> => {
    try {
        let fullPrompt = "";

        // Use only supported files that are not images for text context
        const textFiles = files.filter(f => f.isSupported && !f.type.startsWith('image/'));
        if (textFiles.length > 0) {
            const fileContext = textFiles.map(f => `--- File: ${f.name} ---\n${f.content}`).join('\n\n');
            fullPrompt += `CONTEXT FROM UPLOADED FILES:\n${fileContext}\n\n--- END OF FILE CONTEXT ---\n\n`;
        }

        fullPrompt += `USER'S QUESTION: ${prompt}`;

        const imageFiles = files.filter(f => f.isSupported && f.type.startsWith('image/'));
        const imageParts = imageFiles.map(fileToPart).filter(p => p !== null);

        const systemInstruction = `You are StudyMate Pro AI, an expert educator and learning assistant. Your user is at the "${userProfile.level}" level, studying "${userProfile.subject}".
        - Adapt your language, complexity, and examples to be perfectly suited for this educational level.
        - Be encouraging, clear, and supportive.
        - If file context is provided, prioritize it in your answer.
        - If web search is enabled and the question requires current information, use it.
        - ALWAYS provide comprehensive, accurate, and helpful answers.`;

        const contents = imageParts.length > 0 
            ? { parts: [...imageParts, { text: fullPrompt }] }
            : fullPrompt;

        const response: GenerateContentResponse = await ai.models.generateContent({
            model: MODEL_NAME,
            contents,
            config: {
                systemInstruction,
                ...(useWebSearch && { tools: [{ googleSearch: {} }] }),
            },
        });

        const text = response.text;
        const groundingMetadata = response.candidates?.[0]?.groundingMetadata;

        let sources: { uri: string; title: string }[] = [];
        if (groundingMetadata?.groundingChunks) {
            sources = (groundingMetadata.groundingChunks as GroundingChunk[])
                .filter(chunk => chunk.web)
                .map(chunk => ({
                    uri: chunk.web!.uri,
                    title: chunk.web!.title || 'Untitled Source',
                }));
        }

        return { text, sources };

    } catch (error) {
        console.error("Gemini API call failed:", error);
        throw new Error("Failed to generate content from Gemini API.");
    }
};