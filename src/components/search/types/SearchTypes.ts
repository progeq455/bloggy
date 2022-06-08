export interface IUserItem {
  user_id: number;
  user_avatar: number;
  user_login: string;
}

export interface IBlogItem {
  blog_id: number;
  blog_avatar: string;
  blog_caption: string;
}

export interface IArticleItem {
  blog_id: number;
  blog_avatar: string;
  article_id: number;
  article_caption: string;
  blog_caption: string;
}
