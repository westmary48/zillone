import React, { Component } from 'react';
import 'firebase/auth';
import firebase from 'firebase/app';

import connection from '../helpers/data/connections';

import Auth from '../components/Auth/Auth';
import Listings from '../components/Listings/Listings';
import Building from '../components/Building/Building';
import ListingForm from '../components/ListingForm/ListingForm';
import MyNavbar from '../components/MyNavbar/MyNavbar';

import './App.scss';
import authRequest from '../helpers/data/authRequest';

class App extends Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    connection();
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
        });
      } else {
        this.setState({
          authed: false,
        });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  isAuthenticated = () => {
    this.setState({ authed: true });
  }

  render() {
    const logoutClickEvent = () => {
      authRequest.logoutUser();
      this.setState({ authed: false });
    };

    if (!this.state.authed) {
      return (
        <div className="App">
        <MyNavbar isAuthed={this.state.authed} logoutClickEvent={logoutClickEvent}/>
        <div className="row">
        <Auth isAuthenticated={this.isAuthenticated}/>
          </div>
          </div>
      );
    }
    return (
      <div className="App">
      <MyNavbar isAuthed={this.state.authed} logoutClickEvent={logoutClickEvent}/>
      <div className="row">
      <Listings />
      <Building />
      </div>
      <div className="row">
      <ListingForm />
      </div>
      </div>
    );
  }
}

export default App;
