import {
  getResults,
  mockNetWorkResponseSearch,
} from "../../../helpers/mockDataSearch";
import { setupStore } from "../../store";
import { searchData } from "./searchActions";

describe("Search Action", () => {
  beforeAll(() => {
    mockNetWorkResponseSearch();
  });

  test("Search User", async () => {
    const store = setupStore();
    const result = await store.dispatch(searchData("testLogin"));
    expect(result.type).toBe("search/fulfilled");
    const results = result.payload;
    expect(results).toEqual(getResults);
    const state = store.getState().searchReducer;
    expect(state.results).toEqual(getResults);
  });
});
