import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { API_URL } from "../config";

interface IBlogsShort {
    blogs: [
        {
            blogAvatar: string;
            blogId: number;
            subscribed_blog_id: number;
            subscribed_by_user: number;
        }
    ],
    articles: []
}

export const feedAPI = createApi({
    reducerPath: 'feedAPI',
    baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}` }),
    endpoints: (build) => ({
        fetchBlogsSubscribesShortly: build.query<IBlogsShort, string>({
            query: (token: string) => ({
                url: `/user/subscribes`,
                method: "POST",
                headers: {
                    jwt_token: token
                },
                body: {
                    type: 'short'
                }
            }),
        }),
    })
})