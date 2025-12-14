import React from 'react';
import { PredictionResult, DiseaseType } from '../types';
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { AlertTriangle, CheckCircle, Info, RefreshCcw } from 'lucide-react';

interface ResultViewProps {
  result: PredictionResult;
  diseaseType: DiseaseType;
  onReset: () => void;
}

const getRiskColor = (level: string) => {
  switch (level) {
    case 'Low': return '#10b981'; // Green
    case 'Moderate': return '#f59e0b'; // Amber
    case 'High': return '#f97316'; // Orange
    case 'Critical': return '#ef4444'; // Red
    default: return '#3b82f6';
  }
};

export const ResultView: React.FC<ResultViewProps> = ({ result, diseaseType, onReset }) => {
  const riskColor = getRiskColor(result.riskLevel);
  
  const chartData = [
    { name: 'Risk', value: result.riskScore, fill: riskColor }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Header Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          
          {/* Chart Section */}
          <div className="h-48 relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart 
                innerRadius="80%" 
                outerRadius="100%" 
                barSize={10} 
                data={chartData} 
                startAngle={180} 
                endAngle={0}
              >
                <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                <RadialBar
                  label={{ position: 'insideStart', fill: '#fff' }}
                  background
                  dataKey="value"
                  cornerRadius={10}
                />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 text-center">
              <span className="text-4xl font-bold text-slate-800">{result.riskScore}%</span>
              <p className="text-sm text-slate-400 font-medium uppercase tracking-wider">Prob</p>
            </div>
          </div>

          {/* Summary Section */}
          <div className="md:col-span-2 space-y-4">
             <div className="flex items-center space-x-3 mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide text-white" style={{ backgroundColor: riskColor }}>
                  {result.riskLevel} Risk
                </span>
                <h2 className="text-2xl font-bold text-slate-900">{diseaseType} Assessment</h2>
             </div>
             <p className="text-slate-600 leading-relaxed">
               {result.analysis}
             </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contributing Factors */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <AlertTriangle className="text-amber-500" size={20} />
            <h3 className="text-lg font-bold text-slate-800">Key Risk Factors</h3>
          </div>
          <ul className="space-y-3">
            {result.contributingFactors.map((factor, idx) => (
              <li key={idx} className="flex items-start text-slate-600 text-sm">
                <span className="mr-2 mt-1.5 w-1.5 h-1.5 bg-amber-400 rounded-full flex-shrink-0"></span>
                {factor}
              </li>
            ))}
          </ul>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <CheckCircle className="text-green-500" size={20} />
            <h3 className="text-lg font-bold text-slate-800">Recommendations</h3>
          </div>
          <ul className="space-y-3">
            {result.recommendations.map((rec, idx) => (
              <li key={idx} className="flex items-start text-slate-600 text-sm">
                 <span className="mr-2 mt-1.5 w-1.5 h-1.5 bg-green-400 rounded-full flex-shrink-0"></span>
                {rec}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex justify-center pt-6">
        <button 
          onClick={onReset}
          className="flex items-center px-6 py-2.5 bg-white border border-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
        >
          <RefreshCcw size={18} className="mr-2" />
          Start New Assessment
        </button>
      </div>

       <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start space-x-3">
        <Info className="text-blue-500 shrink-0 mt-0.5" size={20} />
        <p className="text-sm text-blue-800">
          <strong>Disclaimer:</strong> This is an AI-powered educational tool utilizing simulated predictive models. Results are for demonstration purposes only and do not constitute a medical diagnosis. Always consult a healthcare professional.
        </p>
      </div>
    </div>
  );
};
