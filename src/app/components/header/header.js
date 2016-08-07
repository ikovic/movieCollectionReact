import React, {Component} from 'react';
import sessionStore from '../../stores/sessionStore';
import sessionActions from '../../actions/sessionActions';
import GoogleLogin from 'react-google-login';

import './header.scss';

export default class Header extends Component {

    responseGoogle(googleUser) {
        console.dir(googleUser);

        // The ID token you need to pass to your backend:
        var id_token = googleUser.getAuthResponse().id_token;
        console.log("ID Token: " + id_token);
    }

    onChange() {
        console.log('change');
    }

    componentDidMount() {
        sessionStore.addChangeListener(this.onChange);
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
                    <GoogleLogin
                        clientId="103058587609-srk6qkhe6hegud2a23g4n29d34hj07fi.apps.googleusercontent.com"
                        buttonText="Sign in With Google"
                        cssClass="google-sign-in default"
                        callback={(response) => this.responseGoogle(response)}
                    />
                </div>
            </header>
        )
    }
};