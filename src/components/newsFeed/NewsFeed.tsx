import React, { FC } from "react";
import { Link } from "react-router-dom";
import { feedAPI } from "../../services/feedService";
import { AVATAR_BLOG_STATIC_URL } from "../../config";
import "./NewsFeed.css";

const NewsFeed: FC = () => {
  const { data: blogs } = feedAPI.useFetchBlogsSubscribesShortlyQuery(
    localStorage.token
  );

  const { data: articles } = feedAPI.useFetchArticlesBlogsSubscribesQuery(
    localStorage.token
  );

  return (
    <section className="feed">
      <div className="feed-header">
        <p className="feed-header__caption">Лента</p>
        <input
          type="text"
          placeholder="Искать в Bloggy"
          className="feed-header__search"
        />
      </div>
      <div className="feed-subscontainer">
        <ul className="feed-subscribes">
          {blogs &&
            blogs.map((blog) => (
              <Link
                to={`/blogs/${blog.blog_id}`}
                style={{ textDecoration: "none" }}
              >
                <li className="feed-subscribes__blog" key={blog.blog_id}>
                  {blog.blog_avatar ? (
                    <img
                      src={`${AVATAR_BLOG_STATIC_URL + blog.blog_avatar}`}
                      alt={blog.blog_caption}
                      className="feed-subscribes__blog-img"
                    />
                  ) : (
                    <div className="feed-subscribes__blog-avatar">
                      {blog.blog_caption[0]}
                    </div>
                  )}
                </li>
              </Link>
            ))}
        </ul>
        <Link to="/subscribes">
          <button className="feed-subschange">Подписки</button>
        </Link>
      </div>
      <section className="feed-artccontainer">
        <ul className="feed-articles">
          {articles &&
            articles.map((article) => (
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
            ))}
        </ul>
      </section>
    </section>
  );
};

export default NewsFeed;
