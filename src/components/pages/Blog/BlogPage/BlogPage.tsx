import React, { useState } from 'react';
import { BlogContainer, Header, PostsList } from './Blog.styled';
import { Button } from './components/Button/Button';
import { ListItem } from './components/ListItem';
import type { Post } from './types/Post';
import AddEditPost from './components/AddEditPost';

const mockData: Post[] = [
  {
    id: 1,
    title: 'Your Price Booking in the our life',
    publicationDate: new Date('12/10/2023'),
    changeDate: new Date('12/10/2023'),
    author: 'Taras Shevchenko',
    imageUrl: 'https://www.bing.com/',
    description: 'ololololol',
  },
  {
    id: 2,
    title: 'Your Price Booking in the our life',
    publicationDate: new Date('12/10/2023'),
    changeDate: new Date('12/10/2023'),
    author: 'Taras Shevchenko',
    imageUrl: 'https://www.bing.com/',
    description: 'ololololol',
  },
];

const mockLanguage = [
  {
    id: 0,
    code: 'EN',
  },
  {
    id: 1,
    code: 'PL',
  },
  {
    id: 2,
    code: 'UA',
  },
  {
    id: 3,
    code: 'RU',
  },
  // {
  //   id: 4,
  //   code: 'TR',
  // },
  // {
  //   id: 5,
  //   code: 'FR',
  // },
];
export const BlogPage = () => {
  const [isAddEditPopupOpen, setAddEditPopupOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | undefined>(undefined);

  const handleEditPost = (post: Post) => {
    setSelectedPost(post);
    setAddEditPopupOpen(true);
  };

  const handleAddPost = () => {
    setSelectedPost(undefined);
    setAddEditPopupOpen(true);
  };

  return (
    <BlogContainer>
      <Header>
        <div>
          <Button type="navigate" onClick={handleAddPost}>
            Add New
          </Button>
          <p>PUBLICATIONS</p>
        </div>
        <div>
          {mockLanguage.map(lang => (
            <Button type="navigate" onClick={() => console.log(lang.code)}>
              {lang.code}
            </Button>
          ))}
        </div>
      </Header>

      <PostsList>
        {mockData.map(post => (
          <ListItem key={post.id} post={post} onClick={() => handleEditPost(post)} />
        ))}
      </PostsList>
      <AddEditPost
        isOpen={isAddEditPopupOpen}
        onClose={() => setAddEditPopupOpen(false)}
        onSubmit={(updatedPost: Post) => {
          console.log('Saving post:', updatedPost);
          setAddEditPopupOpen(false);
        }}
        post={selectedPost}
      />
    </BlogContainer>
  );
};
