import React, {Component} from 'react';
import collectionActions from '../../../actions/collectionActions';

import './search.scss';

export default class Search extends Component {

    constructor() {
        super();

        this._onInputChange = this._onInputChange.bind(this);

        this.state = {
            title: ''
        };

        this.autocompleteTimeout = null;
    }

    // Unbind change listener
    componentWillUnmount() {
        if (this.autocompleteTimeout) {
            clearTimeout(this.autocompleteTimeout);
        }
    }

    _searchCollections(value) {
        if (value.length) {
            collectionActions.searchCollections(value);
        }
    }

    _onInputChange(event) {
        if (this.autocompleteTimeout) {
            clearTimeout(this.autocompleteTimeout);
        }
        this.autocompleteTimeout = setTimeout(() => this._searchCollections(this.state.title), 500);

        this.setState({
            title: event.target.value
        });
    }

    render() {
        return (
            <div id="collectionSearch">
                <label htmlFor="collectionTitle">Search collections</label>
                <input type="text" value={this.state.title} id="collectionTitle"
                       onChange={(event) => this._onInputChange(event)}/>
            </div>
        )
    }
};