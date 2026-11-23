export const ARTICLE_SLUG_MAX_LENGTH = 80;
const publicSite = 'https://www.thewandered.com';
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function articleSlugError(slug: string): string | undefined {
  if (slug === '') return undefined;
  if (slug.length > ARTICLE_SLUG_MAX_LENGTH || slug.match(slugPattern)?.[0] !== slug) {
    return 'Use up to 80 lowercase letters or digits, separated by single hyphens.';
  }
  return undefined;
}

export function customArticleUrl(category: string, slug: string): string | undefined {
  if (!slug || articleSlugError(slug)) return undefined;
  const section = category.toLowerCase();
  if (section.match(slugPattern)?.[0] !== section) return undefined;
  return `${publicSite}/${section === 'home' ? '' : `${section}/`}${slug}`;
}

export async function supportsCustomArticleSlug(blogBaseUrl: string, signal?: AbortSignal) {
  try {
    const response = await fetch(`${blogBaseUrl}/post/capabilities`, { cache: 'no-store', signal });
    return response.ok && (await response.json())?.customArticleSlug === true;
  } catch {
    return false;
  }
}

export function appendArticleSlug(data: FormData, slug: string, category: string, supported: boolean) {
  if (!slug) return undefined;
  if (!supported) throw new Error('Custom article links are not available. Your draft was kept.');
  const error = articleSlugError(slug);
  if (error) throw new Error(error);
  const expectedUrl = customArticleUrl(category, slug);
  if (!expectedUrl) throw new Error('Choose a category for the custom article link.');
  data.append('slug', slug);
  return expectedUrl;
}
