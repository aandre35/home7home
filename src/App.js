import React from 'react';
import {Route, Switch} from 'react-router-dom'
import {Helmet} from "react-helmet";
import Home from './pages/home'
import Logements from './pages/logements'
import Services from './pages/services'
import Emplois from './pages/emplois'
import Compte from './pages/mon-compte'
import Admin from './pages/admin'
import AnnonceLogement from './templates/annonceLogement'

function App() {
  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home7Home</title>
        <meta name="description" content="Helmet application" />
      </Helmet>

      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/logements" component={Logements}/>
        <Route exact path="/services" component={Services}/>
        <Route exact path="/emplois" component={Emplois}/>
        <Route exact path="/mon-compte" component={Compte}/>
        <Route exact path="/admin" component={Admin}/>
        <Route path="/logements/:id" component={AnnonceLogement}/>
      </Switch>      
    </div>
  );
}

export default App;
