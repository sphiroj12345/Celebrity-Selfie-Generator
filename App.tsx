
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { PersonalitySelector } from './components/PersonalitySelector';
import { ResultDisplay } from './components/ResultDisplay';
import { GenerateButton } from './components/GenerateButton';
import { SelectedPersonalities } from './components/SelectedPersonalities';
import type { Personality } from './types';
import { generateSelfieWithCelebrities } from './services/geminiService';

const App: React.FC = () => {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [selectedPersonalities, setSelectedPersonalities] = useState<Personality[]>([]);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (imageBase64: string) => {
    setUserImage(imageBase64);
    setGeneratedImage(null);
    setError(null);
  };

  const handleSelectPersonality = (personality: Personality) => {
    setSelectedPersonalities(prev => {
      if (prev.find(p => p.id === personality.id)) {
        return prev.filter(p => p.id !== personality.id);
      }
      if (prev.length < 2) {
        return [...prev, personality];
      }
      return prev;
    });
  };

  const handleDeselectPersonality = (personalityId: number) => {
    setSelectedPersonalities(prev => prev.filter(p => p.id !== personalityId));
  };
  
  const handleGenerate = useCallback(async () => {
    if (!userImage || selectedPersonalities.length === 0) {
      setError("Please upload an image and select at least one personality.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const result = await generateSelfieWithCelebrities(userImage, selectedPersonalities);
      setGeneratedImage(result);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "An unknown error occurred during image generation.");
    } finally {
      setIsLoading(false);
    }
  }, [userImage, selectedPersonalities]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-7xl mx-auto">
        <Header />
        <main className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col space-y-8">
            <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
              <h2 className="text-xl font-bold text-cyan-400 mb-4">Step 1: Upload Your Photo</h2>
              <ImageUploader onImageUpload={handleImageUpload} />
            </div>
            
            <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
              <h2 className="text-xl font-bold text-cyan-400 mb-4">Step 2: Choose Personalities (Max 2)</h2>
              {selectedPersonalities.length > 0 && (
                <SelectedPersonalities 
                  personalities={selectedPersonalities} 
                  onDeselect={handleDeselectPersonality} 
                />
              )}
              <PersonalitySelector 
                selectedIds={selectedPersonalities.map(p => p.id)} 
                onSelect={handleSelectPersonality} 
              />
            </div>
          </div>
          
          <div className="flex flex-col space-y-8">
            <div className="bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center h-full">
              <h2 className="text-xl font-bold text-cyan-400 mb-4">Step 3: Generate Your Masterpiece</h2>
              <GenerateButton 
                onClick={handleGenerate} 
                isLoading={isLoading}
                isDisabled={!userImage || selectedPersonalities.length === 0}
              />
              <ResultDisplay 
                isLoading={isLoading} 
                generatedImage={generatedImage} 
                error={error} 
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
