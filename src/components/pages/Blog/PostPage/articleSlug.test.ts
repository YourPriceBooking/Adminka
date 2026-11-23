import { appendArticleSlug, articleSlugError, customArticleUrl, supportsCustomArticleSlug } from './articleSlug';

describe('custom article link', () => {
  it('leaves the existing create payload untouched when blank', () => {
    const data = new FormData();
    data.append('heading', 'Example');
    expect(appendArticleSlug(data, '', 'home', false)).toBeUndefined();
    expect(data.has('slug')).toBe(false);
    expect(data.get('heading')).toBe('Example');
  });

  it('previews and appends only the bare slug, for home and section paths', () => {
    const data = new FormData();
    expect(customArticleUrl('home', 'kyiv-2026')).toBe('https://www.thewandered.com/kyiv-2026');
    expect(appendArticleSlug(data, 'kyiv-2026', 'Ukraine', true)).toBe('https://www.thewandered.com/ukraine/kyiv-2026');
    expect(data.get('slug')).toBe('kyiv-2026');
  });

  it('rejects noncanonical, unsafe and overlong input as well as a missing category', () => {
    for (const invalid of ['a--b', 'A', '-test', 'test-', 'a/b', 'https://example.com', 'a?b', 'київ', ' example', 'example\n', 'a'.repeat(81)]) {
      expect(articleSlugError(invalid)).toBeDefined();
      const data = new FormData();
      expect(() => appendArticleSlug(data, invalid, 'home', true)).toThrow();
      expect(data.has('slug')).toBe(false);
    }
    expect(articleSlugError('a'.repeat(80))).toBeUndefined();
    expect(customArticleUrl('not selected', 'test')).toBeUndefined();
    expect(() => appendArticleSlug(new FormData(), 'test', '', true)).toThrow('Choose a category');
  });

  it('does not silently drop the custom slug when backend support is absent', () => {
    const data = new FormData();
    expect(() => appendArticleSlug(data, 'test', 'home', false)).toThrow('not available');
    expect(data.has('slug')).toBe(false);
  });

  it('only enables the field after a successful explicitly supported capability response', async () => {
    const realFetch = global.fetch;
    const mocked = jest.fn();
    try {
      global.fetch = mocked;
      mocked.mockResolvedValueOnce({ ok: false }).mockResolvedValueOnce({
        ok: true, json: async () => ({ customArticleSlug: 'true' }),
      }).mockRejectedValueOnce(new Error('network')).mockResolvedValueOnce({
        ok: true, json: async () => ({ customArticleSlug: true }),
      });
      await expect(supportsCustomArticleSlug('/blog/api')).resolves.toBe(false);
      await expect(supportsCustomArticleSlug('/blog/api')).resolves.toBe(false);
      await expect(supportsCustomArticleSlug('/blog/api')).resolves.toBe(false);
      await expect(supportsCustomArticleSlug('/blog/api')).resolves.toBe(true);
      expect(mocked).toHaveBeenLastCalledWith('/blog/api/post/capabilities', { cache: 'no-store', signal: undefined });
    } finally {
      global.fetch = realFetch;
    }
  });
});
