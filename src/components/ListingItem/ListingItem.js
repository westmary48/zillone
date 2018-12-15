import React from 'react';
import PropTypes from 'prop-types';

import './ListingItem.scss';
import listingShape from '../../helpers/propz/listingShape';
import formatPrice from '../../helpers/formatPrice';
import authRequests from '../../helpers/data/authRequest';

class ListingItem extends React.Component {
    static propTypes = {
      listing: listingShape,
      deleteSingleListing: this.PropTypes.func,
    }

    deleteEvent = (e) => {
      e.preventDeault();
      const { deleteSingleListing, listing } = this.props;
      deleteSingleListing(listing.id);
    }

    render() {
      const { listing } = this.props;
      const uid = authRequests.getCurrentUid();

      const makeButtons = () => {
        if (listing.uid === uid) {
          return (
          <div>
            <span class Name = "col">
            <button className="btn btn-default" onClick={this.deleteEvent}>
            <i className="fas-trash-alt"></i>
            </button></span>
            </div>
          );
        }
        return <span className="col-2"></span>;
      };
      return (
<li className = "listing-item text-center">
    <span className="col-7">{listing.address}</span>
    <span className="col-3">{formatPrice(listing.price)}</span>
    {makeButtons()}
</li>
      );
    }
}

export default ListingItem;
