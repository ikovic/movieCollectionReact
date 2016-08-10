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
                if (!res.error) {
                    appDispatcher.handleAction({
                        actionType: modalConstants.SHOW_ORDER_DETAILS,
                        data: res
                    });
                }
            },
            (status, res) => {
                console.dir(res);
            }
        );
        ajax.post({imdbId: imdbId});
    }

    getAutocomplete(title) {
        var ajax = new Ajax('/api/movie?title=' + title,
            (res) => {
                appDispatcher.handleAction({
                    actionType: modalConstants.GET_AUTOCOMPLETE,
                    data: res
                });
            },
            (status, res) => {
                console.dir(res);
            }
        );
        ajax.get();
    }

    closeAutocomplete() {
        appDispatcher.handleAction({
            actionType: modalConstants.CLOSE_AUTOCOMPLETE,
            data: null
        });
    }

    showMovieDetails(movie) {
        appDispatcher.handleAction({
            actionType: modalConstants.SHOW_MOVIE_DETAILS,
            data: movie
        });
    }

    hideMovieDetails() {
        appDispatcher.handleAction({
            actionType: modalConstants.HIDE_MOVIE_DETAILS,
            data: null
        });
    }
}

var modalActions = new ModalActions();

export default modalActions;