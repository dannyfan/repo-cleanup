import React, { useState } from 'react';
import Login from "../Login";
import './App.css';

const App = () => {
  const [user, setUser] = useState("");

  return (
    <div className="App">
      <Login setUser={ setUser }/>
      <div>{user}</div>
    </div>
  )
}

export default App;
