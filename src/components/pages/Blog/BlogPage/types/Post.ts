export type Post = {
  _id: string;
  title: string;
  description: string;
  author: string;
  publicationDate?: Date;
  changeDate?: Date;
  imageUrl: string;
  articleUrl: string;
};
