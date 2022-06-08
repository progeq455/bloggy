import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { setupStore } from "../../store/store";
import Lending from "./Lending";
import Login from "../login/Login";

describe("Lending component", () => {
  test("Renders", () => {
    const lending = render(
      <MemoryRouter>
        <Lending />
      </MemoryRouter>
    );
    expect(lending.getByTestId("l-title")).toBeInTheDocument();
    expect(lending.getByTestId("l-desc")).toBeInTheDocument();
    expect(lending.getByTestId("l-login")).toBeInTheDocument();
  });

  test("Login link from lending is working", () => {
    const store = setupStore();

    const lending = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<Lending />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </MemoryRouter>
      </Provider>);
    const link = lending.getByTestId("l-login");
    userEvent.click(link);
    expect(screen.getByTestId("login-page")).toBeInTheDocument();
  });
});
