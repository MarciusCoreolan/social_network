import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { userAuthReducer } from './Ducks/userAuthReducer';
import { postsReducer } from './Ducks/postsReducer';
import { dialogsReducer } from './Ducks/dialogsReducer';
import { usersReducer } from './Ducks/usersReducer';
import { messagesReducer } from './Ducks/messagesReducer';
import { addPostReducer } from './Ducks/addPostReducer';
import { registrationReducer } from './Ducks/registrationReducer';

const Reducers = combineReducers({
  user: userAuthReducer,
  users: usersReducer,
  posts: postsReducer,
  dialogs: dialogsReducer,
  messages: messagesReducer,
  addPost: addPostReducer,
  registr: registrationReducer,
});

let preloadedState;
if (localStorage.getItem('user') !== null) {
  preloadedState = {
    user: JSON.parse(localStorage.getItem('user')),
    dialogs: JSON.parse(localStorage.getItem('dialogs')),
  };
}

const store = createStore(Reducers, preloadedState, applyMiddleware(thunk));
export default store;

store.subscribe(() => {
  localStorage.setItem('user', JSON.stringify(store.getState().user));
  localStorage.setItem('dialogs', JSON.stringify(store.getState().dialogs));
});
