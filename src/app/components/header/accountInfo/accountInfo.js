import React, {Component} from 'react';

import './accountInfo.scss';

export default class AccountInfo extends Component {

    render() {
        var userInfo = this.props.user.getBasicProfile();
        return (
            <div id="accountInfo">
                <p>{userInfo.getName()}</p>
            </div>)
    }
}