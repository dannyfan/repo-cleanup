import React from "react";

const Modal = (props) => {
    const actions = {
        true: `Are you sure you want to make <strong>${props.repo.name} private</strong>?`,
        false: `Are you sure you want to make <strong>${props.repo.name} public</strong>?`,
        delete: `Are you sure you want to <strong>delete ${props.repo.name}</strong>?`,
    };
    const actionText = actions[props.repo.action];
    return (
        <div className={`modal ${props.show ? "is-active" : ""}`}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Confirmation</p>
                    <button className="delete" aria-label="close"></button>
                </header>
                <section
                    className="modal-card-body"
                    dangerouslySetInnerHTML={{ __html: actionText }}
                ></section>
                <footer className="modal-card-foot">
                    <button
                        className="button is-success"
                        onClick={() => {
                            props.repo.callback(props.repo.method, "yes");
                        }}
                    >
                        Yes
                    </button>
                    <button
                        className="button"
                        onClick={() => {
                            props.repo.callback(props.repo.method, "no");
                        }}
                    >
                        No
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default Modal;
