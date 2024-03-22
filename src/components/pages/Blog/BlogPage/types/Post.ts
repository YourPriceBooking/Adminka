export type Post = {
  id: number;
  title: string;
  description: string;
  author: string;
  publicationDate?: Date;
  changeDate?: Date;
  imageUrl: string;
};
