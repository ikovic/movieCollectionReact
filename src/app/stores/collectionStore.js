import {EventEmitter} from 'events';

import appDispatcher from '../dispatcher/appDispatcher';
import collectionConstants from '../constants/collectionConstants';

class CollectionStore extends EventEmitter {

    constructor() {
        super();

        this.currentCollection = -1;
        this.collections = [];
    }

    getCurrentCollection() {
        if (this.currentCollection > -1 && this.currentCollection < this.collections.length) {
            return this.collections[this.currentCollection];
        } else {
            return null;
        }
    }

    getCollections() {
        return this.collections;
    }

    loadCollections(collections) {
        this.collections = collections;
        this.currentCollection = -1;
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

var collectionStore = new CollectionStore();

appDispatcher.register(function (payload) {
    var action = payload.action;

    if (action.actionType === undefined) {
        throw new Error('Undefined action constant!');
    }

    switch (action.actionType) {

        case collectionConstants.LOAD_COLLECTIONS: {
            collectionStore.loadCollections(action.data);
            break;
        }

        default: {
            return true;
        }
    }

    // If action was responded to, emit change event
    collectionStore.emitChange();

    return true;
});

export default collectionStore;
