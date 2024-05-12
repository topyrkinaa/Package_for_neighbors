import dialogsAPI from '../../core/dialogs';
import socket from '../../core/socket';

const Actions = {
    setDialogs: items => ({
        type: 'DIALOGS:SET_ITEMS',
        payload: items,
      }),
      setCurrentDialogId: id => dispatch => {
        socket.emit('DIALOG:JOIN', id);
        dispatch({
          type: 'DIALOGS:SET_CURRENT_DIALOG_ID',
          payload: id,
        })
      },
    fetchDialogs: () => dispatch => {
        dialogsAPI.getAll().then(({ data }) => {
            dispatch(Actions.setDialogs(data))
        });
    }
};

export default Actions;