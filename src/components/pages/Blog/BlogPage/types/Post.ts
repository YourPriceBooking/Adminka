export type Post = {
  _id: string;
  title: string;
  description: string;
  heading: string;
  author: string;
  publicationDate?: Date;
  changeDate?: Date;
  imageUrl: string;
  articleUrl: string;
};
