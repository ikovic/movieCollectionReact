import React, {Component} from 'react';
import sessionStore from '../../../stores/sessionStore';
import Ajax from '../../../utility/ajax';

import './accountInfo.scss';

export default class AccountInfo extends Component {

    componentDidMount() {
        let token = sessionStore.getAccessToken();
        var ajax = new Ajax('/api/movie',
            (res) => console.dir(res),
            (status, res) => console.dir(res),
            token
        );
        ajax.get();
    }

    render() {
        var userInfo = this.props.user.getBasicProfile();
        return (
            <div id="accountInfo">
                <p>{userInfo.getName()}</p>
            </div>)
    }
}