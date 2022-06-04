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
    <li className="article" key={article.blog_id}>
      <div className="article-main">
        <Link
          to={`/blogs/${article.blog_id}`}
          style={{ textDecoration: "none" }}
        >
          {article.blog_avatar ? (
            <img
              src={`${AVATAR_BLOG_STATIC_URL + article.blog_avatar}`}
              alt={article.blog_caption}
              className="article-main__img"
            />
          ) : (
            <div className="article-main__avatar">
              {article.blog_caption[0]}
            </div>
          )}
        </Link>
        <div className="article-main__text">
          <Link
            to={`/articles/${article.article_id}`}
            className="article-main__text-link"
          >
            <p className="article-main__text-caption">
              {article.article_caption}
            </p>
          </Link>
          <Link
            to={`/blogs/${article.blog_id}`}
            className="article-main__text-link"
          >
            <p className="article-main__text-title">
              {article.blog_caption}
            </p>
          </Link>
        </div>
      </div>
      <Link
        to={`/articles/${article.article_id}`}
        className="article-link"
      >
        <div className="article__element-content">
          {article.article_content}
        </div>
      </Link>
      <p className="article__element-date">
        {article.article_datecreated}
      </p>
    </li>
  );
};

export default ArticleItem;
