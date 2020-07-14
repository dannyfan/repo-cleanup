import React, { useState, useEffect } from "react";
import Repository from "./Repository";

const RepositoryList = (props) => {
    const [ repoList, setRepoList ] = useState({});

    useEffect(() => {
        const getRepoList = () => {
            const url = "https://api.github.com/user/repos?type=owner";
            fetch(url, {
                method: 'GET',
                headers: {
                    "Authorization": `token ${props.token}`,
                    "Content-Type": 'application/json'
                },
            })
            .then(response => response.json())
            .then(data => {
                setRepoList(data);
            })
            .catch((err) => {
                console.log(err);
            })
        }
        getRepoList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (
        <div className="Repository-list">{Object.values(repoList).map((val, key) => {
            return (
                <Repository key={ key } data={val}/>
            )
        })}</div>
    )
}

export default RepositoryList;