import React, {Component} from 'react';

import './sidebar.scss';

export default class Sidebar extends Component {
    render() {
        return (
            <aside id="sidebar">
                <h4>Pick a collection: </h4>
                <ul>
                    <li>Random Link</li>
                    <li>Random Link</li>
                    <li>Random Link</li>
                    <li>Random Link</li>
                    <li>Random Link</li>
                    <li>Random Link</li>
                </ul>
            </aside>
        )
    }
};