import React, { useState } from "react";
import "./Repository.css";

const Repository = (props) => {
    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const user = props.data.owner.login;
    const name = props.data.name;
    const [isPrivate, setIsPrivate] = useState(props.data.private);
    const tag = isPrivate ? (
        <span className="tag is-dark">Private</span>
    ) : (
        <span className="tag is-light">Public</span>
    );
    const createdAt = formatDate(props.data.created_at);
    const updatedAt = formatDate(props.data.updated_at);
    const url = `https://api.github.com/repos/${user}/${name}`;

    const changeRepoToPrivate = (confirmAction) => {
        const confirm = confirmAction === "yes";
        const declined = confirmAction === "no";

        if (confirm) {
            fetch(url, {
                method: "PATCH",
                headers: {
                    Authorization: `token ${props.token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    private: !isPrivate,
                }),
            }).then((data) => {
                setIsPrivate(!isPrivate);
                props.setShowModal(false);
            }).catch((err) => {
                console.log(err);
            });
        } else if (declined) {
            props.setShowModal(false);
        } else {
            props.setSelectedRepo({
                name: name,
                action: !isPrivate,
                callback: changeRepoToPrivate,
            });
            props.setShowModal(true);
        }
    };

    const deleteRepo = () => {
        fetch(url, {
            method: "DELETE",
            headers: {
                Authorization: `token ${props.token}`,
                "Content-Type": "application/json",
            },
        })
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="Repository card">
            <header className="card-header">
                <p className="card-header-title">{name}</p>
                <span className="tag is-info">{props.data.language}</span>
                {tag}
            </header>
            <div className="card-content">
                <div className="content">
                    <time dateTime={createdAt}>Created At: {createdAt}</time>
                    <br />
                    <time dateTime={updatedAt}>Last update: {updatedAt}</time>
                    <br />
                    <strong>{props.data.description}</strong>
                </div>
            </div>
            <footer className="card-footer">
                <button
                    className={`button ${isPrivate ? "is-light" : "is-dark"}`}
                    onClick={() => changeRepoToPrivate()}
                >
                    {isPrivate ? "Make Public" : "Make Private"}
                </button>
                <button
                    className="button is-danger"
                    onClick={() => deleteRepo()}
                >
                    Delete
                </button>
                <a
                    className="card-footer-item"
                    href={props.data.html_url}
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    See Repository
                </a>
            </footer>
        </div>
    );
};

export default Repository;
