
export type Language = 'ar' | 'en';
export type Theme = 'light' | 'dark';

export interface Settings {
  language: Language;
  theme: Theme;
}

export interface Service {
  id: string;
  titleAr: string;
  titleEn: string;
  icon: string;
  descriptionAr: string;
  descriptionEn: string;
}

export interface PricingPlan {
  nameAr: string;
  nameEn: string;
  priceAr: string;
  priceEn: string;
  featuresAr: string[];
  featuresEn: string[];
  isPopular?: boolean;
}

export interface FAQItem {
  questionAr: string;
  questionEn: string;
  answerAr: string;
  answerEn: string;
}
