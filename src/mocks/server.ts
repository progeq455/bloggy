import { rest } from "msw";
import { setupServer } from "msw/node";
import { IArticleOfSubscribedBlogs, IBlogShort } from "../services/feedService";
import { API_URL } from "../config";

const getBlogs: IBlogShort[] = [
  {
    blog_avatar: "url_avatar_blog",
    blog_id: 1,
    blog_caption: "The best blog",
    subscribed_blog_id: 1,
    subscribed_by_user: 1,
  },
];

const getArticles: IArticleOfSubscribedBlogs[] = [
  {
    blog_id: 1,
    blog_avatar: "url_avatar_blog",
    article_id: 1,
    article_caption: "The greatest article",
    blog_caption: "The best blog",
    article_content: "Th content of article",
    article_datecreated: "12.03.2022",
  },
];

export const server = setupServer(
  rest.get(`${API_URL}/user/subscribes`, (req, res, ctx) => {
    const type = req.url.searchParams.get("type");

    if (type === "short") {
      return res(ctx.json({ blogs: getBlogs }));
    }
    
    return res(ctx.json({ articles: getArticles }));
  })
);
