import React, {Component} from 'react';
import collectionStore from '../../stores/collectionStore';

import './sidebar.scss';

export default class Sidebar extends Component {

    constructor() {
        super();

        this.onChange = this.onChange.bind(this);

        this.state = {
            collections: [],
            currentCollection: null
        }
    }

    onChange() {
        this.setState({
                collections: collectionStore.getCollections(),
                currentCollection: collectionStore.getCurrentCollection()
            }
        );
    }

    componentDidMount() {
        collectionStore.addChangeListener(this.onChange);
    }

    componentWillUnmount() {
        collectionStore.removeChangeListener(this.onChange);
    }

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