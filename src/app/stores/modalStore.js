import {EventEmitter} from 'events';

import appDispatcher from '../dispatcher/appDispatcher';
import modalConstants from '../constants/modalConstants';

class ModalStore extends EventEmitter {

    constructor() {
        super();

        this.autocomplete = [];

        this.addMovieDialog = {
            isOpen: false,
            movie: null
        };
    }

    getAddMovieDialogData() {
        return this.addMovieDialog;
    }

    showAddMovieDialog() {
        this.addMovieDialog = {
            isOpen: true,
            movie: null
        }
    }

    hideAddMovieDialog() {
        this.addMovieDialog = {
            isOpen: false,
            movie: null
        }
    }

    showOrderDetails(movie) {
        this.addMovieDialog = {
            isOpen: true,
            movie: movie
        };
    }

    setAutocompleteData(data) {
        if (data.Search) {
            this.autocomplete = data.Search;
        } else {
            this.autocomplete = [];
        }
    }

    getAutocompleteData() {
        return this.autocomplete;
    }

    // Emit Change event
    emitChange() {
        this.emit('change');
    }

    // Add change listener
    addChangeListener(callback) {
        this.on('change', callback);
    }

    // Remove change listener
    removeChangeListener(callback) {
        this.removeListener('change', callback);
    }
}

var modalStore = new ModalStore();

appDispatcher.register(function (payload) {
    var action = payload.action;

    if (action.actionType === undefined) {
        throw new Error('Undefined action constant!');
    }

    switch (action.actionType) {

        case modalConstants.OPEN_ADD_MOVIE_DIALOG: {
            modalStore.showAddMovieDialog();
            break;
        }

        case modalConstants.CLOSE_ADD_MOVIE_DIALOG: {
            modalStore.hideAddMovieDialog();
            break;
        }

        case modalConstants.SHOW_ORDER_DETAILS: {
            modalStore.showOrderDetails(action.data);
            break;
        }

        case modalConstants.GET_AUTOCOMPLETE: {
            modalStore.setAutocompleteData(action.data);
            break;
        }

        case modalConstants.CLOSE_AUTOCOMPLETE: {
            modalStore.setAutocompleteData([]);
            break;
        }

        default: {
            return true;
        }
    }

    // If action was responded to, emit change event
    modalStore.emitChange();

    return true;
});

export default modalStore;
