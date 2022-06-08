import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { setupStore } from "../store/store";
import AuthedRoutes from "../routes/AuthedRoutes";
import UnAuthedRoutes from "../routes/unAuthRoutes";

interface IOptions {
  authRoutes: boolean,
  initialRoute: string;
}

export const renderTestApp = (component: any, options: IOptions) => {
  const store = setupStore();

  return (
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[options?.initialRoute]}>
          {options?.authRoutes === true ? <AuthedRoutes /> : <UnAuthedRoutes />}
          {component}
        </MemoryRouter>
      </Provider>
    )
  );
}; 