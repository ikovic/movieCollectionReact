import React, {Component} from 'react';
import sessionStore from '../../stores/sessionStore';
import sessionActions from '../../actions/sessionActions';

import './header.scss';

export default class Header extends Component {

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
                    <p onClick={() => sessionActions.signInUser()}>Sign in</p>
                </div>
            </header>
        )
    }
};