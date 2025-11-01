import { GoogleGenAI, Modality, FinishReason } from '@google/genai';
import type { Handler } from '@netlify/functions';

// A part for a multimodal request to the Gemini API.
interface GenerativePart {
    inlineData: {
        data: string;
        mimeType: string;
    };
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { API_KEY } = process.env;
  if (!API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'API key is not configured.' }),
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const imagePart: GenerativePart = body.imagePart;
    const prompt: string = body.prompt;

    if (!imagePart || !prompt) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing image or prompt in the request body.' }),
      };
    }

    const ai = new GoogleGenAI({ apiKey: API_KEY });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          imagePart,
          { text: prompt },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });
    
    const candidate = response.candidates?.[0];

    if (candidate && candidate.finishReason === FinishReason.OK && candidate.content.parts) {
      for (const part of candidate.content.parts) {
        if (part.inlineData) {
          const base64Image = part.inlineData.data;
          const mimeType = part.inlineData.mimeType;
          const imageUrl = `data:${mimeType};base64,${base64Image}`;
          return {
            statusCode: 200,
            body: JSON.stringify({ imageUrl }),
          };
        }
      }
    }
    
    // If we get here, no image was generated.
    const refusalReason = candidate?.finishReason ?? 'UNKNOWN';
    const reasonText = `The model refused the request. Reason: ${refusalReason}.`;
    console.error('Image generation failed.', { refusalReason, safetyRatings: candidate?.safetyRatings });
    
    return {
      statusCode: 500,
      body: JSON.stringify({ error: reasonText }),
    };

  } catch (e) {
    const error = e as Error;
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `An error occurred: ${error.message}` }),
    };
  }
};