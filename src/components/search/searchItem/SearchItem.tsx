import React, { FC } from "react";
import { IArticleItem, IBlogItem, IUserItem } from "../SearchTypes";

const SearchItem: FC<IUserItem | IBlogItem | IArticleItem> = (item) => {
    console.log(item);

    return (
        <div>
            <p>something...</p>
        </div>
    );
}

export default SearchItem;