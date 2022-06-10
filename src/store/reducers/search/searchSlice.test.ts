import { ISearchResultUser } from "../../types/Search";
import { searchData } from "./searchActions";
import searchSlice, { ISearchState } from "./searchSlice";

const initialState: ISearchState = {
  results: [],
  isLoading: false,
  error: "",
};

describe("Search Reducer - Searching", () => {
  test("Pending", () => {
    const action = { type: searchData.pending.type };
    const state = searchSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  test("Success", () => {
    const results: ISearchResultUser[] = [
      {
        user_id: 1,
        user_login: "testLogin",
        user_avatar: 1,
      },
    ];

    const action = { type: searchData.fulfilled.type, payload: results };
    const state = searchSlice(initialState, action);

    expect(state).toEqual({
      results: results,
      isLoading: false,
      error: "",
    });
  });

  test("Rejected", () => {
    const action = {
      type: searchData.rejected.type,
      payload: "Некорректное значение",
    };
    const state = searchSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      error: "Некорректное значение",
    });
  });
});
