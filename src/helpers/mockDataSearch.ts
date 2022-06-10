import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { API_URL } from "../config";
import { ISearchResultUser } from "../store/types/Search";

const getResults: ISearchResultUser[] = [
  {
    user_id: 1,
    user_login: "testLogin",
    user_avatar: 1,
  },
];

const mockNetWorkResponseSearch = () => {
  const mock = new MockAdapter(axios);
  mock.onGet(`${API_URL}/search/users?query=testLogin`).reply(200, getResults);
};

export { mockNetWorkResponseSearch, getResults };
