import {Dispatcher} from 'flux';

class AppDispatcher extends Dispatcher {

    handleAction(action) {
        this.dispatch({
            source: 'VIEW_ACTION',
            action: action
        });
    }
}

var appDispatcher = new AppDispatcher();
export default appDispatcher;
