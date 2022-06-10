import React, { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDebounce } from "../../hooks/useDebounce";
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux";
import { searchData } from "../../store/reducers/search/searchActions";
import { clearResults } from "../../store/reducers/search/searchSlice";
import { generateAvatar } from "../utils/avatarGenerate";
import "./Search.css";

const Search: FC = () => {
  const dispatch = useAppDispatch();

  const { results, isLoading } = useAppSelector((state) => state.searchReducer);

  const [debouncedValue, value, setValue] = useDebounce<string>("", 1000);

  const search = () => {
    dispatch(searchData(debouncedValue));
  };

  useEffect(() => {
    if (debouncedValue !== "") {
      search();
    } else if (debouncedValue === "") {
      clearFilter();
    }
  }, [debouncedValue]);

  const clearFilter = () => {
    setValue("");
    dispatch(clearResults());
  };

  return (
    <section className="search">
      <p className="search-title">Поиск пользователей</p>
      <input
        type="text"
        placeholder="Введите текст"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="search-input"
      />
      <ul className="search-results">
        {isLoading === false ? (
          results && results.length !== 0 ? (
            results.map(item => (
              <Link to={`/users/${item.user_id}`} key={item.user_id} className="search-result">
                <div className="search-result__element">
                  <div className="search-result__element-avatar" style={{
                    background: generateAvatar(item.user_avatar),
                  }}>{item.user_login[0].toUpperCase()}</div>
                  <p className="search-result__element-name">{item.user_login}</p>
                </div>
              </Link>
            ))
          ) : (
            ""
          )
        ) : (
          <p className="search-results__loading">Загрузка...</p>
        )}
      </ul>
    </section>
  );
};

export default Search;
