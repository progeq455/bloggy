import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./store/hooks/redux";
import { authUser } from "./store/reducers/userActions";
import UnAuthedRoutes from "./routes/unAuthRoutes";
import AuthedRoutes from "./routes/AuthedRoutes";
import Menu from "./components/menu/Menu";
import "./App.css";

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
          <UnAuthedRoutes />
        ) : (
          <main>
            <Menu />
            <AuthedRoutes />
          </main>
        )
      ) : (
        <p className="app-loading">Загрузка...</p>
      )}
    </Router>
  );
}

export default App;
