import React, { FC } from "react";
import { feedAPI } from "../../services/feedService";
import "./NewsFeed.css";

const NewsFeed: FC = () => {
  const { data: result } = feedAPI.useFetchBlogsSubscribesShortlyQuery(
    localStorage.token
  );

  let blogs;

  if (result) {
    blogs = result?.blogs;
  }

  console.log(blogs);

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
     
    </section>
  );
};

export default NewsFeed;
