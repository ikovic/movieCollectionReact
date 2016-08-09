import React, {Component} from 'react';
import sessionActions from '../../../actions/sessionActions';
import sessionStore from '../../../stores/sessionStore';
import collectionStore from '../../../stores/collectionStore';
import modalActions from '../../../actions/modalActions';

import './accountInfo.scss';

export default class AccountInfo extends Component {


    constructor() {
        super();

        this.onChange = this.onChange.bind(this);
    }

    canAddMovie() {
        var currentCollection = collectionStore.getCurrentCollection();
        if (currentCollection) {
            return currentCollection.slug === sessionStore.getActiveUser().slug;
        } else {
            return false;
        }
    }

    onChange() {
        this.forceUpdate();
    }

    componentDidMount() {
        collectionStore.addChangeListener(this.onChange);
    }

    componentWillUnmount() {
        collectionStore.removeChangeListener(this.onChange);
    }

    render() {
        var showAddButton = this.canAddMovie();
        return (
            <div id="accountInfo">
                { showAddButton ? <button onClick={() => modalActions.openAddMovieDialog()}
                                          className="btn add-movie">Add
                    Movie</button> : null}
                <h3 className="username">{this.props.user.google.name}</h3>
                <span className="sign-out" onClick={() => sessionActions.signOutUser()}>Sign out</span>
            </div>)
    }
}