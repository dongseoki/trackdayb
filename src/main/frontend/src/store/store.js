import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore } from 'redux-persist';

import rootReducer from '../reducers/rootReducer';
import rootSaga from '../saga/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];


export const store = createStore(rootReducer, {}, composeWithDevTools(applyMiddleware(...middleware)));
store.sagaTask = sagaMiddleware.run(rootSaga);

// export default store;
export const persistor = persistStore(store);
