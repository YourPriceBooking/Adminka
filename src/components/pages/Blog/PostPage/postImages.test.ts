import { appendPostImages, getInlineImageInsertion, type PostImage } from './postImages';

function asset(name: string): PostImage {
  return {
    file: new File(['bytes'], `${name}.webp`, { type: 'image/webp' }),
    alt: `alt ${name}`,
    caption: `caption ${name}`,
  };
}

const cover = asset('cover');
const imageA = asset('A');
const imageB = asset('B');
const assets = new Map([
  ['blob:A', imageA],
  ['blob:B', imageB],
]);

test('inserting into a paragraph leaves text intact on either side and returns the next caret', () => {
  expect(getInlineImageInsertion('blob:A', 4, 'e')).toEqual({
    ops: [{ retain: 4 }, { insert: '\n' }, { insert: { image: 'blob:A' } }, { insert: '\n' }],
    caret: 7,
  });
  expect(getInlineImageInsertion('blob:B', 0, '')).toEqual({
    ops: [{ insert: { image: 'blob:B' } }, { insert: '\n' }],
    caret: 2,
  });
  expect(getInlineImageInsertion('blob:B', 9, '\n')).toEqual({
    ops: [{ retain: 9 }, { insert: { image: 'blob:B' } }, { insert: '\n' }],
    caret: 11,
  });
});

test('serializes at publish, using final article order even when images were chosen in reverse order', () => {
  const data = new FormData();
  appendPostImages(
    data,
    '<p>Intro</p><p><img src="blob:B"></p><p>Middle</p><p><img src="blob:A"></p><p>End</p>',
    cover,
    assets
  );
  expect(data.getAll('image')).toEqual([cover.file, imageB.file, imageA.file]);
  expect(data.getAll('alts')).toEqual(['alt cover', 'alt B', 'alt A']);
  expect(data.getAll('captions')).toEqual(['caption cover', 'caption B', 'caption A']);
});

test('deletion omits the image; undo can use its original file and metadata', () => {
  const removed = new FormData();
  appendPostImages(removed, '<p><img src="blob:B"></p>', cover, assets);
  expect(removed.getAll('image')).toEqual([cover.file, imageB.file]);
  const undone = new FormData();
  appendPostImages(undone, '<p><img src="blob:A"></p>', cover, assets);
  expect(undone.getAll('captions')).toEqual(['caption cover', 'caption A']);
});

test('allows text without a cover but refuses to mistake the first inline photo for a cover', () => {
  const data = new FormData();
  appendPostImages(data, '<p>Text</p>', null, assets);
  expect(data.getAll('image')).toEqual([]);
  expect(() => appendPostImages(data, '<img src="blob:A">', null, assets)).toThrow(/cover/);
  expect(() => appendPostImages(data, '<img src="blob:unknown">', cover, assets)).toThrow(/Insert Image/);
  expect(data.getAll('image')).toEqual([]);
});
