
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';
import { DownloadIcon } from './icons/DownloadIcon';

interface ResultDisplayProps {
  isLoading: boolean;
  generatedImage: string | null;
  error: string | null;
}

const LoadingState: React.FC = () => (
  <div className="flex flex-col items-center justify-center text-center p-4">
    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400 mb-4"></div>
    <p className="text-lg font-semibold text-gray-300">Generating your masterpiece...</p>
    <p className="text-sm text-gray-500 mt-2">The AI is blending pixels and traveling through time. This may take a moment.</p>
  </div>
);

const InitialState: React.FC = () => (
    <div className="flex flex-col items-center justify-center text-center p-4 h-full">
        <SparklesIcon className="w-16 h-16 text-gray-600 mb-4" />
        <h3 className="text-xl font-bold text-gray-400">Your Creation Awaits</h3>
        <p className="text-gray-500 mt-2">Once you've uploaded a photo and chosen your icons, your generated image will appear here.</p>
    </div>
);

const handleDownload = (imageUrl: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    const mimeType = imageUrl.substring(imageUrl.indexOf(':') + 1, imageUrl.indexOf(';'));
    const extension = mimeType.split('/')[1] || 'png';
    link.download = `celebrity-selfie.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};


export const ResultDisplay: React.FC<ResultDisplayProps> = ({ isLoading, generatedImage, error }) => {
  return (
    <div className="w-full mt-6 flex items-center justify-center min-h-[300px] bg-gray-900 rounded-lg">
      {isLoading && <LoadingState />}
      {error && !isLoading && (
        <div className="text-center text-red-400 bg-red-900/20 p-4 rounded-lg">
          <h3 className="font-bold">Generation Failed</h3>
          <p className="text-sm">{error}</p>
        </div>
      )}
      {generatedImage && !isLoading && (
        <div className="text-center">
            <div className="p-2 border border-gray-700 rounded-lg inline-block">
                <img src={generatedImage} alt="Generated celebrity selfie" className="rounded-md max-w-full h-auto" />
            </div>
            <button
                onClick={() => handleDownload(generatedImage)}
                className="mt-4 inline-flex items-center gap-2 font-semibold py-2 px-6 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-cyan-300"
            >
                <DownloadIcon className="w-5 h-5" />
                Download
            </button>
        </div>
      )}
      {!isLoading && !generatedImage && !error && <InitialState />}
    </div>
  );
};
