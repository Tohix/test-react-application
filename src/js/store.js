import { createStore, applyMiddleware, store } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import { fromJS } from 'immutable';

let middleware = [thunk];

const persistedState = localStorage.getItem('reduxState') ? fromJS(JSON.parse(localStorage.getItem('reduxState'))) : fromJS({})

function configureStore() {
    return createStore(
        rootReducer,
        persistedState,
        applyMiddleware(...middleware),
    )
}

export default configureStore;
