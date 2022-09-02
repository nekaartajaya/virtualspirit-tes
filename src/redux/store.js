import {legacy_createStore as createStore, applyMiddleware} from 'redux';
import reducer from './reducer';
import saga from './saga';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, {}, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(saga);

export default store;
