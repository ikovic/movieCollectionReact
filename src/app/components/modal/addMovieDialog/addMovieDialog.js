import React, {Component} from 'react';

import modalStore from '../../../stores/modalStore';
import modalActions from '../../../actions/modalActions';

import Details from '../../movies/details/details';

import './addMovieDialog.scss';

class AddMovieDialog extends Component {

    constructor() {
        super();

        this._onChange = this._onChange.bind(this);
        this._onInputChange = this._onInputChange.bind(this);
        this._handleKeyPress = this._handleKeyPress.bind(this);

        this.state = {
            isOpen: false,
            imdbId: '',
            imdbTitle: '',
            movie: null
        };

        this.imdbIdRegex = /tt\d{7}/;
    }

    _onChange() {
        this.setState(modalStore.getAddMovieDialogData());
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
                                    Tu je Header
                                </div>
                                <div className="modal-body">
                                    <label htmlFor="imdbTitle">Title</label>
                                    <input type="text" value={this.state.imdbTitle} id="imdbTitle"
                                           onChange={(event) => this._onInputChange(event)}/>

                                    <label htmlFor="imdbId">IMDb ID</label>
                                    <input type="text" value={this.state.imdbId} id="imdbId"
                                           onChange={(event) => this._onInputChange(event)}/>

                                    {this.state.movie ? <Details movie={this.state.movie}/> : null}
                                </div>
                                <div className="modal-footer">
                                    <div className="confirm-controls">
                                        <span className="btn btn-cancel"
                                              onClick={() => modalActions.closeAddMovieDialog()}>
                                          Bad
                                        </span>
                                        <span className="btn btn-primary" onClick={() => console.log('good')}>
                                          Good
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
