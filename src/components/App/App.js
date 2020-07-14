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
          <p>Authorize github login with the "login" button.</p>
          <Login setToken={ setToken }/>
          <p>Click make public/private or delete the repo on each repository. 
            <br/> 
          Or drag the repository to the appropiate column for an all at once action instead.
          </p>
        </div>
      </section>
      { token && <RepositoryList token={ token }/> }
    </div>
  )
}

export default App;
