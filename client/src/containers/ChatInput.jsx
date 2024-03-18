import { connect } from 'react-redux';

import messagesActions from '../reducers/actions/messages';
import BaseChatInput from '../components/chat/Chatinput/Chatinput';


const ChatInput = ({ fetchSendMessage, currentDialogId }) => {
    return <BaseChatInput 
    onSendMessage={ fetchSendMessage } 
    currentDialogId={ currentDialogId }/>
}

export default connect(
    ({ dialogs }) => dialogs,
    messagesActions 
)(ChatInput);