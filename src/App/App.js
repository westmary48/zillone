import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'firebase/auth';
import firebase from 'firebase/app';

import connection from '../helpers/data/connections';

import Auth from '../components/Auth/Auth';
import Listings from '../components/Listings/Listings';
import Building from '../components/Building/Building';
import ListingForm from '../components/ListingForm/ListingForm';
import MyNavbar from '../components/MyNavbar/MyNavbar';

import listingRequests from '../helpers/data/listingRequests';

import './App.scss';
import authRequest from '../helpers/data/authRequest';

class App extends Component {
  static PropTypes = {
    listings: PropTypes.arrayOf(PropTypes.object),
  }

  state = {
    authed: false,
    listings: [],
  }

  componentDidMount() {
    connection();

    listingRequests.getRequest()
      .then((listings) => {
        this.setState({ listings });
      })
      .catch(err => console.error('error with listing GET', err));

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

  deleteOne = (listingId) => {
    listingRequests.deleteListing(listingId)
      .then(() => {
        listingRequests.getRequest()
          .then((listings) => {
            this.setState({ listings });
          });
      })
      .catch(err => console.error('error with delete single', err));
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
      < Listings
      listings={this.state.listings}
      deleteSingleListing = {this.listingId}
      />
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
