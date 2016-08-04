import React, {Component} from 'react';
import Header from './header/header';
import Sidebar from './sidebar/sidebar';
import Movies from './movies/movies';

import './root.scss';

export default class Root extends Component {
    render() {
        return (
            <div id="root">
                <Header />
                <Sidebar />
                <Movies />
            </div>
        )
    }
};