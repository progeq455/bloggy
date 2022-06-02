import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { blogAPI } from "../../services/blogService";

const Blog: FC = () => {
    const { id } = useParams();
    const idBlog = Number(id);

    const dataQuery = {
        token: localStorage.token,
        id: idBlog,
    }

    const { data: result, isLoading, error } = blogAPI.useFetchAboutBlogQuery(dataQuery);

    return (
        <section className="blog">
            <header className="blog-header">
                <img src="" alt="" className="blog-header__banner" />
                <div className="blog-header__avatar">
                    <img src="" alt="" className="blog-header__avatar-img" />
                </div>
                <div className="blog-header__info">
                    <div className="blog-header__about">
                        <p className="blog-header__about-caption"></p>
                        <span className="blog-header__about-subscribes"></span>
                        <span className="blog-header__about-author"></span>
                    </div>
                    <button className="blog-header__subscribe"></button>
                </div>
                <p className="blog-header__description"></p>
            </header>
            <p className="blog-data">Материалы из этого блога</p>
            <ul className="blog-list">
                <li className="blog-list__elem">

                </li>
            </ul>
        </section>
    )
}

export default Blog;