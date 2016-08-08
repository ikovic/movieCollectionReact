import appDispatcher from '../dispatcher/appDispatcher';
import modalConstants from '../constants/modalConstants';

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
}

var modalActions = new ModalActions();

export default modalActions;