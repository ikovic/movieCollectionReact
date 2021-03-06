import {EventEmitter} from 'events';

import appDispatcher from '../dispatcher/appDispatcher';
import collectionConstants from '../constants/collectionConstants';

class CollectionStore extends EventEmitter {

    constructor() {
        super();

        this.currentCollection = null;
        this.movies = [];
        this.collections = [];
    }

    getCurrentCollection() {
        return this.currentCollection;
    }

    getCollections() {
        return this.collections;
    }

    getMovies() {
        return this.movies;
    }

    loadCollections(collections) {
        this.collections = collections;
        this.currentCollection = null;
        this.movies = [];
    }

    selectCollection(data) {
        this.currentCollection = data.collection;
        this.movies = data.movies;
    }

    addMovieToCollection(data) {
        this.currentCollection = data.collection;
        this.movies.push(data.movie);
    }

    removeMovieFromCollection(data) {
        this.currentCollection = data.collection;
        var movieIndex = this.movies.findIndex((movie) => {
            return movie._id === data.movie._id;
        });
        if (movieIndex > -1) {
            this.movies.splice(movieIndex, 1);
        }
    }

    displaySearchResults(data) {
        this.collections = data;
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

        case collectionConstants.SELECT_COLLECTION: {
            collectionStore.selectCollection(action.data);
            break;
        }

        case collectionConstants.ADD_MOVIE: {
            collectionStore.addMovieToCollection(action.data);
            break;
        }

        case collectionConstants.REMOVE_MOVIE: {
            collectionStore.removeMovieFromCollection(action.data);
            break;
        }

        case collectionConstants.SEARCH_COLLECTIONS: {
            collectionStore.displaySearchResults(action.data);
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
