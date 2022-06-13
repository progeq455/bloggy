import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';
import { Route } from "react-router-dom";
import { renderTestApp } from "../../helpers/renderTestApp";
import { mockNetWorkResponse, getUser } from "../../helpers/mockData";
import Login from "../login/Login";
import Register from "./Register";
import { setupStore } from "../../store/store";

describe('Register component', () => {
    beforeAll(() => {
        mockNetWorkResponse();
    });

    test("Typing form and register", async () => {
        const store = setupStore();

        renderTestApp({
            route: "/register",
            routes: <Route path="/register" element={<Register />} />
        }, store);

        const form = screen.getByTestId("r-form");
        expect(form).toBeInTheDocument();

        userEvent.type(screen.getByPlaceholderText(/задайте логин/i), "testLogin");
        expect(screen.getByPlaceholderText(/задайте логин/i)).toHaveValue("testLogin");

        userEvent.type(screen.getByPlaceholderText(/укажите свой email/i), "test@email.com");
        expect(screen.getByPlaceholderText(/укажите свой email/i)).toHaveValue("test@email.com");

        userEvent.type(screen.getByPlaceholderText(/надежный пароль/i), "12345678");
        expect(screen.getByPlaceholderText(/надежный пароль/i)).toHaveValue("12345678");

        userEvent.click(screen.getByTestId("r-button"));

        expect(screen.getByText(/загрузка/i)).toBeInTheDocument();
        expect(form).not.toBeInTheDocument();

        const expectedStateUser = getUser.userParsed;
        await waitFor(() => expect(store.getState().userReducer.user).toEqual(expectedStateUser), {
            timeout: 3000
        });
    });

    test("Change page to login", () => {
        const store = setupStore();

        renderTestApp({
            route: "/register",
            routes:
                <>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </>
        }, store);

        expect(screen.getByText(/уже зарегистрированы/i)).toBeInTheDocument();
        userEvent.click(screen.getByText(/уже зарегистрированы/i));

        expect(screen.getByTestId("login-page")).toBeInTheDocument();
    });
});