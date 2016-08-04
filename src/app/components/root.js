import React, {Component} from 'react';

import './root.scss';

export default class Root extends Component {
    constructor() {
        super();
        console.log('test');
    }

    render() {
        return (
            <div id="root">
                <h1>Veliki test</h1>
                <p>Test testova svakakvih</p>
            </div>
        )
    }
};