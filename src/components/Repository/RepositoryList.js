import React, { useState, useEffect } from "react";
import Repository from "./Repository";

const RepositoryList = (props) => {
    const [ repoList, setRepoList ] = useState({});

    const getRepoList = () => {
        const url = "https://api.github.com/user/repos?type=owner";
        const token = props.token;
        fetch(url, {
            method: 'GET',
            headers: {
                "Authorization": `token ${token}`,
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

    useEffect(() => {
        getRepoList();
    }, []);
    
    return (
        <div>{Object.values(repoList).map((val, key) => {
            return (
                <Repository key={ key } data={val}/>
            )
        })}</div>
    )
}

export default RepositoryList;