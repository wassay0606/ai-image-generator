
// A part for a multimodal request to the Gemini API.
export interface GenerativePart {
    inlineData: {
        data: string;
        mimeType: string;
    };
}

// Converts a File object to a GoogleGenerativeAI.Part object.
export const fileToGenerativePart = async (file: File): Promise<GenerativePart> => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
        if (typeof reader.result === 'string') {
            // The result includes the Base64 prefix "data:image/jpeg;base64,", which we need to remove.
            resolve(reader.result.split(',')[1]);
        } else {
            // Handle ArrayBuffer case if needed, though for images it's usually a data URL.
            resolve('');
        }
    };
    reader.readAsDataURL(file);
  });

  const base64EncodedData = await base64EncodedDataPromise;

  return {
    inlineData: {
      data: base64EncodedData,
      mimeType: file.type,
    },
  };
};
