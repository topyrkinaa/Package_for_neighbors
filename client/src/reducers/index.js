import { combineReducers } from "redux";

const reducers = ['messages','dialogs', 'user'];

import user from "./user";
import dialogs from "./dialogs";
import messages from './messages';

export default combineReducers({
  user,
  dialogs,
  messages
});