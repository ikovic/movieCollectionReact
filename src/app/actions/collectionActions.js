import appDispatcher from '../dispatcher/appDispatcher';
import collectionConstants from '../constants/collectionConstants';
import sessionStore from '../stores/sessionStore';
import Ajax from '../utility/ajax';

class CollectionActions {
    loadCollection(movieIds) {

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