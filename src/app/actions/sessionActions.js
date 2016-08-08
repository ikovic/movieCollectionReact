import appDispatcher from '../dispatcher/appDispatcher';
import sessionConstants from '../constants/sessionConstants';
import Ajax from '../utility/ajax';

class SessionActions {
    signInUser(data) {
        // authenticate on the backend too
        let token = data.getAuthResponse().id_token;
        var ajax = new Ajax('/auth/google/signIn',
            (res) => {
                appDispatcher.handleAction({
                    actionType: sessionConstants.SIGN_IN_USER,
                    data: {
                        user: data
                    }
                });
            },
            (status, res) => console.dir(res)
        );
        ajax.post({id_token: token});
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