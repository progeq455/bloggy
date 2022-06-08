import { Routes, Route, Navigate } from "react-router-dom";
import NewsFeed from "../components/newsFeed/NewsFeed";
import Search from "../components/search/Search";
import Blog from "../components/blog/Blog";

export const AuthedRoutes = () => {
    return (
        <Routes>
            <Route path="/newsFeed" element={<NewsFeed />} />
            <Route path="*" element={<Navigate to="/newsFeed" />} />
            <Route path="/search" element={<Search />} />
            <Route path="/blogs/:id" element={<Blog />} />
        </Routes>
    )
}

export default AuthedRoutes;