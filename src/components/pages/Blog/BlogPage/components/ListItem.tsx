import React from 'react';
import type { Post } from '../types/Post';
import { PostTitle, PostWrapper } from '../Blog.styled';

type ListItemProps = {
  post: Post;
  onClick: () => void;
};

type DateTimeFormatOptions = {
  month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
  day?: 'numeric' | '2-digit';
  year?: 'numeric' | '2-digit';
};

const formatDate = (dateString: Date) => {
  const options: DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

export const ListItem: React.FC<ListItemProps> = ({ post, onClick }) => (
  <PostWrapper onClick={onClick}>
    <div>
      <PostTitle>{post.title}</PostTitle>
      <PostTitle>
        <time>{formatDate(post.publicationDate)}</time>
      </PostTitle>
      <PostTitle>
        <time>{formatDate(post.changeDate)}</time>
      </PostTitle>
      <PostTitle>{post.author}</PostTitle>
      <PostTitle>{post.imageUrl}</PostTitle>
    </div>
    <div>
      <PostTitle>Description:</PostTitle>
      <p>{post.description}</p>
    </div>
  </PostWrapper>
);
