import messagesAPI from '../../core/messages';

const Actions = {
      setMessages: items => ({
        type: 'MESSAGES:SET_ITEMS',
        payload: items,
      }),
      addMessage: message => (dispatch, getState) => {
        const { dialogs } = getState();
        const { currentDialogId } = dialogs;

        if (currentDialogId === message.dialog.id.toString()) {

          dispatch({
            type: 'MESSAGES:ADD_MESSAGE',
            payload: message
          });
        }
      },
      fetchSendMessage: ( text, dialogid, attachments ) => dispatch => {
         messagesAPI.send(text, dialogid, attachments );
      },
      setIsLoading: bool => ({
        type: 'MESSAGES:SET_IS_LOADING',
        payload: bool,
      }),

      removeMessageById: (id) => dispatch => {
        messagesAPI
        .removeById(id)
        .then(({ data }) => {
          dispatch(({
            type: 'MESSAGES:REMOVE_MESSAGE',
            payload: id,
          }));
        })
        .catch(() => {
          dispatch(Actions.setIsLoading(false));
        })
      },

      fetchMessages: dialogId => dispatch => {
        dispatch(Actions.setIsLoading(true));
        messagesAPI
            .getAllByDialogId(dialogId)
            .then(({ data }) => {
              dispatch(Actions.setMessages(data));
            })
            .catch(() => {
              dispatch(Actions.setIsLoading(false));
            })
    }
};

export default Actions;