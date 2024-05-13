import React, {useEffect} from 'react';
import  withRouter   from '../../utils/helpers/withRouter';
import { connect } from 'react-redux';

import dialogsActions from '../../reducers/actions/dialogs' 
import Sidebar from '../../containers/Sidebar';
import Status from '../../containers/Status';
import Messages from '../../containers/Messages';
import Chatinput from '../../containers/ChatInput';
import "./HomeChat.scss";

const HomeChat = (props) => {
  const {setCurrentDialogId, user} = props;

  useEffect(() => {
    const { location: { pathname } } = props;
    const dialogId = pathname.split('/').pop();
    if (dialogId != 'chat'){
      setCurrentDialogId(dialogId);
    } else {
      setCurrentDialogId('');
    }

  }, [props.location.pathname]);
  
  return (
    <section className="home">
      
      <div className="chat">
        <Sidebar />
          { user && (<div className="chat__dialog"> 
              <Status online/>
              <Messages />
            <div className="chat__dialog-input">
            <Chatinput />
            </div>
        </div>)}
      </div>
    </section> 
    
      
  );
}

export default withRouter(connect(
    ({ user }) => ({ user: user.data}), 
    dialogsActions
  )(HomeChat)
);
