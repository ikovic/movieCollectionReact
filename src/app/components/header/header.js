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
            user: null
        };
    }

    onChange() {
        this.setState({user: sessionStore.getActiveUser()});
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
                    {this.state.user ?
                        <AccountInfo user={this.state.user}/>
                        :
                        <GoogleLogin
                            clientId="103058587609-srk6qkhe6hegud2a23g4n29d34hj07fi.apps.googleusercontent.com"
                            buttonText="Sign in With Google"
                            cssClass="btn google-sign-in"
                            scope="https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read"
                            callback={(googleUser) => sessionActions.signInUser(googleUser)}
                        />
                    }
                </div>
            </header>
        )
    }
};