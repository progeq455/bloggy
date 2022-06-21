CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    user_login VARCHAR(255) NOT NULL UNIQUE,
    user_email VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(100) NOT NULL,
    user_avatar INTEGER DEFAULT 0,
    user_about VARCHAR(1000)
);

CREATE TABLE blogs(
    blog_id SERIAL PRIMARY KEY,
    blog_user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    blog_avatar VARCHAR(255),
    blog_banner VARCHAR(255),
    blog_caption VARCHAR(255) NOT NULL,
    blog_description VARCHAR(1000)
);

CREATE TABLE subscribesBlogs(
    subscribe_id SERIAL PRIMARY KEY,
    subscribed_blog_id INTEGER REFERENCES blogs(blog_id) ON DELETE CASCADE,
    subscribed_by_user INTEGER NOT NULL
);

CREATE TABLE articles(
    article_id SERIAL PRIMARY KEY,
    article_blog_id INTEGER REFERENCES blogs(blog_id) ON DELETE CASCADE,
    article_user_id INTEGER REFERENCES users(user_id),
    article_banner VARCHAR(255),
    article_caption VARCHAR(255) NOT NULL,
    article_content VARCHAR(5000) NOT NULL,
    article_dateCreated VARCHAR(255) NOT NULL
);

CREATE TABLE comments(
    comment_id SERIAL PRIMARY KEY,
    comment_article_id INTEGER REFERENCES articles(article_id) ON DELETE CASCADE,
    comment_user_id INTEGER REFERENCES users(user_id),
    comment_content VARCHAR(500) NOT NULL,
    comment_dateCreated VARCHAR(255) NOT NULL
);

CREATE TABLE answersComments(
    answer_id SERIAL PRIMARY KEY,
    answer_comment_id INTEGER REFERENCES comments(comment_id) ON DELETE CASCADE,
    answer_user_id INTEGER REFERENCES users(user_id),
    answer_content VARCHAR(500) NOT NULL,
    answer_dataCreated VARCHAR(255) NOT NULL
);

CREATE TABLE likesArticles(
    like_id SERIAL PRIMARY KEY,
    like_article_id INTEGER REFERENCES articles(article_id) ON DELETE CASCADE,
    like_by_user INTEGER NOT NULL
);