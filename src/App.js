import React from 'react';
import {Route, 
        Switch,
        Redirect} from 'react-router-dom'
import {Helmet} from "react-helmet";
import Home from './pages/home'
import Compte from './pages/mon-compte'
import Admin from './pages/admin'
import Annonces from './pages/annonces'
import AnnonceLogement from './templates/annonceLogement'
import AnnonceEmploi from './templates/annonceEmplois'
import AnnonceService from './templates/annonceService'
import SearchResults from './templates/searchResults'
import LogIn from './components/FormLogin'
import Axios from 'axios';

const API= require(`./API.js`)

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
        <Route exact path="/login" component={LogIn}/>
        <Route exact path="/annonces" component={Annonces}/>
        <Route path="/results/:req" component={SearchResults}/>
        <Route path="/logement/:id" component={AnnonceLogement}/>
        <Route path="/emploi/:id" component={AnnonceEmploi}/>
        <Route path="/service/:id" component={AnnonceService}/>

        <PrivateRoute path="/mon-compte">
          <Compte/>
        </PrivateRoute>

        <PrivateRouteAdmin path="/admin">
          <Admin/>
        </PrivateRouteAdmin>

      </Switch>      
    </div>
  );
}

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        Auth.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

function PrivateRouteAdmin({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        Auth.isAdmin ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export const Auth = {
  isAuthenticated: false,
  userid:null,
  isAdmin: null,
  authenticate(userid) {
    Auth.isAuthenticated = true;
    Auth.userid = userid
    Axios.get(`${API.urlUtilisateurs}/${Auth.userid}${API.urlAdmin}`)
      .then((response) => {
        response.data===true ? Auth.isAdmin=true : Auth.isAdmin=false
      })
    setTimeout(console.log("Exécuté après 100 ms"), 100); 
  },
  signout() {
    Auth.isAuthenticated = false;
    Auth.userid = null;
    Auth.isAdmin= false;
    setTimeout(console.log("Exécuté après 100 ms"), 100);
  }
};

export default App;
