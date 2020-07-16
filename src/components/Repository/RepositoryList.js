import React, { useState, useEffect } from "react";
import Modal from "../Modal";
import Repository from "./Repository";

const RepositoryList = (props) => {
    const [repoList, setRepoList] = useState({});
    const [selectedRepo, setSelectedRepo] = useState({
        name: "",
        action: "",
    });
    const [confirmAction, setConfirmAction] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const getRepoList = () => {
            const url = `https://api.github.com/user/repos?type=owner`;
            fetch(url, {
                method: "GET",
                headers: {
                    Authorization: `token ${props.token}`,
                    "Content-Type": "application/json",
                },
            })
                .then((response) => response.json())
                .then((data) => setRepoList(data))
                .catch((err) => {
                    console.log(err);
                });
        };
        getRepoList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="Repository-container">
            {Object.values(repoList).map((val, key) => {
                return (
                    <Repository
                        key={key}
                        data={val}
                        token={props.token}
                        setSelectedRepo={setSelectedRepo}
                        setShowModal={setShowModal}
                        showModal={showModal}
                        confirmAction={confirmAction}
                    />
                );
            })}
            <Modal
                repo={selectedRepo}
                show={showModal}
                setConfirmAction={setConfirmAction}
            />
        </div>
    );
};

export default RepositoryList;
