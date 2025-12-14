import React, { useState } from 'react';
import { DiseaseConfig, FormField } from '../types';
import { Info, ArrowRight, Loader2 } from 'lucide-react';

interface PredictionFormProps {
  config: DiseaseConfig;
  onSubmit: (data: Record<string, any>) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export const PredictionForm: React.FC<PredictionFormProps> = ({ config, onSubmit, onCancel, isSubmitting }) => {
  const [formData, setFormData] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    config.fields.forEach(field => {
      initial[field.id] = field.defaultValue;
    });
    return initial;
  });

  const handleChange = (id: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden max-w-4xl mx-auto">
      <div className="bg-slate-50 px-8 py-6 border-b border-slate-100 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">{config.title}</h2>
          <p className="text-slate-500 text-sm mt-1">Enter patient clinical metrics for analysis</p>
        </div>
        <button onClick={onCancel} className="text-slate-400 hover:text-slate-600 text-sm font-medium">
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {config.fields.map((field) => (
            <div key={field.id} className="space-y-2">
              <label htmlFor={field.id} className="block text-sm font-semibold text-slate-700 flex items-center">
                {field.label}
                {field.description && (
                  <div className="group relative ml-2 cursor-help">
                    <Info size={14} className="text-slate-400" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-slate-800 text-white text-xs p-2 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10">
                      {field.description}
                    </div>
                  </div>
                )}
              </label>
              
              {field.type === 'select' ? (
                <div className="relative">
                  <select
                    id={field.id}
                    value={formData[field.id]}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none"
                  >
                    {field.options?.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              ) : (
                <div className="relative">
                   <input
                    type="number"
                    id={field.id}
                    min={field.min}
                    max={field.max}
                    step={field.step}
                    value={formData[field.id]}
                    onChange={(e) => handleChange(field.id, parseFloat(e.target.value))}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                  {field.unit && (
                    <span className="absolute right-3 top-2 text-sm text-slate-400 font-medium">
                      {field.unit}
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`
              flex items-center px-8 py-3 rounded-lg font-semibold text-white transition-all
              ${isSubmitting ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-blue-500/30'}
            `}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin mr-2" size={20} />
                Processing...
              </>
            ) : (
              <>
                Run Prediction Model
                <ArrowRight className="ml-2" size={20} />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
