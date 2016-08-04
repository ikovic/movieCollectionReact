import React, {Component} from 'react';

export default class Root extends Component {
    constructor() {
        super();
        console.log('test');
    }

    render() {
        return (
            <div>
                <h1>Veliki test</h1>
                <p>Test testova svakakvih</p>
            </div>
        )
    }
};