import React, {Component} from 'react';

import './sidebar.scss';

export default class Sidebar extends Component {
    render() {
        return (
            <aside id="sidebar">
                <ul>
                    <li>Random Link</li>
                    <li>Random Link</li>
                    <li>Random Link</li>
                    <li className="selected">Random Link</li>
                    <li>Random Link</li>
                    <li>Random Link</li>
                </ul>
            </aside>
        )
    }
};