import React, {Component} from 'react';
import sessionActions from '../../../actions/sessionActions';

import './accountInfo.scss';

export default class AccountInfo extends Component {

    render() {
        var userInfo = this.props.user.getBasicProfile();
        return (
            <div id="accountInfo">
                <h3 className="username">{userInfo.getName()}</h3>
                <span className="sign-out" onClick={() => sessionActions.signOutUser()}>Sign out</span>
            </div>)
    }
}