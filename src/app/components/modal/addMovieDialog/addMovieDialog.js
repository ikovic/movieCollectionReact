import React, {Component} from 'react';

import modalStore from '../../../stores/modalStore';
import modalActions from '../../../actions/modalActions';

import './addMovieDialog.scss';

class AddMovieDialog extends Component {

    constructor() {
        super();

        this._onChange = this._onChange.bind(this);
        this._handleKeyPress = this._handleKeyPress.bind(this);

        this.state = {
            isOpen: false
        };
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
                                    Tu je Body
                                </div>
                                <div className="modal-footer">
                                    <div className="confirm-controls">
                    <span className="btn btn-cancel" onClick={() => modalActions.closeAddMovieDialog()}>
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
