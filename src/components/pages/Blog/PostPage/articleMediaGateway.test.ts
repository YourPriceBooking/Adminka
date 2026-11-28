import { resolveArticleMediaGatewayPath } from './articleMediaGateway';

test('normalizes a configured same-origin route prefix', () => {
  expect(resolveArticleMediaGatewayPath(' /admin-gateway/post/update-post-media/ ')).toBe('/admin-gateway/post/update-post-media');
});

test.each([
  undefined, '', '/blog/api/post/update-post-media', 'https://www.thewandered.com/blog/api',
  '//another.example/post/media', '/\\another.example', '/path/../entry', '/path/%2e%2e/entry',
  '/path?target=external', '/path#anchor', '/post/media/:id',
])('rejects an absent or invalid gateway prefix: %s', (prefix) => {
  expect(resolveArticleMediaGatewayPath(prefix)).toBeNull();
});
