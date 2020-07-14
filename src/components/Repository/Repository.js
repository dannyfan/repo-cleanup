import React from "react";

const Repository = (props) => {
    console.log(props);
    return (
        <div className="Repository">
            <h1>{props.data.name}</h1>
            <a href={props.data.html_url}>Link</a>
        </div>
    )
}

export default Repository;