import React from "react";
import { connect } from 'react-redux';

import BaseCabinet from '../components/socialmedia/cabinet/Cabinet';


const Cabinet = ({ user }) => {

    return <BaseCabinet  user={user}/>
}

export default connect(
    ({ user }) => ({
        user: user.data
    })
)(Cabinet);