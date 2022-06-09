import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { API_URL } from "../config";
import { IUserVerify } from "../store/types/User";

const getUser: IUserVerify = {
  userParsed: { id: 1, login: "testLogin", email: "test@email.com", avatar: 1 },
  jwtToken: "token",
};

const mockNetWorkResponse = () => {
  const mock = new MockAdapter(axios);
  mock.onPost(`${API_URL}/verify`).reply(200, getUser);
  mock.onPost(`${API_URL}/login`).reply(200, getUser);
  mock.onPost(`${API_URL}/register`).reply(200, getUser);
};

export { mockNetWorkResponse, getUser };
