import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header.js';
import SignIn from './components/SignIn.js';
import Registration from './components/Registration.js';
import Router from './Router.js'
import Main from './components/Main.js';


function App() {
  return (
    <div className="App">
      <Header/>
      <Main/>
    </div>
  );
}

export default App;
