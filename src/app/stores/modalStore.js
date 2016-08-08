import {EventEmitter} from 'events';

import appDispatcher from '../dispatcher/appDispatcher';
import modalConstants from '../constants/modalConstants';

class ModalStore extends EventEmitter {

    constructor() {
        super();

        this.addMovieDialog = {
            isOpen: false
        };
    }

    getMovieDialogData() {
        return this.addMovieDialog;
    }

    showMovieDialog() {
        this.addMovieDialog.isOpen = true;
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

        case modalConstants.ADD_MOVIE: {
            modalStore.showMovieDialog();
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
