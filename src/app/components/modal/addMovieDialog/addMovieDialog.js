import React, {Component} from 'react';

import modalStore from '../../../stores/modalStore';
import modalActions from '../../../actions/modalActions';
import collectionActions from '../../../actions/collectionActions';

import Details from '../../movies/details/details';

import './addMovieDialog.scss';

class AddMovieDialog extends Component {

    constructor() {
        super();

        this._onChange = this._onChange.bind(this);
        this._onInputChange = this._onInputChange.bind(this);
        this._getAutocompleteValues = this._getAutocompleteValues.bind(this);
        this._handleKeyPress = this._handleKeyPress.bind(this);

        this.state = {
            isOpen: false,
            imdbId: '',
            imdbTitle: '',
            movie: null,
            autocomplete: []
        };

        this.imdbIdRegex = /tt\d{7}/;
    }

    _onChange() {
        var modalData = modalStore.getAddMovieDialogData();
        var autocomplete = modalStore.getAutocompleteData();

        // reset inputs when opening the window
        if (!this.state.isOpen && modalData.isOpen) {
            this.setState({
                isOpen: modalData.isOpen,
                movie: modalData.movie,
                autocomplete: autocomplete,
                imdbId: '',
                imdbTitle: ''
            });
        } else {
            this.setState({
                isOpen: modalData.isOpen,
                movie: modalData.movie,
                autocomplete: autocomplete
            });
        }
    }

    _handleKeyPress(event) {
        if (this.state.isOpen) {
            if (event.code === 'Escape') {
                modalActions.closeAddMovieDialog();
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
        if (this.autocompleteTimeout) {
            clearTimeout(this.autocompleteTimeout);
        }
    }

    _getSuggestions(value) {
        modalActions.getAutocomplete(value);
    }

    _getAutocompleteValues() {
        return this.state.autocomplete.map((item) => {
            return (<li key={item.imdbID} onClick={() => this._onAutocompleteSelect(item)}>{item.Title}</li>)
        });
    }

    _onAutocompleteSelect(value) {
        modalActions.closeAutocomplete();
        modalActions.createMovieOrder(value.imdbID);
        this.setState({
            imdbTitle: value.Title,
            imdbId: value.imdbID
        })
    }

    _onInputChange(event) {
        if (event.target.id === 'imdbId') {
            let imdbId = event.target.value;
            if (this.imdbIdRegex.test(imdbId)) {
                modalActions.createMovieOrder(imdbId);
            }
            this.setState({
                imdbId: imdbId
            });
        } else if (event.target.id === 'imdbTitle') {
            if (this.autocompleteTimeout) {
                clearTimeout(this.autocompleteTimeout);
            }
            this.autocompleteTimeout = setTimeout(() => this._getSuggestions(this.state.imdbTitle), 500);

            this.setState({
                imdbTitle: event.target.value
            });
        }
    }

    render() {
        if (this.state.isOpen) {
            return (
                <div id="addMovieDialogWrapper">
                    <div id="overlayModal" className={this.state.isOpen ? 'visible' : ''}></div>
                    <div className="modal">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <span className="title">Add a Movie</span>
                                    <span className="close-modal"
                                          onClick={() => modalActions.closeAddMovieDialog()}>x</span>
                                </div>
                                <div className="modal-body">
                                    <span className="legend-wrapper">
                                        <p>Add a movie by entering its title or IMDb ID</p>
                                    </span>
                                    <span className="title-wrapper">
                                        <label htmlFor="imdbTitle">Title</label>
                                        <input type="text" value={this.state.imdbTitle} id="imdbTitle"
                                               onChange={(event) => this._onInputChange(event)}/>
                                        {this.state.autocomplete.length ?
                                            <ul className="autocomplete">
                                                {this._getAutocompleteValues()}
                                            </ul>
                                            :
                                            null
                                        }
                                    </span>

                                    <span className="imdbid-wrapper">
                                        <label htmlFor="imdbId">IMDb ID</label>
                                        <input type="text" value={this.state.imdbId} id="imdbId"
                                               onChange={(event) => this._onInputChange(event)}/>
                                    </span>

                                    {this.state.movie ? <Details movie={this.state.movie}/> : null}
                                </div>
                                <div className="modal-footer">
                                    <div className="confirm-controls">

                                        <span className={"btn btn-primary " + (this.state.movie ? '' : 'hidden')}
                                              onClick={() => collectionActions.addMovie(this.state.movie)}>
                                          Add
                                        </span>
                                    </div>
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

export default AddMovieDialog;
