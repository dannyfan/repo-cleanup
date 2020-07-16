import React, { useState } from "react"
import netlify from 'netlify-auth-providers'

const Login = (props) => {
    const [ text, setText ] = useState("");
    const [ showButton, setShowButton ] = useState(true);

    const authenicateUser = () => {
        const authenticator = new netlify({
            site_id: process.env.REACT_APP_SITE_ID
        });
        const config = {
            provider: "github",
            scope: "repo, delete_repo, read:user"
        };
        authenticator.authenticate(config, function(err, data) {
            if (err) {
                setText(err);
                return
            }
            props.setToken(data.token);
            setShowButton(false);
        });
    }

    return showButton ? (
        <>
            <button className="button is-success" onClick={authenicateUser}>Login</button>
            <div>{text}</div>
        </>
    ) : null;
}

export default Login;