import appDispatcher from '../dispatcher/appDispatcher';
import modalConstants from '../constants/modalConstants';

class ModalActions {
    addMovie() {
        appDispatcher.handleAction({
            actionType: modalConstants.ADD_MOVIE,
            data: null
        });
    }
}

var modalActions = new ModalActions();

export default modalActions;