import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { API_URL } from "../config";

interface IAboutBlog {
  author: {
    user_login: string;
    user_id: number;
  };
  blog: {
    blog_id: number;
    blog_user_id: number;
    blog_avatar: string;
    blog_banner: string;
    blog_caption: string;
    blog_description: string;
  };
  subscribedToBlog: boolean;
  countSubscribers: number;
  articlesOfBlog: [
    {
      blog_id: number;
      blog_avatar: string;
      article_id: number;
      article_caption: string;
      blog_caption: string;
      article_content: string;
      article_datecreated: string;
    }
  ];
}

interface IQueryBlog {
  token: string;
  id: number;
}

export const blogAPI = createApi({
  reducerPath: "blogAPI",
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}` }),
  tagTypes: ["Blog"],
  endpoints: (build) => ({
    fetchAboutBlog: build.query<IAboutBlog, IQueryBlog>({
      query: ({ token, id }: IQueryBlog) => ({
        url: `/blogs/${id}`,
        headers: {
          jwt_token: token,
        },
      }),
      providesTags: () => ["Blog"],
    }),
    changeBlogSubscribeStatus: build.mutation<boolean, IQueryBlog>({
      query: ({ token, id }: IQueryBlog) => ({
        url: "/blogs/subscribe",
        method: "POST",
        headers: {
          jwt_token: token,
        },
        body: {
          idBlog: id,
        },
      }),
      invalidatesTags: ["Blog"],
    }),
  }),
});
