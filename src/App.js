import React from 'react';
import './App.css';
import Home from './pages/home'
import Logements from './pages/logements'
import Services from './pages/services'
import Emplois from './pages/emplois'
import Compte from './pages/mon-compte'
import Admin from './pages/admin'

import {Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Home}/>
      <Route exact path="/logements" component={Logements}/>
      <Route exact path="/services" component={Services}/>
      <Route exact path="/emplois" component={Emplois}/>
      <Route exact path="/mon-compte" component={Compte}/>
      <Route exact path="/admin" component={Admin}/>

    </div>
  );
}

export default App;
