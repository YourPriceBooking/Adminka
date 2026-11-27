import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import Quill from 'quill';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PostPage from './PostPage';

jest.mock('App', () => ({ useAppSelector: (select: (state: unknown) => unknown) => select({ enterToken: { token: 'admin-fixture' } }) }));
jest.mock('features/blog/blogSelector', () => ({ getPost: () => ({ articleUrl: 'https://www.thewandered.com/canada/fixture' }) }));
jest.mock('features/api', () => ({ blogBaseUrl: 'https://blog.example.test' }));
jest.mock('axios', () => ({ get: jest.fn(), post: jest.fn(), patch: jest.fn(), isAxiosError: () => false }));

const http = axios as jest.Mocked<typeof axios>;

beforeEach(() => {
  http.get.mockResolvedValue({ data: { country: [], result: [] } });
  http.patch.mockReset();
  http.patch.mockResolvedValue({ data: {} });
  http.post.mockReset();
  http.post.mockRejectedValueOnce(new Error('Request did not reach server'));
  http.post.mockResolvedValue({ data: {} });
  URL.createObjectURL = jest.fn()
    .mockReturnValueOnce('blob:cover-preview')
    .mockReturnValueOnce('blob:a-preview')
    .mockReturnValueOnce('blob:a-asset')
    .mockReturnValueOnce('blob:b-preview')
    .mockReturnValueOnce('blob:b-asset');
  URL.revokeObjectURL = jest.fn();
  document.execCommand = jest.fn();
});

function renderNewPost() {
  const { container } = render(
    <MemoryRouter initialEntries={['/blog/post/new']}>
      <Routes>
        <Route path="/blog/post/:id" element={<PostPage />} />
        <Route path="/blog" element={<div>Blog posts</div>} />
      </Routes>
    </MemoryRouter>
  );
  const editor = Quill.find(container.querySelector('.ql-container')!) as Quill;
  const file = (name: string) => new File(['fixture'], `${name}.webp`, { type: 'image/webp' });

  function choose(name: string, action: string) {
    fireEvent.change(container.querySelector('#image-upload')!, {
      target: { files: [file(name)] },
    });
    fireEvent.change(screen.getByLabelText(/alt text/i), { target: { value: `alt ${name}` } });
    fireEvent.change(screen.getByLabelText('Caption (Optional)'), { target: { value: `caption ${name}` } });
    fireEvent.click(screen.getByRole('button', { name: action }));
  }
  return { editor, choose };
}

test('new article inserts photos at the remembered cursor and submits their final order', async () => {
  const { editor, choose } = renderNewPost();

  fireEvent.click(screen.getByRole('button', { name: 'Insert Image into Article' }));
  fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
  expect(editor.root.querySelectorAll('img')).toHaveLength(0);

  fireEvent.click(screen.getByRole('button', { name: 'Select Cover Image' }));
  await act(async () => { choose('cover', 'Set as Article Image'); });

  await act(async () => { editor.setText('First\nSecond\nThird\n', 'user'); });
  fireEvent.click(screen.getByRole('button', { name: 'Insert Image into Article' }));
  expect(screen.queryByRole('button', { name: 'Insert Image', exact: true })).toBeNull();
  act(() => {
    editor.setSelection(13, 0, 'silent');
    editor.blur();
  });
  fireEvent.click(screen.getByRole('button', { name: 'Insert Image into Article' }));
  await act(async () => { choose('A', 'Insert Image'); });

  act(() => {
    editor.setSelection(6, 0, 'silent');
    editor.blur();
  });
  fireEvent.click(screen.getByRole('button', { name: 'Insert Image into Article' }));
  await act(async () => { choose('B', 'Insert Image'); });

  fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

  await waitFor(() => {
    expect(http.post).toHaveBeenCalledTimes(1);
    expect((screen.getByRole('button', { name: 'Submit' }) as HTMLButtonElement).disabled).toBe(false);
  });
  const [endpoint, data] = http.post.mock.calls[0] as [string, FormData];
  expect(endpoint).toBe('https://blog.example.test/post/add-post');
  expect((data.getAll('image') as File[]).map(asset => asset.name)).toEqual(['cover.webp', 'B.webp', 'A.webp']);
  expect(data.getAll('alts')).toEqual(['alt cover', 'alt B', 'alt A']);
  expect(data.getAll('captions')).toEqual(['caption cover', 'caption B', 'caption A']);
  const markup = String(data.get('markup'));
  expect(markup).toContain('<p>First</p><p><img src="blob:b-asset"></p><p>Second</p><p><img src="blob:a-asset"></p><p>Third</p>');
  expect(editor.root.querySelectorAll('img')).toHaveLength(2);
  fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
  await screen.findByText('Blog posts');
  const retryData = http.post.mock.calls[1][1] as FormData;
  expect(retryData.get('markup')).toBe(markup);
  expect((retryData.getAll('image') as File[]).map(asset => asset.name)).toEqual(['cover.webp', 'B.webp', 'A.webp']);
});

test('inserting at a formatted caret preserves the heading and the numbered list as a whole', async () => {
  const { editor, choose } = renderNewPost();

  await act(async () => {
    editor.clipboard.dangerouslyPasteHTML('<h2>Heading title</h2><ol><li>First item</li><li>Second item</li></ol><p>Body</p>', 'user');
    editor.setSelection(4, 0, 'silent');
    editor.blur();
  });
  fireEvent.click(screen.getByRole('button', { name: 'Insert Image into Article' }));
  await act(async () => { choose('heading photo', 'Insert Image'); });
  expect(editor.root.querySelector('h2')?.textContent).toBe('Heading title');
  expect(editor.root.querySelector('h2')?.previousElementSibling?.querySelector('img')).not.toBeNull();

  act(() => {
    const contents = editor.getText();
    const second = contents.indexOf('Second item') + 3;
    // Quill's visible text omits image embeds, which occupy one Delta position.
    editor.setSelection(second + 1, 0, 'silent');
    editor.blur();
  });
  fireEvent.click(screen.getByRole('button', { name: 'Insert Image into Article' }));
  await act(async () => { choose('list photo', 'Insert Image'); });

  const [list] = Array.from(editor.root.querySelectorAll('ol'));
  expect(editor.root.querySelectorAll('ol')).toHaveLength(1);
  expect(Array.from(list.querySelectorAll('li')).map(item => item.textContent)).toEqual(['First item', 'Second item']);
  expect(list.previousElementSibling?.querySelector('img')).not.toBeNull();
});

const revision = '2026-11-27T13:14:15.000Z';
const existingImageUrl = 'https://res.cloudinary.com/existing.webp';
const savedPost = {
  title: 'Published title',
  author: 'Writer',
  description: 'Published description',
  heading: 'Canada',
  country: 'canada',
  updatedAt: revision,
  markup: '<p>First</p><p><img src="blob:old"></p><p>Final</p>',
  imageUrl: [
    { url: 'https://res.cloudinary.com/cover.webp', context: { alt: 'Cover alt', caption: 'Old caption' } },
    { url: existingImageUrl, context: { alt: 'Old inline alt', caption: 'Old inline caption' } },
  ],
};

async function renderPublishedPost(existingArticleMedia: boolean) {
  const fetchMock = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ existingArticleMedia }) });
  const oldFetch = global.fetch;
  global.fetch = fetchMock;
  http.get.mockImplementation(async (url: string) => ({
    data: url.includes('/post/get-by-url') ? { result: savedPost } : {
      country: [], result: [{ name: 'Writer' }],
    },
  }));
  URL.createObjectURL = jest.fn()
    .mockReturnValueOnce('blob:preview')
    .mockReturnValueOnce('blob:staged');
  const { container } = render(
    <MemoryRouter initialEntries={['/blog/post/existing']}>
      <Routes>
        <Route path="/blog/post/:id" element={<PostPage />} />
        <Route path="/blog" element={<div>Blog posts</div>} />
      </Routes>
    </MemoryRouter>
  );

  try {
    await screen.findByAltText('Cover alt');
    return container;
  } finally {
    global.fetch = oldFetch;
  }
}

test('published article hydrates its inline image, stages a file at caret, and retains its draft when a save fails', async () => {
  const container = await renderPublishedPost(true);
  const editor = Quill.find(container.querySelector('.ql-container')!) as Quill;
  expect(editor.root.querySelector('img')?.getAttribute('src')).toBe(existingImageUrl);
  http.patch.mockRejectedValueOnce(new Error('Network request failed'));

  act(() => {
    editor.setSelection(6, 0, 'silent');
    editor.blur();
  });
  fireEvent.click(screen.getByRole('button', { name: 'Insert Image into Article' }));
  const selected = new File(['fixture'], 'canada.webp', { type: 'image/webp' });
  fireEvent.change(container.querySelector('#image-upload')!, { target: { files: [selected] } });
  fireEvent.change(screen.getByLabelText('Alt Text (Required) *'), { target: { value: 'Toronto downtown' } });
  fireEvent.change(screen.getByLabelText('Caption (Optional)'), { target: { value: 'Toronto, Canada' } });
  await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Insert Image', exact: true })); });
  fireEvent.change(screen.getByLabelText('Cover image caption'), { target: { value: 'Edited caption' } });
  fireEvent.click(screen.getByRole('button', { name: 'Update Post' }));
  await waitFor(() => {
    expect(http.patch).toHaveBeenCalledTimes(1);
    expect((screen.getByRole('button', { name: 'Update Post' }) as HTMLButtonElement).disabled).toBe(false);
  });

  const [route, body, options] = http.patch.mock.calls[0] as [string, FormData, { headers: { Authorization: string } }];
  expect(options.headers.Authorization).toBe('Bearer admin-fixture');
  expect(route).toBe('https://blog.example.test/post/update-post-media/existing');
  expect(body.get('revision')).toBe(revision);
  expect(body.get('title')).toBe('Published title');
  expect(body.get('author')).toBe('Writer');
  expect(body.get('description')).toBe('Published description');
  expect(body.has('articleUrl')).toBe(false);
  expect(body.has('heading')).toBe(false);
  expect(body.getAll('image')).toEqual([selected]);
  expect(String(body.get('markup'))).toContain('<p>First</p><p><img src="blob:staged"></p>');
  expect(JSON.parse(String(body.get('media')))).toEqual({
    cover: { alt: 'Cover alt', caption: 'Edited caption' },
    inline: [
      { upload: 0, src: 'blob:staged', alt: 'Toronto downtown', caption: 'Toronto, Canada' },
      { existing: 1, src: existingImageUrl },
    ],
  });
  expect(editor.root.querySelectorAll('img')).toHaveLength(2);
  fireEvent.click(screen.getByRole('button', { name: 'Update Post' }));
  await screen.findByText('Blog posts');
  expect((http.patch.mock.calls[1][1] as FormData).get('media')).toBe(body.get('media'));
});

test('text-only save uses the legacy endpoint and keeps the original inline source', async () => {
  const container = await renderPublishedPost(true);
  const editor = Quill.find(container.querySelector('.ql-container')!) as Quill;
  act(() => { editor.insertText(5, ' changed', 'user'); });
  fireEvent.click(screen.getByRole('button', { name: 'Update Post' }));
  await screen.findByText('Blog posts');

  const [route, body] = http.patch.mock.calls[0];
  expect(route).toBe('https://blog.example.test/post/update-post/existing');
  expect(body).toMatchObject({ markup: '<p>First changed</p><p><img src="blob:old"></p><p>Final</p>' });
});

test('published image editing is unavailable unless explicitly supported by the backend', async () => {
  await renderPublishedPost(false);
  expect(screen.queryByRole('button', { name: 'Insert Image into Article' })).toBeNull();
  expect(screen.queryByLabelText('Cover image caption')).toBeNull();
});

test('cover-only update is multipart without any new photos', async () => {
  await renderPublishedPost(true);
  fireEvent.change(screen.getByLabelText('Cover image alt text'), { target: { value: 'Toronto skyline' } });
  fireEvent.click(screen.getByRole('button', { name: 'Update Post' }));
  await screen.findByText('Blog posts');

  const [route, body] = http.patch.mock.calls[0] as [string, FormData];
  expect(route).toBe('https://blog.example.test/post/update-post-media/existing');
  expect(body.getAll('image')).toHaveLength(0);
  expect(JSON.parse(String(body.get('media'))).cover).toEqual({ alt: 'Toronto skyline', caption: 'Old caption' });
});

test('saving cannot drop a previously published inline photo', async () => {
  const container = await renderPublishedPost(true);
  const editor = Quill.find(container.querySelector('.ql-container')!) as Quill;
  act(() => { editor.setText('No previous inline photo', 'user'); });
  fireEvent.click(screen.getByRole('button', { name: 'Update Post' }));
  await waitFor(() =>
    expect((screen.getByRole('button', { name: 'Update Post' }) as HTMLButtonElement).disabled).toBe(false)
  );
  expect(http.patch).not.toHaveBeenCalled();
});
