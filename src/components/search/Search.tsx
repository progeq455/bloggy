import React, { FC, useState, useEffect } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux";
import { searchData } from "../../store/reducers/search/searchActions";
import { clearResults } from "../../store/reducers/search/searchSlice";
import SearchItem from "./searchItem/SearchItem";

const Search: FC = () => {
  const dispatch = useAppDispatch();

  const { results, isLoading } = useAppSelector((state) => state.searchReducer);

  const [debouncedValue, value, setValue] = useDebounce<string>("", 1000);
  const [searchFilter, setSearchFilter] = useState<string>("users");

  const search = () => {
    dispatch(searchData({ filter: searchFilter, query: debouncedValue }));
  };

  useEffect(() => {
    if (debouncedValue !== "" && searchFilter !== "") {
      search();
    } else if (debouncedValue === "") {
      clearFilter();
    }
  }, [debouncedValue]);

  const clearFilter = () => {
    setValue("");
    setSearchFilter("users");
    dispatch(clearResults());
  };

  return (
    <section className="search">
      <p className="search-title">Поиск</p>
      <input
        type="text"
        placeholder="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="search-input"
      />
      <select onChange={(e) => setSearchFilter(e.target.value)} className="search-filter">
        <option value="users" selected className="search-filter__option">
          пользователям
        </option>
        <option value="blogs" className="search-filter__option">блогам</option>
        <option value="articles" className="search-filter__option">статьям</option>
      </select>
      {debouncedValue && searchFilter ? (
        <button onClick={() => clearFilter()} className="search-clear">Очистить</button>
      ) : (
        ""
      )}
      <ul className="search-results">
        {isLoading === false ? (
          results && results.length !== 0 ? (
            results.map((item) => <SearchItem />)
          ) : (
            <p className="search-results__none">Результатов нет</p>
          )
        ) : (
          <p className="search-resutls__loading">Загрузка...</p>
        )}
      </ul>
    </section>
  );
};

export default Search;
