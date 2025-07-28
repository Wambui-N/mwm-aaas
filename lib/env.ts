// Environment variable validation and access
// This ensures type safety and proper error handling for environment variables

interface EnvVars {
  NEXT_PUBLIC_CONTENTFUL_SPACE_ID?: string;
  NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN?: string;
  NEXT_PUBLIC_CALCOM_API_KEY?: string;
  NEXT_PUBLIC_GOOGLE_ANALYTICS_ID?: string;
  NODE_ENV: 'development' | 'production' | 'test';
}

// Client-side environment variables (prefixed with NEXT_PUBLIC_)
export const clientEnv = {
  contentfulSpaceId: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  contentfulAccessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  calcomApiKey: process.env.NEXT_PUBLIC_CALCOM_API_KEY,
  googleAnalyticsId: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
  nodeEnv: process.env.NODE_ENV as EnvVars['NODE_ENV'],
} as const;

// Server-side environment variables (can access all env vars)
export const serverEnv = {
  ...clientEnv,
} as const;

// Validation function
export function validateEnv(isServer = false) {
  const env = isServer ? serverEnv : clientEnv;
  const missing: string[] = [];

  // Check required client-side variables
  if (!env.contentfulSpaceId) missing.push('NEXT_PUBLIC_CONTENTFUL_SPACE_ID');
  if (!env.contentfulAccessToken) missing.push('NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN');

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
      'Please check your .env.local file and ensure all required variables are set.'
    );
  }

  return env;
}

// Helper to safely get environment variables
export function getEnvVar(key: keyof EnvVars, fallback?: string): string {
  const value = process.env[key] || fallback;
  
  if (!value) {
    console.warn(`Environment variable ${key} is not set`);
    return '';
  }
  
  return value;
}

// Type-safe environment variable getter
export function getClientEnv() {
  return validateEnv(false);
}

export function getServerEnv() {
  return validateEnv(true);
}