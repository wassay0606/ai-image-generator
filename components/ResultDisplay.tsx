import React from 'react';
import Spinner from './Spinner.tsx';
import { DownloadIcon } from './icons.tsx';

interface ResultDisplayProps {
  originalImage: string | null;
  generatedImage: string | null;
  isLoading: boolean;
}

const ImageCard: React.FC<{ title: string; imageUrl: string | null; isLoading?: boolean; isGenerated?: boolean }> = ({ title, imageUrl, isLoading = false, isGenerated = false }) => {
  return (
    <div className="flex flex-col items-center w-full">
      <h3 className="text-lg font-semibold text-gray-300 mb-3">{title}</h3>
      <div className="relative w-full aspect-square bg-gray-900 rounded-xl overflow-hidden border border-gray-700 shadow-md">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Spinner />
          </div>
        ) : imageUrl ? (
          <>
            <img src={imageUrl} alt={title} className="w-full h-full object-contain" />
            {isGenerated && (
               <a
                href={imageUrl}
                download="generated-image.png"
                className="absolute bottom-4 right-4 bg-indigo-600 text-white p-3 rounded-full hover:bg-indigo-700 transition-transform duration-200 transform hover:scale-110 shadow-lg"
                aria-label="Download generated image"
              >
                <DownloadIcon className="w-5 h-5" />
              </a>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            {isGenerated ? "Your generated image will appear here" : "Original image"}
          </div>
        )}
      </div>
    </div>
  );
};


const ResultDisplay: React.FC<ResultDisplayProps> = ({ originalImage, generatedImage, isLoading }) => {
  return (
    <div className="bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-700">
      <h2 className="text-xl font-semibold mb-4 text-center text-indigo-400">3. Result</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <ImageCard title="Original" imageUrl={originalImage} />
        <ImageCard title="Generated" imageUrl={generatedImage} isLoading={isLoading} isGenerated={!isLoading && !!generatedImage} />
      </div>
    </div>
  );
};

export default ResultDisplay;
