import React from 'react';
import { DiseaseConfig } from '../types';
import { Activity, Heart, Stethoscope, ArrowRight } from 'lucide-react';

interface DiseaseCardProps {
  config: DiseaseConfig;
  onClick: () => void;
}

const IconMap: Record<string, React.ElementType> = {
  Activity,
  Heart,
  Stethoscope
};

export const DiseaseCard: React.FC<DiseaseCardProps> = ({ config, onClick }) => {
  const Icon = IconMap[config.iconName] || Activity;

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm hover:shadow-md border border-slate-100 p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 group"
    >
      <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">{config.title}</h3>
      <p className="text-slate-500 text-sm mb-4 line-clamp-2">{config.description}</p>
      <div className="flex items-center text-blue-600 font-medium text-sm group-hover:translate-x-1 transition-transform">
        Start Assessment <ArrowRight size={16} className="ml-1" />
      </div>
    </div>
  );
};
