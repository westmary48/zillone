import React from 'react';
import './Auth.scss';
import authRequests from '../../helpers/data/authRequest';

class Auth extends React.Component {
  authenticateUser = (e) => {
    e.preventDefault();
    authRequests.authenticate().then(() => {
      this.props.isAuthenticated();
    }).catch(err => console.error('there was an error with aut', err));
  }

  render() {
    return (
            <div className="Auth">
                <button className="btn btn-danger" onClick={this.authenticateUser}>Login</button>
            </div>
    );
  }
}

export default Auth;
