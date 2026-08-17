export const Config = {
  API_URL: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8000',
  APP_NAME: 'OptiCrop',
  TAGLINE: 'Smarter Farming. Better Decisions.',
} as const;
