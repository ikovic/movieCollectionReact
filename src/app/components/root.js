import React, {Component} from 'react';
import Header from './header/header';
import Sidebar from './sidebar/sidebar';

import './root.scss';

export default class Root extends Component {
    render() {
        return (
            <div id="root">
                <Header />
                <Sidebar />
            </div>
        )
    }
};