import appDispatcher from '../dispatcher/appDispatcher';
import collectionConstants from '../constants/collectionConstants';
import collectionStore from '../stores/collectionStore';
import modalActions from '../actions/modalActions';
import Ajax from '../utility/ajax';

class CollectionActions {

    selectCollection(collection) {
        if (!collection.movieIds || collection.movieIds.length == 0) {
            appDispatcher.handleAction({
                actionType: collectionConstants.SELECT_COLLECTION,
                data: {
                    collection: collection,
                    movies: []
                }
            });
        } else {
            // get movie ids
            let url = '/api/movie/?';
            collection.movieIds.forEach((id, index, array) => {
                url += 'id=' + id;
                if (index < array.length - 1) {
                    url += '&';
                }
            });
            let ajax = new Ajax(url,
                (res) => {
                    appDispatcher.handleAction({
                        actionType: collectionConstants.SELECT_COLLECTION,
                        data: {
                            collection: collection,
                            movies: res
                        }
                    });
                },
                (status, res) => {
                    console.dir(res);
                });
            ajax.get();
        }
    }

    loadCollections() {
        var ajax = new Ajax('/api/collection',
            (res) => {
                appDispatcher.handleAction({
                    actionType: collectionConstants.LOAD_COLLECTIONS,
                    data: res
                });
            },
            (status, res) => {
                console.dir(res);
            }
        );
        ajax.get();
    }

    addMovie(movie) {
        if (movie) {
            let currentCollection = collectionStore.getCurrentCollection();
            if (currentCollection.movieIds.find((id) => {
                    return id === movie._id
                })) {
                console.log('Movie already is in the collection');
                return;
            }
            currentCollection.movieIds.push(movie._id);
            let ajax = new Ajax('api/collection/' + currentCollection.slug,
                (res) => {
                    appDispatcher.handleAction({
                        actionType: collectionConstants.ADD_MOVIE,
                        data: {
                            collection: currentCollection,
                            movie: movie
                        }
                    });
                    modalActions.closeAddMovieDialog();
                },
                (status, res) => {
                    console.dir(res);
                }
            );
            ajax.put(currentCollection);
        }
    }

    removeMovie(movie) {
        if (movie) {
            let currentCollection = collectionStore.getCurrentCollection();
            console.log('before', currentCollection.movieIds);
            let movieIndex = currentCollection.movieIds.indexOf(movie._id);
            currentCollection.movieIds.splice(movieIndex, 1);
            console.log('after', currentCollection.movieIds);

            let ajax = new Ajax('api/collection/' + currentCollection.slug,
                (res) => {
                    appDispatcher.handleAction({
                        actionType: collectionConstants.REMOVE_MOVIE,
                        data: {
                            collection: currentCollection,
                            movie: movie
                        }
                    });
                },
                (status, res) => {
                    console.dir(res);
                }
            );
            ajax.put(currentCollection);
        }
    }

    searchCollections(title) {
        var ajax = new Ajax('/api/collection?title=' + title,
            (res) => {
                appDispatcher.handleAction({
                    actionType: collectionConstants.SEARCH_COLLECTIONS,
                    data: res
                });
            },
            (status, res) => {
                console.dir(res);
            }
        );
        ajax.get();
    }
}

var collectionActions = new CollectionActions();

export default collectionActions;