import React from "react";
import { connect } from 'react-redux';

import BaseStatus from '../components/chat/Status/Status';


const Status = ({ currentDialogId, user, dialogs }) => {

    if(!dialogs.length || !currentDialogId) {
        return null;
    }
    console.log(currentDialogId, dialogs);
    
    const currentDialogObj = dialogs.filter(
        dialog => dialog.id.toString() === currentDialogId.toString()
      )[0];

        console.log(currentDialogObj);
    let partner = {};

    if (currentDialogObj.author.id === user.id) {
        partner = currentDialogObj.partner;
    } else {
        partner = currentDialogObj.author;
    }

    return <BaseStatus online={ false } user={partner}/>
}

export default connect(
    ({ dialogs, user }) => ({
        dialogs: dialogs.items, 
        currentDialogId: dialogs.currentDialogId,
        user: user.data
    }),
)(Status);