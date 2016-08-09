import React, {Component} from 'react';

import modalStore from '../../../stores/modalStore';
import modalActions from '../../../actions/modalActions';

import Details from '../../movies/details/details';

import './movieDetails.scss';

class MovieDetails extends Component {

    constructor() {
        super();

        this._onChange = this._onChange.bind(this);
        this._handleKeyPress = this._handleKeyPress.bind(this);

        this.state = {
            isOpen: false,
            movie: null
        };
    }

    _onChange() {
        this.setState(modalStore.getMovieDetailsModalData());
    }

    _handleKeyPress(event) {
        if (this.state.isOpen) {
            if (event.code === 'Escape') {
                modalActions.hideMovieDetails();
            } else if (event.code === 'Enter') {
                console.log('confirmed with enter');
            }
        }
    }

    //  subscribe na store change event
    componentDidMount() {
        modalStore.addChangeListener(this._onChange);
        document.addEventListener('keyup', this._handleKeyPress, false);
    }

    // Unbind change listener
    componentWillUnmount() {
        modalStore.removeChangeListener(this._onChange);
        document.removeEventListener('keyup', this._handleKeyPress, false);
    }

    render() {
        if (this.state.isOpen) {
            return (
                <div id="movieDetailsWrapper">
                    <div id="overlayModalDetails" onClick={() => modalActions.hideMovieDetails()}
                         className={this.state.isOpen ? 'visible' : ''}></div>
                    <div className="modal">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <span className="title">Movie Details</span>
                                    <span className="close-modal"
                                          onClick={() => modalActions.hideMovieDetails()}>x</span>
                                </div>
                                <div className="modal-body">
                                    <Details movie={this.state.movie}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            )
        } else {
            return null;
        }
    }
}

export default MovieDetails;
