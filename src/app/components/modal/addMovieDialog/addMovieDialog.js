import React, {Component} from 'react';

import modalStore from '../../../stores/modalStore';
import modalActions from '../../../actions/modalActions';

import './addMovieDialog.scss';

class AddMovieDialog extends Component {

    constructor() {
        super();

        this._onChange = this._onChange.bind(this);
        this._handleCancelClick = this._handleCancelClick.bind(this);
        this._handleKeyPress = this._handleKeyPress.bind(this);

        this.state = {
            isOpen: false
        };
    }

    _onChange() {
        this.setState(modalStore.getDialogData());
    }

    _handleKeyPress(event) {
        if (this.state.isOpen) {
            if (event.code === 'Escape') {
                modalActions.cancelDialog();
            } else if (event.code === 'Enter') {
                modalActions.confirmDialog();
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

    _handleCancelClick() {

        modalActions.hideAddMovieDialog();
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
                    <span className="btn btn-cancel" onClick={() => this._handleCancelClick()}>
                      Bad
                    </span>
                                        <span className="btn btn-primary" onClick={() => modalActions.confirmDialog()}>
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
