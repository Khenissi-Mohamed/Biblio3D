import { configureStore } from '@reduxjs/toolkit';
import navbarReducer from './reducers/navbar';
import authReducer from './reducers/auth';
import loggerMiddleware from './middlewares/logger';
import modalsReducer from './reducers/modals';
import cardsReducer from './reducers/cards';
import userReducer from './reducers/user';
import modelDetailReducer from './reducers/modelDetail';
import editCardReducer from './reducers/editCard';
import categoryReducer from './reducers/category';
import notificationReducer from './reducers/notification';


const store = configureStore({
  reducer: {
    navbar: navbarReducer,
    auth: authReducer,
    modals: modalsReducer,
    cards: cardsReducer,
    user: userReducer,
    modelDetail: modelDetailReducer,
    editCard: editCardReducer,
    category: categoryReducer,
    notification: notificationReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggerMiddleware),

});

export default store;