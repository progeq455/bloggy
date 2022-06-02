export interface ISearchResultUser {
    user_id: number;
    user_avatar: number;
    user_login: string;
}

export interface ISearchResultBlog {
    blog_id: number;
    blog_avatar: string;
    blog_caption: string;
}

export interface ISearchResultArticle {
    blog_id: number;
    blog_avatar: string;
    article_id: number;
    article_caption: string;
    blog_caption: string;
}

export interface IFiltersToSearch {
    filter: string;
    query: string;
}