import React, { FC } from "react";
import { Link } from "react-router-dom";
import { feedAPI } from "../../services/feedService";
import { AVATAR_BLOG_STATIC_URL } from "../../config";
import "./NewsFeed.css";

const NewsFeed: FC = () => {
  const { data: blogs } = feedAPI.useFetchBlogsSubscribesShortlyQuery(
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
    </section>
  );
};

export default NewsFeed;
