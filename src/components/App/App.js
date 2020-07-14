import React, { useState } from 'react';
import Login from "../Login";
import RepositoryList from '../Repository';
import './App.css';

const App = () => {
  const [token, setToken] = useState("");

  return (
    <div className="App">
      <Login setToken={ setToken }/>
      { token && <RepositoryList token={ token }/> }
    </div>
  )
}

export default App;
