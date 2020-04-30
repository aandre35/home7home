import React, { Component } from 'react';
import MyNavbar from '../components/navbar'
import Banner from '../components/banner'

class Home extends Component {
  render() {
    const titre = "Home";
    const description = "Bienvenue sur home7home.";
    return (
      <div>
        <MyNavbar></MyNavbar>
        <Banner titre={titre} description={description}></Banner>
        
      </div>
    )
  }
}

export default Home;
