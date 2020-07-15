import React, { useState } from 'react';
import Login from "../Login";
import RepositoryList from '../Repository';
import "bulma/css/bulma.css";

const App = () => {
  const [token, setToken] = useState("");

  return (
    <div className="App">
      <section className="section">
        <div className="container">
          <h1 className="title">Instructions</h1>
          <p>Authorize github login with the "login" button to see all your repositories at once.
            <br/>
            <strong>Available actions: </strong> Make private repository to public, make public repository to private, delete repository.
          </p>
          <Login setToken={ setToken }/>
        </div>
      </section>
      { token && <RepositoryList token={ token }/> }
    </div>
  )
}

export default App;
