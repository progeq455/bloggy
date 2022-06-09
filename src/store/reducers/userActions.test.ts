import { getUser, mockNetWorkResponse } from "../../helpers/mockData";
import { setupStore } from "../store";
import { authUser, loginUser, registerUser } from "./userActions";

describe("User Actions", () => {
  beforeAll(() => {
    mockNetWorkResponse();
  });

  test("Auth", async () => {
    const store = setupStore();
    const result = await store.dispatch(authUser());
    expect(result.type).toBe("user/auth/fulfilled");
    const user = result.payload;
    expect(user).toEqual(getUser.userParsed);
    const state = store.getState().userReducer;
    expect(state.user).toEqual(getUser.userParsed);
  });

  test("Login", async () => {
    const store = setupStore();
    const result = await store.dispatch(
      loginUser({ email: "test@email.com", password: "12345678" })
    );
    expect(result.type).toBe("user/login/fulfilled");
    const user = result.payload;
    expect(user).toEqual(getUser.userParsed);
    const state = store.getState().userReducer;
    expect(state.user).toEqual(getUser.userParsed);
  });

  test("Register", async () => {
    const store = setupStore();
    const result = await store.dispatch(
      registerUser({
        login: "testLogin",
        email: "test@email.com",
        password: "12345678",
      })
    );
    expect(result.type).toBe("user/register/fulfilled");
    const user = result.payload;
    expect(user).toEqual(getUser.userParsed);
    const state = store.getState().userReducer;
    expect(state.user).toEqual(getUser.userParsed);
  });
});
