import messagesAPI from '../../core/messages';

const Actions = {
    setMessages: items => ({
        type: 'MESSAGES:SET_ITEMS',
        payload: items,
      }),
      setIsLoading: bool => ({
        type: 'MESSAGES:SET_IS_LOADING',
        payload: bool,
      }),
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