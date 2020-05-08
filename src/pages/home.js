import React, { Component } from 'react';
import MyNavbar from '../components/navbar'
import Banner from '../components/banner'
import {Helmet} from "react-helmet";

class Home extends Component {
  render() {
    const titre = "Home";
    const description = "Bienvenue sur home7home.";
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Home7Home | {titre}</title>
          <meta name="description" content={description} />
        </Helmet>
        <MyNavbar></MyNavbar>
        <Banner titre={titre} description={description}></Banner>
        
      </div>
    )
  }
}

export default Home;
