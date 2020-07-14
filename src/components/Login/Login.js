import React, { useState } from "react"
import netlify from "netlify-auth-providers"

const Login = (props) => {
    const [ text, setText ] = useState("");
    const authenicateUser = () => {
        const authenticator = new netlify.default ({});
        authenticator.authenticate({provider:"github", scope: "user"}, function(err, data) {
            if (err) {
                setText(err);
                return
            }
            setText(data.token);
        });
        props.setUser("danny");
        console.log("Should login");
    }
    return (
        <>
            <button onClick={authenicateUser}>Login</button>
            <div>{text}</div>
        </>
    )
}

export default Login;