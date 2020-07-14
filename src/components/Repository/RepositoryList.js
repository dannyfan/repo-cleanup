import React, { useState, useEffect } from "react";
import Repository from "./Repository";

const RepositoryList = (props) => {
    const [ publicList, setPublicList ] = useState({});
    const [ privateList, setPrivateList ] = useState({});

    useEffect(() => {
        const getRepoList = () => {
            const url = `https://api.github.com/user/repos?type=owner`;
            fetch(url, {
                method: 'GET',
                headers: {
                    "Authorization": `token ${props.token}`,
                    "Content-Type": 'application/json'
                },
            })
            .then(response => response.json())
            .then(data => {
                const getPrivate = Object.values(data).filter(repo => repo.private);
                const getPublic = Object.values(data).filter(repo => !repo.private);
                setPublicList(getPublic);
                setPrivateList(getPrivate);
            })
            .catch((err) => {
                console.log(err);
            })
        }
        getRepoList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (
        <div className="Repository-container columns">
            <div className="Repository-public column">
                <h1 className="title">Column <span className="tag is-info">Public</span></h1>
                <ul className="Repository-list">
                    {Object.values(publicList).map((val, key) => {
                        return (
                            <Repository key={ key } data={val}/>
                        )
                    })}
                </ul>
            </div>
            <div className="Repository-private column">
                <h1 className="title">Column <span className="tag is-dark">Private</span></h1>
                <ul className="Repository-list">
                    {Object.values(privateList).map((val, key) => {
                        return (
                            <Repository key={ key } data={val}/>
                        )
                    })}
                </ul>
            </div>
            <div className="Repository-delete column">
                <h1 className="title">Column <span className="tag is-danger">Delete</span></h1>
                <ul className="Repository-list">
                </ul>
            </div>
        </div>
    )
}

export default RepositoryList;