export enum DiseaseType {
  DIABETES = 'Diabetes',
  HEART_DISEASE = 'Heart Disease',
  BREAST_CANCER = 'Breast Cancer'
}

export interface FormField {
  id: string;
  label: string;
  type: 'number' | 'select' | 'slider';
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
  options?: string[];
  defaultValue: string | number;
  description?: string;
}

export interface DiseaseConfig {
  type: DiseaseType;
  title: string;
  description: string;
  iconName: string; // Mapping string to Lucide icon
  fields: FormField[];
}

export interface PredictionResult {
  riskScore: number; // 0-100
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Critical';
  analysis: string;
  contributingFactors: string[];
  recommendations: string[];
}

export interface PredictionRequest {
  diseaseType: DiseaseType;
  patientData: Record<string, any>;
}
