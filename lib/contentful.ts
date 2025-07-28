import { createClient } from 'contentful';

console.log("SPACE:", process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID);
console.log("TOKEN:", process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN);

const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID ?? 'MISSING_SPACE';
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN ?? 'MISSING_TOKEN';

if (space === 'MISSING_SPACE' || accessToken === 'MISSING_TOKEN') {
  console.warn('⚠️ Missing Contentful environment variables. Using fallback values.');
}

export const contentfulClient = createClient({
  space,
  accessToken,
});
