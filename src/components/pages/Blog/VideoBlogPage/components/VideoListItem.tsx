import React from 'react';
import { PostDescription, PostTitle, PostWrapper, PostCategory } from '../../BlogPage/Blog.styled';

type VideoPost = {
  _id: number;
  country: string;
  title: string;
  date: string;
  heading: string;
  url: string;
  description: string;
};
type ListItemProps = {
  post: VideoPost;
  country: string;
  onClick: () => void;
};

// type DateTimeFormatOptions = {
//     month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
//     day?: 'numeric' | '2-digit';
//     year?: 'numeric' | '2-digit';
// };

// const formatDate = (dateString: Date) => {
//     const options: DateTimeFormatOptions = {
//         month: 'long',
//         day: 'numeric',
//         year: 'numeric',
//     };
//     return new Date(dateString).toLocaleDateString('en-US', options);
// };

export const VideoListItem: React.FC<ListItemProps> = ({ post, onClick, country }) => (
  <PostWrapper onClick={onClick}>
    <PostCategory>
      <p>{country}</p>
    </PostCategory>

    <div>
      <PostTitle>{post.title}</PostTitle>
      {post.date && (
        <PostTitle>
          <p>{post.date}</p>
        </PostTitle>
      )}
      <PostTitle>
        <p>{post.heading}</p>
      </PostTitle>

      <PostTitle>
        <a href={post.url} target="_blank" rel="noreferrer">
          {post.url}
        </a>
      </PostTitle>
    </div>
    <PostDescription>
      <PostTitle>Description:</PostTitle>
      <p>{post.description}</p>
    </PostDescription>
  </PostWrapper>
);
