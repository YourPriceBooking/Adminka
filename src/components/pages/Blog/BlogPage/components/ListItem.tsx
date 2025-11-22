import React from 'react';
import type { Post } from '../types/Post';
import { PostDescription, PostTitle, PostWrapper, PostCategory } from '../Blog.styled';

type ListItemProps = {
  post: Post;
  country: string;
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

const getAuthorString = (author: any): string => {
  if (typeof author === 'string') {
    return author;
  }
  if (typeof author === 'object' && author !== null) {
    return author.name || author._id || author.id || String(author);
  }
  return String(author || '');
};

const getImageUrl = (imageUrl: any): string => {
  if (typeof imageUrl === 'string') {
    return imageUrl;
  }
  if (typeof imageUrl === 'object' && imageUrl !== null) {
    return imageUrl.url || imageUrl.id || String(imageUrl);
  }
  return String(imageUrl || '');
};

export const ListItem: React.FC<ListItemProps> = ({ post, onClick, country }) => {
  const authorString = getAuthorString(post.author);
  const imageUrlString = getImageUrl(post.imageUrl);

  return (
    <PostWrapper onClick={onClick}>
      <PostCategory>
        <p>{country}</p>
      </PostCategory>

      <div>
        <PostTitle>{post.title}</PostTitle>
        {post.publicationDate && (
          <PostTitle>
            <p>{formatDate(post.publicationDate)}</p>
          </PostTitle>
        )}
        {post.changeDate && (
          <PostTitle>
            <p>{formatDate(post.changeDate)}</p>
          </PostTitle>
        )}
        <PostTitle>{authorString}</PostTitle>
        {imageUrlString && (
          <PostTitle>
            <a href={imageUrlString} target="_blank" rel="noreferrer">
              {imageUrlString}
            </a>
          </PostTitle>
        )}
      </div>
      <PostDescription>
        <PostTitle>Description:</PostTitle>
        <p>{post.description}</p>
      </PostDescription>
    </PostWrapper>
  );
};
