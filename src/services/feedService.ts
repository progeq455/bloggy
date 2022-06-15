import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { API_URL } from "../config";

export interface IBlogShort {
  blog_avatar: string;
  blog_id: number;
  blog_caption: string;
  subscribed_blog_id: number;
  subscribed_by_user: number;
}

export interface IArticleOfSubscribedBlogs {
  blog_id: number;
  blog_avatar: string;
  article_id: number;
  article_caption: string;
  blog_caption: string;
  article_content: string;
  article_datecreated: string;
}

export const feedAPI = createApi({
  reducerPath: "feedAPI",
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}` }),
  endpoints: (build) => ({
    fetchBlogsSubscribesShortly: build.query<IBlogShort[], string>({
      query: (token: string) => ({
        url: `/user/subscribes?type=short`,
        headers: {
          jwt_token: token,
        },
      }),
    }),
    fetchArticlesBlogsSubscribes: build.query<
      IArticleOfSubscribedBlogs[],
      string
    >({
      query: (token: string) => ({
        url: `/user/subscribes?type=basic`,
        headers: {
          jwt_token: token,
        },
      }),
    }),
  }),
});
