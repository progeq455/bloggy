import React, { FC } from "react";

interface IArticleItemProps {
  blog: {
    blog_avatar: string;
    blog_id: number;
    blog_caption: string;
  };
  article: {
    article_id: number;
    article_caption: string;
    article_content: string;
  };
}

const ArticleItem: FC<IArticleItemProps> = ({ blog, article }) => {
  return (
    <div>
      <p>content of article</p>
    </div>
  );
};

export default ArticleItem;
