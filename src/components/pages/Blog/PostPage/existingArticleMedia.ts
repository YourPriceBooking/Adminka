import type { PostImage } from './postImages';

type CoverContext = { alt: string; caption: string };

type StoredImage = {
  url?: unknown;
  context?: { alt?: unknown; caption?: unknown };
};

export type ExistingMedia = {
  revision: string;
  markup: string;
  cover: CoverContext & { url: string };
  inline: { src: string; originalSrc: string }[];
};

const parseMarkup = (markup: string) => {
  const template = document.createElement('template');
  template.innerHTML = markup;
  return template;
};

export function existingCover(images: unknown) {
  const image = (Array.isArray(images) ? images[0] : undefined) as StoredImage | undefined;
  if (!image || typeof image.url !== 'string') return null;
  try {
    if (!['https:', 'http:'].includes(new URL(image.url).protocol)) return null;
  } catch {
    return null;
  }
  const value = image.context;
  return {
    url: image.url,
    alt: typeof value?.alt === 'string' ? value.alt : '',
    caption: typeof value?.caption === 'string' ? value.caption : '',
  };
}

export function hydrateArticleMedia(markup: string, images: unknown, updatedAt: unknown): ExistingMedia | null {
  const cover = existingCover(images);
  if (!cover || !Array.isArray(images) || typeof updatedAt !== 'string') return null;
  const validPhotoUrl = (value: string) => {
    const url = new URL(value);
    return url.protocol === 'https:' && url.hostname === 'res.cloudinary.com' && !url.username && !url.password;
  };
  if (!validPhotoUrl(cover.url)) return null;
  const timestamp = new Date(updatedAt);
  if (!Number.isFinite(timestamp.getTime()) || timestamp.toISOString() !== updatedAt) return null;

  const template = parseMarkup(markup);
  const embeds = Array.from(template.content.querySelectorAll('img'));
  if (images.length !== embeds.length + 1 || embeds.length > 50) return null;
  const inline: ExistingMedia['inline'] = [];
  const sources = new Set<string>();
  for (let index = 0; index < embeds.length; index += 1) {
    const img = embeds[index];
    const source = existingCover([images[index + 1]]);
    const originalSrc = img.getAttribute('src');
    if (!source || !validPhotoUrl(source.url) || !originalSrc || sources.has(source.url)) return null;
    sources.add(source.url);
    inline.push({ src: source.url, originalSrc });
    img.setAttribute('src', source.url);
  }

  return { revision: updatedAt, cover, markup: template.innerHTML, inline };
}

export async function supportsExistingArticleMedia(baseUrl: string, signal?: AbortSignal) {
  try {
    const response = await fetch(`${baseUrl}/post/capabilities`, { cache: 'no-store', signal });
    return response.ok && (await response.json())?.existingArticleMedia === true;
  } catch {
    return false;
  }
}

export function prepareArticleMedia(
  markup: string, saved: ExistingMedia, cover: CoverContext, staged: ReadonlyMap<string, PostImage>,
) {
  const template = parseMarkup(markup);
  const existing = new Map(saved.inline.map((asset, i) => [asset.src, { ...asset, index: i + 1 }]));
  const seen = new Set<string>();
  const files: File[] = [];
  const inline: ({ existing: number; src: string } | { upload: number; src: string; alt: string; caption: string })[] = [];
  const nodes = Array.from(template.content.querySelectorAll('img'));
  nodes.forEach(img => {
    const src = img.getAttribute('src') ?? '';
    if (seen.has(src)) throw new Error('Each article photo can only appear once. Undo the duplicate to save.');
    seen.add(src);
    const old = existing.get(src);
    const added = staged.get(src);
    if (old) {
      inline.push({ existing: old.index, src });
    } else if (src.startsWith('blob:') && added) {
      inline.push({ upload: files.length, src, alt: added.alt, caption: added.caption });
      files.push(added.file);
    } else {
      throw new Error('An article image could not be matched to a saved or selected file. Undo the image change to save.');
    }
  });
  if (saved.inline.some(asset => !seen.has(asset.src))) {
    throw new Error('Removing existing article photos is not supported. Undo the removal to save.');
  }

  if (files.length > 12 || inline.length > 50) {
    throw new Error('Add up to 12 files per save, with up to 50 photos in the article body.');
  }
  if (files.length || cover.alt !== saved.cover.alt || cover.caption !== saved.cover.caption) {
    const data = new FormData();
    data.append('markup', markup);
    data.append('revision', saved.revision);
    data.append('media', JSON.stringify({ cover, inline }));
    files.forEach(file => data.append('image', file));
    return { data };
  }

  // The legacy text endpoint cannot change the order of the stored image list.
  if (inline.some((asset, i) => !('existing' in asset) || asset.existing !== i + 1)) {
    throw new Error('Moving an existing photo on its own is not supported. Undo the move to save.');
  }
  nodes.forEach((img, i) => img.setAttribute('src', saved.inline[i].originalSrc));
  return { markup: nodes.length ? template.innerHTML : markup };
}
