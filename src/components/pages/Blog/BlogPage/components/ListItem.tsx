import React from 'react';
import type { Post } from '../types/Post';
import { PostDescription, PostTitle, PostWrapper } from '../Blog.styled';

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
      {post.publicationDate && (
        <PostTitle>
          <time>{formatDate(post.publicationDate)}</time>
        </PostTitle>
      )}
      {post.changeDate && (
        <PostTitle>
          <time>{formatDate(post.changeDate)}</time>
        </PostTitle>
      )}
      <PostTitle>{post.author}</PostTitle>
      <PostTitle>
        <a href={post.imageUrl} target="_blank" rel="noreferrer">
          {post.imageUrl}
        </a>
      </PostTitle>
    </div>
    <PostDescription>
      <PostTitle>Description:</PostTitle>
      <p>{post.description}</p>
    </PostDescription>
  </PostWrapper>
);
