import { combineReducers } from "redux";

const reducers = ['messages','dialogs', 'user', 'attachments'];

import user from './user';
import dialogs from './dialogs';
import messages from './messages';
import attachments from './attachments';

export default combineReducers({
  user,
  dialogs,
  messages,
  attachments
});