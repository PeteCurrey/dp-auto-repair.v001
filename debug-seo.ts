import { seoPages } from './src/data/seo-pages';

try {
  const serialized = JSON.stringify(seoPages);
  console.log('Successfully serialized seoPages');
} catch (e) {
  console.error('Failed to serialize seoPages:', e);
}
