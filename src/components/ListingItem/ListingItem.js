import React from 'react';

import './ListingItem.scss';
import listingShape from '../../helpers/propz/listingShape';
import formatPrice from '../../helpers/formatPrice';
import authRequests from '../../helpers/data/authRequest';

class ListingItem extends React.Component {
    static propTypes = {
      listing: listingShape,
    }

    render() {
      const { listing } = this.props;
      const uid = authRequests.getCurrentUid();

      const makeButtons = () => {
        if (listing.uid === uid) {
          return (
          <div>
            <span class Name = "col">
            <button className="btn btn-default">
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