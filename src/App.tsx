import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Lending from "./components/lending/Lending";
import Login from "./components/login/Login";
import Menu from "./components/menu/Menu";
import NewsFeed from "./components/newsFeed/NewsFeed";
import Register from "./components/register/Register";
import { useAppDispatch, useAppSelector } from "./store/hooks/redux";
import { authUser } from "./store/reducers/userActions";

function App() {
  const { auth, isLoading } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authUser());
  }, []);

  return (
    <Router>
      {isLoading === false ? (
        !auth ? (
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Lending />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        ) : (
          <main>
            <Menu />
            <Routes>
              <Route path="/newsFeed" element={<NewsFeed />} />
              <Route path="*" element={<Navigate to="/newsFeed" />} />
            </Routes>
          </main>
        )
      ) : (
        <p className="app-loading">Загрузка...</p>
      )}
    </Router>
  );
}

export default App;
