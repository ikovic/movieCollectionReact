import React, {Component} from 'react';

import './header.scss';

export default class Header extends Component {
    render() {
        return (
            <header id="header">
                <h1 className="title">
                    movieCollection
                </h1>
                <div className="account">
                    <p>Sign in</p>
                </div>
            </header>
        )
    }
};