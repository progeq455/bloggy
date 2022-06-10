import React, { FC } from "react";
import { useParams, Link } from "react-router-dom";
import { AVATAR_BLOG_STATIC_URL, BANNER_BLOG_STATIC_URL } from "../../config";
import { blogAPI } from "../../services/blogService";
import ArticleItem from "../article/articleItem/ArticleItem";
import "./Blog.css";

const Blog: FC = () => {
    const { id } = useParams();
    const idBlog = Number(id);

    const dataQuery = {
        token: localStorage.token,
        id: idBlog,
    }

    const { data: result, isLoading } = blogAPI.useFetchAboutBlogQuery(dataQuery);
    const [changeBlogSubscribeStatus, { }] = blogAPI.useChangeBlogSubscribeStatusMutation();

    const changeSubscribe = () => {
        changeBlogSubscribeStatus(dataQuery);
    }

    return (
        <section className="blog">
            {isLoading === false ? (
                result &&
                <header className="blog-header">
                    {result.blog.blog_banner ? (
                        <img
                            src={BANNER_BLOG_STATIC_URL + result.blog.blog_banner}
                            alt={result.blog.blog_caption}
                            className="blog-header__banner"
                        />
                    ) : (
                        <div className="blog-header__banner-grafic">
                            <p className="blog-header__banner-text">{result.blog.blog_caption}</p>
                        </div>
                    )}
                    <div className="blog-header__avatar">
                        {result.blog.blog_avatar ? (
                            <img src={AVATAR_BLOG_STATIC_URL + result.blog.blog_avatar} alt={result.blog.blog_caption} className="blog-header__avatar-img" />
                        ) : <div className="blog-header__avatar-grafic">
                            {result.blog.blog_caption[0]}
                        </div>}
                    </div>
                    <div className="blog-header__info">
                        <div className="blog-header__about">
                            <p className="blog-header__about-caption">{result.blog.blog_caption}<span className="blog-header__about-subscribes">{result.countSubscribers} подписчиков</span></p>
                            <Link to={`/users/${result.author.user_id}`} style={{ textDecoration: "none" }}>
                                <span className="blog-header__about-author">
                                    Автор: {result.author.user_login}
                                </span>
                            </Link>
                        </div>
                        <button className="blog-header__subscribe" onClick={() => changeSubscribe()}>
                            {result?.subscribedToBlog === true ? "Вы подписаны" : "Подписаться"}
                        </button>
                    </div>
                    <p className="blog-header__description">{result.blog.blog_description}</p>
                </header>
            ) : <p className="blog-loading">Загрузка...</p>
            }
            <ul className="blog-list">
                {result?.articlesOfBlog && result.articlesOfBlog.map(article => (
                    <ArticleItem article={article} />
                ))}
                {result?.articlesOfBlog.length !== 1 ? <p className="blog-list__none">Статей нету</p> : ""}
            </ul>
        </section >
    )
}

export default Blog;