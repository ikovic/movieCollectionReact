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
                        user: res
                    }
                });
            },
            (status, res) => console.dir(res)
        );
        ajax.post({id_token: token});
    }

    signOutUser() {
        // first use google API to sign out
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            // then sign out of server session
            var ajax = new Ajax('/auth/logout',
                (res) => {
                    // then update the sessionStore
                    appDispatcher.handleAction({
                        actionType: sessionConstants.SIGN_OUT_USER,
                        data: null
                    });
                },
                (status, res) => console.dir(res)
            );
            ajax.get();
        });
    }
}

var sessionActions = new SessionActions();

export default sessionActions;