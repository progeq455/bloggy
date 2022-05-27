import React, { FC } from "react";
import { Link } from "react-router-dom";
import { feedAPI } from "../../services/feedService";
import { AVATAR_BLOG_STATIC_URL } from "../../config";
import ArticleItem from "../article/articleItem/ArticleItem";
import "./NewsFeed.css";

const NewsFeed: FC = () => {
  const { data: blogs, isFetching } =
    feedAPI.useFetchBlogsSubscribesShortlyQuery(localStorage.token);
  const { data: articles, isLoading } =
    feedAPI.useFetchArticlesBlogsSubscribesQuery(localStorage.token);

  return (
    <section className="feed">
      <div className="feed-header">
        <p className="feed-header__caption">Лента</p>
      </div>
      <div className="feed-subscontainer">
        <ul className="feed-subscribes">
          {isFetching === false ? (
            blogs && blogs.length !== 0 ? (
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
              ))
            ) : (
              <p className="feed-subscribes__none">У вас еще нету подписок!</p>
            )
          ) : (
            <p className="feed-subscribes__loading">Загрузка...</p>
          )}
        </ul>
        <Link to="/subscribes">
          <button className="feed-subschange">Подписки</button>
        </Link>
      </div>
      <section className="feed-artccontainer">
        <ul className="feed-articles">
          {isLoading === false ? (
            articles && articles.length !== 0 ? (
              articles.map((article) => <ArticleItem article={article} />)
            ) : (
              <p className="feed-articles__none">В ленте пока ничего нет :(</p>
            )
          ) : (
            <p className="feed-articles__loading">Загрузка...</p>
          )}
        </ul>
      </section>
    </section>
  );
};

export default NewsFeed;
