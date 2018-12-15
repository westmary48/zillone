import React from 'react';
import PropTypes from 'prop-types';
import './Listings.scss';
import listingShape from '../../helpers/propz/listingShape';
import ListingItem from '../ListingItem/ListingItem';

class Listings extends React.Component {
  static PropTypes = {
    listings: PropTypes.arrayOf(listingShape),
    deleteSingleListing: PropTypes.func,
  }

  render() {
    const { listings, deleteSingleListing } = this.props;
    const listingsItemComponents = listings.map(listing => (
    <ListingItem
    listing = {listing}
    key= {listing.id}
    deleteSingleListing = {deleteSingleListing}
    />
    ));
    return (
            <div className = "listings col">
            <h2>Listings</h2>
            <ul>{listingsItemComponents}</ul>
            </div>
    );
  }
}

export default Listings;
