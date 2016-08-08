import appDispatcher from '../dispatcher/appDispatcher';
import collectionConstants from '../constants/collectionConstants';
import sessionStore from '../stores/sessionStore';
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
                    console.dir(res);
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
}

var collectionActions = new CollectionActions();

export default collectionActions;