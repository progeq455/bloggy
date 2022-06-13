import { fireEvent, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import { Route } from "react-router-dom";
import { renderTestApp } from "../../helpers/renderTestApp";
import Search from "./Search";
import { mockNetWorkResponseSearch } from "../../helpers/mockDataSearch";
import { setupStore } from "../../store/store";

describe("Search component", () => {
    beforeAll(() => {
        mockNetWorkResponseSearch();
    });

    test("Searching users after typing and show results", async () => {
        const store = setupStore();

        renderTestApp({
            route: "/search",
            routes: <Route path="/search" element={<Search />} />
        }, store);

        const input = screen.getByPlaceholderText(/введите текст/i);
        expect(screen.queryByTestId("s-results")).toContainHTML("");

        fireEvent.input(input, {
            target: { value: "testLogin" },
        });
        expect(input).toHaveValue("testLogin");

        await waitFor(() => expect(screen.getByTestId("s-result-elem")), {
            timeout: 2000
        });

        fireEvent.input(input, {
            target: { value: "" },
        });
        expect(input).toHaveValue("");

        await waitFor(() => expect(screen.getByTestId("s-results")).toBeEmptyDOMElement(), {
            timeout: 2000
        });
    });
})