import React, { useState } from 'react';
import { PostsList } from './Blog.styled';
import { Button } from './components/Button';
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
    <div>
      <div>Nav</div>
      <Button onClick={handleAddPost}>+ Add</Button>
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
    </div>
  );
};
