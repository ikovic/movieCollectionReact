import React, {Component} from 'react';
import GoogleLogin from 'react-google-login';
import AccountInfo from './accountInfo/accountInfo';
import sessionStore from '../../stores/sessionStore';
import sessionActions from '../../actions/sessionActions';

import './header.scss';

export default class Header extends Component {

    constructor() {
        super();

        this.onChange = this.onChange.bind(this);

        this.state = {
            user: sessionStore.getActiveUser()
        };
    }

    onChange() {
        this.setState({user: sessionStore.getActiveUser()});
    }

    componentDidMount() {
        sessionStore.addChangeListener(this.onChange);

        gapi.signin2.render('g-signin2', {
            'scope': 'https://www.googleapis.com/auth/plus.profile.emails.read',
            'width': 150,
            'height': 40,
            'longtitle': false,
            'theme': 'dark',
            'onsuccess': sessionActions.signInUser
        });

    }

    componentWillUnmount() {
        sessionStore.removeChangeListener(this.onChange);
    }

    render() {
        return (
            <header id="header">
                <img className="logo"
                     src={require('../../../../public/images/logo.png')}/>
                <div className="account">
                    {this.state.user ?
                        <AccountInfo user={this.state.user}/>
                        :
                        null}
                    <div id="g-signin2" className={"google-sign-in " + (this.state.user ? 'hidden' : '')}
                         data-onsuccess="onSignIn" data-onload="true"></div>
                </div>
            </header>
        )
    }
};