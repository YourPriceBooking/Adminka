export type PostImage = {
  file: File;
  alt: string;
  caption: string;
};

export function getInlineImageInsertion(
  image: string,
  index: number,
  previousCharacter: string
) {
  const startNewParagraph = index > 0 && previousCharacter !== '\n';
  const ops = [
    ...(index > 0 ? [{ retain: index }] : []),
    ...(startNewParagraph ? [{ insert: '\n' }] : []),
    { insert: { image } },
    { insert: '\n' },
  ];
  return { ops, caret: index + (startNewParagraph ? 3 : 2) };
}

export function appendPostImages(
  data: FormData,
  markup: string,
  cover: PostImage | null,
  inlineByUrl: ReadonlyMap<string, PostImage>
) {
  const template = document.createElement('template');
  template.innerHTML = markup;
  const inline = Array.from(template.content.querySelectorAll('img')).map(image => {
    const asset = inlineByUrl.get(image.getAttribute('src') || '');
    if (!asset) throw new Error('Use Insert Image to attach each photo in the article.');
    return asset;
  });

  // The current API/site use image[0] as the cover, not the first inline photo.
  if (inline.length && !cover) {
    throw new Error('Choose a cover image before publishing an article with inline photos.');
  }

  const images = cover ? [cover, ...inline] : inline;
  images.forEach(asset => data.append('image', asset.file));
  images.forEach(asset => data.append('alts', asset.alt));
  images.forEach(asset => data.append('captions', asset.caption));
}
