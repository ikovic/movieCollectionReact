import React, {Component} from 'react';
import collectionStore from '../../stores/collectionStore';
import Collection from './collection/collection';
import Search from './search/search';

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
            />)
        }
        return collections;
    }

    render() {
        return (
            <aside id="sidebar">
                <div className={"selected-collection " + (this.state.currentCollection ? '' : 'empty')}>
                    {this.state.currentCollection ?
                        <span>{this.state.currentCollection.google.name}</span>
                        :
                        null}
                </div>
                <Search />
                <ul>
                    {this.getCollections()}
                </ul>
            </aside>
        )
    }
};