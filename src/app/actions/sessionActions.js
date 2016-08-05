import appDispatcher from '../dispatcher/appDispatcher';
import sessionConstants from '../constants/sessionConstants';

class SessionActions {
    signInUser() {
        appDispatcher.handleAction({
            actionType: sessionConstants.SIGN_IN_USER,
            data: null
        });
    }

    signOutUser() {
        appDispatcher.handleAction({
            actionType: sessionConstants.SIGN_OUT_USER,
            data: null
        });
    }
}

var sessionActions = new SessionActions();

export default sessionActions;