import React, {Component} from 'react';
import collectionActions from '../../../actions/collectionActions';

export default class Collection extends Component {

    constructor() {
        super();

        this.selectCollection = this.selectCollection.bind(this);
    }

    selectCollection() {
        collectionActions.selectCollection(this.props.collection);
    }


    render() {
        if (this.props.collection) {
            return (
                <li className={this.props.isSelected ? 'selected' : ''}
                    onClick={() => this.selectCollection()}
                >{this.props.collection.google.name}</li>);
        } else {
            return null;
        }
    }
}