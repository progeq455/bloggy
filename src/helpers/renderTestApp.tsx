import { Provider } from "react-redux";
import { MemoryRouter, Routes } from "react-router-dom";
import { render } from "@testing-library/react";

interface IOptions {
    route: string;
    routes: any;
}

export const renderTestApp = (options: IOptions, store: any) => {

    return (
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={[options?.route]}>
                    <Routes>
                        {options?.routes}
                    </Routes>
                </MemoryRouter>
            </Provider>
        )
    );
}; 