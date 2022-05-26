import React, { FC } from "react";
import { Link } from "react-router-dom";
import { AVATAR_BLOG_STATIC_URL } from "../../../config";
import "./ArticleItem.css";

interface IArticleItemProps {
  article: {
    blog_id: number;
    blog_avatar: string;
    article_id: number;
    article_caption: string;
    blog_caption: string;
    article_content: string;
    article_datecreated: string;
  };
}

const ArticleItem: FC<IArticleItemProps> = ({ article }) => {
  return (
    <li className="feed-articles__element" key={article.blog_id}>
      <div className="feed-articles__element-main">
        <Link
          to={`/blogs/${article.blog_id}`}
          style={{ textDecoration: "none" }}
        >
          {article.blog_avatar ? (
            <img
              src={`${AVATAR_BLOG_STATIC_URL + article.blog_avatar}`}
              alt={article.blog_caption}
              className="feed-articles__element-img"
            />
          ) : (
            <div className="feed-articles__element-avatar">
              {article.blog_caption[0]}
            </div>
          )}
        </Link>
        <div className="feed-articles__element-text">
          <Link
            to={`/articles/${article.article_id}`}
            className="feed-articles__element-link"
          >
            <p className="feed-articles__element-caption">
              {article.article_caption}
            </p>
          </Link>
          <Link
            to={`/blogs/${article.blog_id}`}
            className="feed-articles__element-link"
          >
            <span className="feed-articles__element-title">
              {article.blog_caption}
            </span>
          </Link>
        </div>
      </div>
      <Link
        to={`/articles/${article.article_id}`}
        className="feed-articles__element-link"
      >
        <div className="feed-articles__element-content">
          {article.article_content}
        </div>
      </Link>
      <p className="feed-articles__element-date">
        {article.article_datecreated}
      </p>
    </li>
  );
};

export default ArticleItem;
