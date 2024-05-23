import React from "react";
import { connect } from 'react-redux';

import BaseReceipts from '../components/socialmedia/receipts/Receipts';


const Receipts = ({ user }) => {

    return <BaseReceipts  user={user}/>
}

export default connect(
    ({ user }) => ({
        user: user.data
    }),
)(Receipts);