import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { API_URL } from "../config";

interface IBlogShort {
    blog_avatar: string;
    blog_id: number;
    blog_caption: string;
    subscribed_blog_id: number;
    subscribed_by_user: number;
}

export const feedAPI = createApi({
    reducerPath: 'feedAPI',
    baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}` }),
    endpoints: (build) => ({
        fetchBlogsSubscribesShortly: build.query<IBlogShort[], string>({
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