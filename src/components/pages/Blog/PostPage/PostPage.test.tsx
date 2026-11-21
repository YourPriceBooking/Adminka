import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import Quill from 'quill';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PostPage from './PostPage';

jest.mock('App', () => ({ useAppSelector: () => ({}) }));
jest.mock('features/blog/blogSelector', () => ({ getPost: jest.fn() }));
jest.mock('features/api', () => ({ blogBaseUrl: 'https://blog.example.test' }));
jest.mock('axios', () => ({ get: jest.fn(), post: jest.fn(), isAxiosError: () => false }));

const http = axios as jest.Mocked<typeof axios>;

beforeEach(() => {
  http.get.mockResolvedValue({ data: { country: [], result: [] } });
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
