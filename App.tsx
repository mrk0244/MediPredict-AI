import React, { useState } from 'react';
import { DiseaseType, DiseaseConfig, PredictionResult } from './types';
import { DISEASE_CONFIGS } from './constants';
import { DiseaseCard } from './components/DiseaseCard';
import { PredictionForm } from './components/PredictionForm';
import { ResultView } from './components/ResultView';
import { predictDiseaseRisk } from './services/geminiService';
import { Activity } from 'lucide-react';

const App: React.FC = () => {
  const [selectedDisease, setSelectedDisease] = useState<DiseaseConfig | null>(null);
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDiseaseSelect = (config: DiseaseConfig) => {
    setSelectedDisease(config);
    setPredictionResult(null);
    setError(null);
  };

  const handleFormSubmit = async (formData: Record<string, any>) => {
    if (!selectedDisease) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await predictDiseaseRisk({
        diseaseType: selectedDisease.type,
        patientData: formData
      });
      setPredictionResult(result);
    } catch (err) {
      setError("Failed to generate prediction. Please ensure your API key is configured and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedDisease(null);
    setPredictionResult(null);
    setError(null);
  };

  const handleCancelForm = () => {
    setSelectedDisease(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center cursor-pointer" onClick={handleReset}>
              <div className="bg-blue-600 p-2 rounded-lg mr-3">
                 <Activity className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">MediPredict AI</h1>
                <p className="text-xs text-slate-500 font-medium">Disease Prediction System</p>
              </div>
            </div>
            <div className="flex items-center">
              <span className="hidden md:block text-sm text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                Powered by Gemini 2.5 Flash
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Error Banner */}
        {error && (
          <div className="max-w-4xl mx-auto mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center justify-between">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700">&times;</button>
          </div>
        )}

        {/* View Switcher */}
        {!selectedDisease ? (
          // Dashboard View
          <div className="space-y-8 animate-fade-in">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Choose a Diagnostic Module</h2>
              <p className="text-slate-600 text-lg">
                Select a disease category to enter patient clinical data and receive an AI-powered risk assessment.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {DISEASE_CONFIGS.map((config) => (
                <DiseaseCard 
                  key={config.type} 
                  config={config} 
                  onClick={() => handleDiseaseSelect(config)} 
                />
              ))}
            </div>
            
             <div className="mt-16 bg-white rounded-2xl p-8 shadow-sm border border-slate-100 max-w-4xl mx-auto text-center">
               <h3 className="text-lg font-semibold text-slate-800 mb-2">How it works</h3>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
                 <div>
                   <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 font-bold">1</div>
                   <p className="text-sm text-slate-600">Select a specific disease model</p>
                 </div>
                 <div>
                   <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 font-bold">2</div>
                   <p className="text-sm text-slate-600">Input clinical vitals & patient metrics</p>
                 </div>
                 <div>
                   <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 font-bold">3</div>
                   <p className="text-sm text-slate-600">Get AI risk analysis & recommendations</p>
                 </div>
               </div>
             </div>
          </div>

        ) : !predictionResult ? (
          // Form View
          <div className="animate-slide-up">
            <PredictionForm 
              config={selectedDisease} 
              onSubmit={handleFormSubmit}
              onCancel={handleCancelForm}
              isSubmitting={isLoading}
            />
          </div>

        ) : (
          // Result View
          <div className="animate-slide-up">
            <ResultView 
              result={predictionResult} 
              diseaseType={selectedDisease.type}
              onReset={handleReset}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-slate-400">
            © 2024 MediPredict AI. For demonstration purposes only. Not for clinical use.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
