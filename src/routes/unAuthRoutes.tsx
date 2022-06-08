import { Routes, Route, Navigate } from "react-router-dom";
import Register from "../components/register/Register";
import Login from "../components/login/Login";
import Lending from "../components/lending/Lending";

export const UnAuthedRoutes = () => {
    return (
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Lending />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    )
}

export default UnAuthedRoutes;