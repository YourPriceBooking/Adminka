import axios from 'axios';

// Only accept a same-origin path. Never send the Adminka bearer to Blog API.
export function resolveArticleMediaGatewayPath(value: string | undefined): string | null {
  const path = value?.trim().replace(/\/$/, '');
  if (!path || !/^\/(?:[a-zA-Z0-9_-]+\/)*[a-zA-Z0-9_-]+$/.test(path)) return null;
  if (/^\/blog\/api(?:\/|$)/i.test(path)) return null;
  return path;
}

export function getArticleMediaGatewayPath(): string | null {
  return resolveArticleMediaGatewayPath(process.env.REACT_APP_BLOG_MEDIA_GATEWAY_PATH);
}

export async function saveArticleMedia(
  id: string,
  data: FormData,
  adminToken: string,
): Promise<void> {
  const path = getArticleMediaGatewayPath();
  if (!path) throw new Error('The article photo gateway is not configured. Your draft is still here.');
  const response = await axios.patch(`${path}/${encodeURIComponent(id)}`, data, {
    headers: { Authorization: `Bearer ${adminToken}` },
  });
  // A missing route may be served by the SPA fallback with HTTP 200.
  if (response.data?.status !== 'success' || response.data?.code !== 200) {
    throw new Error('The gateway did not confirm the photo save. Your draft is still here.');
  }
}
