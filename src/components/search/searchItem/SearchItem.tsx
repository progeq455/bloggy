import React, { FC } from "react";

interface IItemProps {
    type: string;
}

const SearchItem: FC<IItemProps> = ({ type }) => {
    if (type === "blogs") {
        return (
            <div>blog</div>
        )
    } else if (type === "article") {
        return (
            <div>article</div>
        )
    }

    return (
        <div>
            user
        </div>
    )
}

export default SearchItem;