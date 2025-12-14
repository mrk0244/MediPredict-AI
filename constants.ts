import { DiseaseConfig, DiseaseType } from "./types";

export const DISEASE_CONFIGS: DiseaseConfig[] = [
  {
    type: DiseaseType.DIABETES,
    title: "Diabetes Prediction",
    description: "Assess the risk of Type 2 Diabetes based on glucose, BMI, and insulin levels.",
    iconName: "Activity",
    fields: [
      { id: "pregnancies", label: "Pregnancies", type: "number", min: 0, max: 20, defaultValue: 0 },
      { id: "glucose", label: "Glucose Level", type: "number", unit: "mg/dL", min: 0, max: 300, defaultValue: 120, description: "Plasma glucose concentration a 2 hours in an oral glucose tolerance test" },
      { id: "bp", label: "Blood Pressure", type: "number", unit: "mm Hg", min: 0, max: 200, defaultValue: 70, description: "Diastolic blood pressure" },
      { id: "skinThickness", label: "Skin Thickness", type: "number", unit: "mm", min: 0, max: 100, defaultValue: 20 },
      { id: "insulin", label: "Insulin Level", type: "number", unit: "mu U/ml", min: 0, max: 900, defaultValue: 79 },
      { id: "bmi", label: "BMI", type: "number", min: 10, max: 60, step: 0.1, defaultValue: 25.0 },
      { id: "pedigree", label: "Diabetes Pedigree Function", type: "number", min: 0, max: 3, step: 0.001, defaultValue: 0.5 },
      { id: "age", label: "Age", type: "number", min: 1, max: 120, defaultValue: 30 },
    ]
  },
  {
    type: DiseaseType.HEART_DISEASE,
    title: "Heart Disease Prediction",
    description: "Evaluate cardiovascular health using metrics like chest pain type, cholesterol, and max heart rate.",
    iconName: "Heart",
    fields: [
      { id: "age", label: "Age", type: "number", min: 1, max: 120, defaultValue: 45 },
      { id: "sex", label: "Sex", type: "select", options: ["Male", "Female"], defaultValue: "Male" },
      { id: "cp", label: "Chest Pain Type", type: "select", options: ["Typical Angina", "Atypical Angina", "Non-anginal Pain", "Asymptomatic"], defaultValue: "Typical Angina" },
      { id: "trestbps", label: "Resting Blood Pressure", unit: "mm Hg", type: "number", min: 50, max: 250, defaultValue: 120 },
      { id: "chol", label: "Serum Cholesterol", unit: "mg/dl", type: "number", min: 100, max: 600, defaultValue: 200 },
      { id: "fbs", label: "Fasting Blood Sugar > 120 mg/dl", type: "select", options: ["True", "False"], defaultValue: "False" },
      { id: "thalach", label: "Max Heart Rate", type: "number", min: 50, max: 250, defaultValue: 150 },
      { id: "exang", label: "Exercise Induced Angina", type: "select", options: ["Yes", "No"], defaultValue: "No" },
    ]
  },
  {
    type: DiseaseType.BREAST_CANCER,
    title: "Breast Cancer Risk",
    description: "Analyze tumor features like radius, texture, and smoothness to predict malignancy.",
    iconName: "Stethoscope",
    fields: [
      { id: "radius_mean", label: "Radius Mean", type: "number", step: 0.01, defaultValue: 14.00, description: "Mean of distances from center to points on the perimeter" },
      { id: "texture_mean", label: "Texture Mean", type: "number", step: 0.01, defaultValue: 19.00, description: "Standard deviation of gray-scale values" },
      { id: "perimeter_mean", label: "Perimeter Mean", type: "number", step: 0.1, defaultValue: 90.00 },
      { id: "area_mean", label: "Area Mean", type: "number", step: 0.1, defaultValue: 600.0 },
      { id: "smoothness_mean", label: "Smoothness Mean", type: "number", step: 0.0001, defaultValue: 0.09, description: "Local variation in radius lengths" },
      { id: "concavity_mean", label: "Concavity Mean", type: "number", step: 0.0001, defaultValue: 0.08, description: "Severity of concave portions of the contour" },
    ]
  }
];
