const Actions = {
    setAttachments: items => ({
        type: 'ATTACHMENTS:SET_ITEMS',
        payload: items,
    }),
    removeAttachments: file => ({
        type: 'ATTACHMENTS:REMOVE_ITEMS',
        payload: file
    }),
};

export default Actions;