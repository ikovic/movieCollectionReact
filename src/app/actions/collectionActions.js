import appDispatcher from '../dispatcher/appDispatcher';
import collectionConstants from '../constants/collectionConstants';
import sessionStore from '../stores/sessionStore';
import Ajax from '../utility/ajax';

class CollectionActions {
    loadCollection(movieIds) {

    }

    showCollections() {
        var ajax = new Ajax('/api/collection',
            (res) => {
                console.dir(res);
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