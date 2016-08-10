import {EventEmitter} from 'events';

import appDispatcher from '../dispatcher/appDispatcher';
import sessionConstants from '../constants/sessionConstants';

class SessionStore extends EventEmitter {

    constructor() {
        super();

        this.user = this.getSessionData();
    }

    getActiveUser() {
        return this.user;
    }

    getSessionData() {
        return JSON.parse(sessionStorage.getItem('sessionData'));
    }

    signInUser(data) {
        this.user = data.user;
        sessionStorage.setItem('sessionData', JSON.stringify(this.user));
    }

    signOutUser() {
        this.user = null;
        sessionStorage.removeItem('sessionData');
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

var sessionStore = new SessionStore();

appDispatcher.register(function (payload) {
    var action = payload.action;

    if (action.actionType === undefined) {
        throw new Error('Undefined action constant!');
    }

    switch (action.actionType) {

        case sessionConstants.SIGN_IN_USER: {
            sessionStore.signInUser(action.data);
            break;
        }
        case sessionConstants.SIGN_OUT_USER: {
            sessionStore.signOutUser();
            break;
        }

        default: {
            return true;
        }
    }

    // If action was responded to, emit change event
    sessionStore.emitChange();

    return true;
});

export default sessionStore;
