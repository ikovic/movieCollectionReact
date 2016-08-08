import React, {Component} from 'react';
import collectionStore from '../../stores/collectionStore';
import Collection from './collection/collection';

import './sidebar.scss';

export default class Sidebar extends Component {

    constructor() {
        super();

        this.onChange = this.onChange.bind(this);
        this.getCollections = this.getCollections.bind(this);

        this.state = {
            collections: collectionStore.getCollections(),
            currentCollection: collectionStore.getCurrentCollection()
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

    getCollections() {
        var collections = [];
        for (let collection of this.state.collections) {
            collections.push(<Collection collection={collection}
                                         key={collection._id}
                                         isSelected={this.state.currentCollection && collection._id === this.state.currentCollection._id}/>)
        }
        return collections;
    }

    render() {
        return (
            <aside id="sidebar">
                <ul>
                    {this.getCollections()}
                </ul>
            </aside>
        )
    }
};