import React from 'react';
import {Route, Switch} from 'react-router-dom'

import Home from './pages/home'
import Logements from './pages/logements'
import Services from './pages/services'
import Emplois from './pages/emplois'
import Compte from './pages/mon-compte'
import Admin from './pages/admin'
import Inscription from './pages/inscription'
import AnnonceLogement from './templates/annonceLogement'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/logements" component={Logements}/>
        <Route exact path="/services" component={Services}/>
        <Route exact path="/emplois" component={Emplois}/>
        <Route exact path="/mon-compte" component={Compte}/>
        <Route exact path="/admin" component={Admin}/>
        <Route exact path="/inscription" component={Inscription}/>
        <Route path="/logements/:id" component={AnnonceLogement}/>
      </Switch>      
    </div>
  );
}

export default App;
