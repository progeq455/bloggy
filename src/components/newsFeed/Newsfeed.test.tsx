import { screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import { Route } from "react-router-dom";
import { renderTestApp } from "../../helpers/renderTestApp";
import NewsFeed from "./NewsFeed";
import { setupStore } from "../../store/store";
import { server } from "../../mocks/server";

describe("NewsFeed component", () => {
    beforeAll(() => server.listen());

    afterEach(() => server.resetHandlers());

    afterAll(() => server.close());

    test("Renders and load the blogs, articles", async () => {
        const store = setupStore();

        renderTestApp({
            route: "/newsfeed",
            routes: <Route path="/newsfeed" element={<NewsFeed />} />
        }, store);

        expect(screen.getByTestId("newsfeed-page")).toBeInTheDocument();
        expect(screen.getByTestId("f-subs")).toBeInTheDocument();
        expect(screen.getByTestId("f-articles")).toBeInTheDocument();

        const loadings = screen.getAllByText(/загрузка/i);
        expect(loadings).toHaveLength(2);
        // проверка отображения с сервера блогов и статей, переадресации на подписки, на статью, на блог?
    });
})