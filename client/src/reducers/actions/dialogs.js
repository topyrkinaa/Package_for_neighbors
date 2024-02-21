import dialogsAPI from '../../core/axios';

const actions = {
    setDialogs: items => ({
        type: 'DIALOGS:SET_ITEMS',
        payload: items,
      }),
      setCurrentDialogId: id => ({
        type: 'DIALOGS:SET_CURRENT_DIALOG_ID',
        payload: id,
      }),
    fetchDialogs: () => dispatch => {
        dialogsAPI.getAll().then(({ data }) => {
            dispatch(actions.setDialogs(data))
        });
    }
};

export default actions;