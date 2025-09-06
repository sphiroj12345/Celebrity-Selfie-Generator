
import { GoogleGenAI, Modality } from "@google/genai";
import type { Personality } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const urlToBase64 = async (url: string): Promise<{ mimeType: string; data: string }> => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const blob = await response.blob();
        const reader = new FileReader();
        return new Promise((resolve, reject) => {
            reader.onloadend = () => {
                const base64data = reader.result as string;
                resolve({
                    mimeType: blob.type,
                    data: base64data.split(',')[1]
                });
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    } catch (error) {
        console.error(`Failed to fetch and convert image from ${url}:`, error);
        throw new Error(`Could not load image for processing. Please try again.`);
    }
};

const generatePrompt = (personalities: Personality[]): string => {
    const names = personalities.map(p => p.name).join(' and ');
    const eras = personalities.map(p => `the ${p.era}`).join(', ');

    let prompt = `Take the user's photo and realistically blend it with the photos of ${names}.
    Create a new, single image that looks like a plausible selfie or photo taken together.
    Pay close attention to lighting, shadows, and color grading to ensure all individuals appear to be in the same environment.
    The final image must be photorealistic and seamlessly integrated.`;
    
    if (personalities.length > 0) {
        prompt += ` Since the personalities are from ${eras}, apply a subtle vintage photographic style appropriate to that time period. For example, if from the 1940s, use a black and white or slightly sepia tone with film grain. If from the 1500s, render it in a painted style. The style should be consistent across the entire image.`;
    }

    return prompt;
};


export const generateSelfieWithCelebrities = async (userImageBase64: string, personalities: Personality[]): Promise<string> => {
    const model = 'gemini-2.5-flash-image-preview';

    const userImageMimeType = userImageBase64.substring(userImageBase64.indexOf(":") + 1, userImageBase64.indexOf(";"));
    const userImageData = userImageBase64.split(',')[1];
    
    const personalityImageParts = await Promise.all(
        personalities.map(async p => {
            const { mimeType, data } = await urlToBase64(p.imageUrl);
            return { inlineData: { mimeType, data } };
        })
    );

    const parts = [
        { inlineData: { mimeType: userImageMimeType, data: userImageData } },
        ...personalityImageParts,
        { text: generatePrompt(personalities) },
    ];
    
    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: { parts: parts },
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        });
        
        const imagePart = response.candidates?.[0]?.content?.parts?.find(part => part.inlineData);

        if (imagePart && imagePart.inlineData) {
            const base64ImageBytes = imagePart.inlineData.data;
            const mimeType = imagePart.inlineData.mimeType;
            return `data:${mimeType};base64,${base64ImageBytes}`;
        } else {
            const textPart = response.candidates?.[0]?.content?.parts?.find(part => part.text);
            throw new Error(textPart?.text || "The model did not return an image. It might have refused the request.");
        }
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to generate image. The AI model might be unavailable or the request was blocked.");
    }
};
