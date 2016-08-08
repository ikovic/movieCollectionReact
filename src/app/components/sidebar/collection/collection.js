import React, {Component} from 'react';

export default class Collection extends Component {
    render() {
        if (this.props.collection) {
            return (<li className={this.props.isSelected ? 'selected' : ''}>{this.props.collection.google.name}</li>);
        } else {
            return null;
        }
    }
}