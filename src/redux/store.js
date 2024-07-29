// import { createStore, applyMiddleware, compose } from 'redux';
// import createSagaMiddleware from 'redux-saga';
// import rootReducer from '../redux/reducers/index.js';

// import rootSaga from '../redux/saga/index.js';

// const sagaMiddleware = createSagaMiddleware();
// const store = compose(
//   applyMiddleware(sagaMiddleware),
//   window.devToolsExtension && window.devToolsExtension(),
// )(createStore)(rootReducer);

// sagaMiddleware.run(rootSaga);

// export default store;

// import {
//     legacy_createStore as createStore,
//     compose,
//     applyMiddleware
//   } from 'redux';
//   import createSagaMiddleware from 'redux-saga';
//   import rootReducer from '../redux/reducers/index.js';

// import rootSaga from '../redux/saga/index.js';

  
//   const sagaMiddleware = createSagaMiddleware();
  
//   const store = createStore(
//     rootReducer,
//     undefined, 
//     compose(
//       applyMiddleware(sagaMiddleware),
//       window.devToolsExtension && window.devToolsExtension(),
//     ),
//   );
  
//   sagaMiddleware.run(rootSaga);
  
//   export default store;


import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../redux/reducers/index.js';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../redux/saga/index.js';


const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;