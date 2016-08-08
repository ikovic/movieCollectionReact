import appDispatcher from '../dispatcher/appDispatcher';
import modalConstants from '../constants/modalConstants';
import Ajax from '../utility/ajax';

class ModalActions {
    openAddMovieDialog() {
        appDispatcher.handleAction({
            actionType: modalConstants.OPEN_ADD_MOVIE_DIALOG,
            data: null
        });
    }

    closeAddMovieDialog() {
        appDispatcher.handleAction({
            actionType: modalConstants.CLOSE_ADD_MOVIE_DIALOG,
            data: null
        });
    }

    createMovieOrder(imdbId) {
        var ajax = new Ajax('/api/movieOrder',
            (res) => {
                appDispatcher.handleAction({
                    actionType: modalConstants.SHOW_ORDER_DETAILS,
                    data: res
                });
            },
            (status, res) => {
                console.dir(res);
            }
        );
        ajax.post({imdbId: imdbId});
    }
}

var modalActions = new ModalActions();

export default modalActions;