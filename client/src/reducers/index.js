import { combineReducers } from "redux";

import auth from "./auth";
import message from "./message";
import dialogs from "./dialogs";
import messages from './messages';

export default combineReducers({
  auth,
  message,
  dialogs,
  messages
});