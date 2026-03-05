import { getTopTags } from '@/lib/content/blog';
import Navigation from './Navigation';

/**
 * Server component — fetches top tags at request time and passes them
 * to the client Navigation component so dropdowns can be populated
 * without an extra client-side fetch.
 */
export default function NavigationWrapper() {
  const topTags = getTopTags(4);
  return <Navigation topTags={topTags} />;
}
