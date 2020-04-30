import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './pages/home'
import Logements from './pages/logements'
import Compte from './pages/mon-compte'

function App() {
  return (
    <div className="App">
      <Home/>
      <Logements/>
      <Compte/>
    </div>
  );
}

export default App;
