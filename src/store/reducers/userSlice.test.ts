import { IUser } from "../types/User";
import { authUser, loginUser, registerUser } from "./userActions";
import userSlice, { AuthState } from "./userSlice";

const initialState: AuthState = {
  user: {},
  auth: false,
  isLoading: false,
  errorRegister: "",
  errorLogin: "",
};

describe("User Reducer - Auth", () => {
  test("Pending", () => {
    const action = { type: authUser.pending.type };
    const state = userSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  test("Success", () => {
    const user: IUser = {
      id: 1,
      login: "testLogin",
      email: "test@mail.ru",
      avatar: 1,
    };

    const action = { type: authUser.fulfilled.type, payload: user };
    const state = userSlice(initialState, action);

    expect(state).toEqual({
      user: user,
      auth: true,
      isLoading: false,
      errorRegister: "",
      errorLogin: "",
    });
  });

  test("Rejected", () => {
    const action = {
      type: authUser.rejected.type,
      payload: "Неправильный Email или пароль",
    };
    const state = userSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      errorLogin: "Неправильный Email или пароль",
    });
  });
});

describe("User Reducer - Login", () => {
  test("Pending", () => {
    const action = { type: loginUser.pending.type };
    const state = userSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  test("Success", () => {
    const user: IUser = {
      id: 1,
      login: "testLogin",
      email: "test@mail.ru",
      avatar: 1,
    };

    const action = { type: loginUser.fulfilled.type, payload: user };
    const state = userSlice(initialState, action);

    expect(state).toEqual({
      user: user,
      auth: true,
      isLoading: false,
      errorRegister: "",
      errorLogin: "",
    });
  });

  test("Rejected", () => {
    const action = {
      type: loginUser.rejected.type,
      payload: "Неправильный Email или пароль",
    };
    const state = userSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      errorLogin: "Неправильный Email или пароль",
    });
  });
});

describe("User Reducer - Register", () => {
  test("Pending", () => {
    const action = { type: registerUser.pending.type };
    const state = userSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  test("Success", () => {
    const user: IUser = {
      id: 1,
      login: "testLogin",
      email: "test@mail.ru",
      avatar: 1,
    };

    const action = { type: registerUser.fulfilled.type, payload: user };
    const state = userSlice(initialState, action);

    expect(state).toEqual({
      user: user,
      auth: true,
      isLoading: false,
      errorRegister: "",
      errorLogin: "",
    });
  });

  test("Rejected", () => {
    const action = {
      type: registerUser.rejected.type,
      payload: "Пользователь с таким Email уже зарегистрирован",
    };
    const state = userSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      errorRegister: "Пользователь с таким Email уже зарегистрирован",
    });
  });
});
