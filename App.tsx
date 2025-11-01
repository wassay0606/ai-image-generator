import React, { useState, useCallback } from 'react';
import Header from './components/Header.tsx';
import ImageUploader from './components/ImageUploader.tsx';
import ResultDisplay from './components/ResultDisplay.tsx';
import Spinner from './components/Spinner.tsx';
import { WandIcon } from './components/icons.tsx';
import { fileToGenerativePart } from './utils/fileUtils.ts';

const App: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    setImageFile(file);
    setOriginalImageUrl(URL.createObjectURL(file));
    setGeneratedImageUrl(null);
    setError(null);
  };

  const handleImageClear = () => {
    setImageFile(null);
    setOriginalImageUrl(null);
    setGeneratedImageUrl(null);
    setError(null);
    // Revoke the object URL to free up memory
    if (originalImageUrl) {
      URL.revokeObjectURL(originalImageUrl);
    }
  };

  const handleGenerateClick = useCallback(async () => {
    if (!imageFile || !prompt) {
      setError('Please upload an image and provide a prompt.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImageUrl(null);

    try {
      const imagePart = await fileToGenerativePart(imageFile);

      const response = await fetch('/.netlify/functions/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imagePart,
          prompt,
        }),
      });
      
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || `Request failed with status ${response.status}`);
      }
      
      if (result.imageUrl) {
        setGeneratedImageUrl(result.imageUrl);
      } else {
        throw new Error(result.error || 'No image URL was returned from the server.');
      }
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      console.error(e);
      setError(`Generation failed: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, [imageFile, prompt]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="w-full max-w-4xl">
        <Header />
        <main className="mt-8 space-y-8">
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-indigo-400">1. Upload your Image</h2>
            <ImageUploader onImageUpload={handleImageUpload} onImageClear={handleImageClear} />
          </div>

          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-indigo-400">2. Describe the Transformation</h2>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., 'Turn this into a watercolor painting', 'Add a futuristic city in the background', 'Make it look like a cartoon'"
              className="w-full h-24 p-4 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 resize-none"
              aria-label="Transformation prompt"
            />
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleGenerateClick}
              disabled={!imageFile || !prompt || isLoading}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 text-white font-bold text-lg rounded-full hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg disabled:shadow-none"
            >
              {isLoading ? (
                <>
                  <Spinner />
                  Generating...
                </>
              ) : (
                <>
                  <WandIcon />
                  Generate Image
                </>
              )}
            </button>
          </div>

          {error && (
            <div role="alert" className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg text-center">
              {error}
            </div>
          )}

          <ResultDisplay
            originalImage={originalImageUrl}
            generatedImage={generatedImageUrl}
            isLoading={isLoading}
          />
        </main>
      </div>
    </div>
  );
};

export default App;