import React, {Component} from 'react';
import sessionActions from '../../../actions/sessionActions';

import './accountInfo.scss';

export default class AccountInfo extends Component {

    componentDidMount() {

    }


    render() {
        var userInfo = this.props.user.getBasicProfile();
        return (
            <div id="accountInfo">
                <span>{userInfo.getName()}</span>
                <span onClick={() => sessionActions.signOutUser()}>Sign out</span>

            </div>)
    }
}