import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';
import { Route } from "react-router-dom";
import { renderTestApp } from "../../helpers/renderTestApp";
import { mockNetWorkResponse, getUser } from "../../helpers/mockData";
import Login from "./Login";
import Register from "../register/Register";
import { setupStore } from "../../store/store";

describe('Login component', () => {
    beforeAll(() => {
        mockNetWorkResponse();
    })

    test("Typing form and login in", async () => {
        const store = setupStore();

        renderTestApp({
            route: "/login",
            routes: <Route path="/login" element={<Login />} />
        }, store);

        const form = screen.getByTestId("l-form");
        expect(form).toBeInTheDocument();

        userEvent.type(screen.getByPlaceholderText(/email/i), "test@email.com");
        expect(screen.getByPlaceholderText(/email/i)).toHaveValue("test@email.com");

        userEvent.type(screen.getByPlaceholderText(/Введите пароль/i), "12345678");
        expect(screen.getByPlaceholderText(/Введите пароль/i)).toHaveValue("12345678");

        userEvent.click(screen.getByTestId("l-button"));

        expect(screen.getByText(/загрузка/i)).toBeInTheDocument();
        expect(form).not.toBeInTheDocument();

        const expectedStateUser = getUser.userParsed;
        await waitFor(() => expect(store.getState().userReducer.user).toEqual(expectedStateUser), {
            timeout: 3000
        });
    });

    test("Change page to register", () => {
        const store = setupStore();

        renderTestApp({
            route: "/login",
            routes:
                <>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </>
        }, store);

        expect(screen.getByText(/Не зарегистрированы?/i)).toBeInTheDocument();
        userEvent.click(screen.getByText(/Не зарегистрированы?/i));

        expect(screen.getByTestId("register-page")).toBeInTheDocument();
    });
});