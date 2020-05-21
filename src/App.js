import React from 'react';
import {BrowserRouter as Router, 
        Route, 
        Switch,
        Redirect,
        useHistory,
        useLocation} from 'react-router-dom'
import {Helmet} from "react-helmet";
import Home from './pages/home'
import Logements from './pages/logements'
import Services from './pages/services'
import Emplois from './pages/emplois'
import Compte from './pages/mon-compte'
import Admin from './pages/admin'
import Annonces from './pages/annonces'
import AnnonceLogement from './templates/annonceLogement'
import SearchResults from './templates/searchResults'
import LogIn from './components/modalFormConnexion'

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
        <Route exact path="/logements" component={Logements}/>
        <Route exact path="/services" component={Services}/>
        <Route exact path="/emplois" component={Emplois}/>
        <Route exact path="/admin" component={Admin}/>
        <Route exact path="/annonces" component={Annonces}/>
        <Route path="/results/:req" component={SearchResults}/>
        <Route path="/logements/:id" component={AnnonceLogement}/>
        <PrivateRoute path="/mon-compte">
          <Compte/>
        </PrivateRoute>

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
export const Auth = {
  isAuthenticated: false,
  userid:null,
  authenticate(userid) {
    Auth.isAuthenticated = true;
    Auth.userid = userid
    //Auth.userid = 2
    setTimeout(console.log("Exécuté après 100 ms"), 100); // fake async
  },
  signout() {
    Auth.isAuthenticated = false;
    Auth.userid = null;
    setTimeout(console.log("Exécuté après 100 ms"), 100);
  }
};

export default App;
