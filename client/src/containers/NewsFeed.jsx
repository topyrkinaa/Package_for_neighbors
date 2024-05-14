import React, {useState} from "react";
import { connect } from 'react-redux';

import BaseNewsFeed from '../components/socialmedia/newsFeed/newsFeed';


const NewsFeed = ({ user }) => {
    const [previewImage, setPreviewImage ] = useState(null);

    return <BaseNewsFeed 
        user={user}
        setPreviewImage={setPreviewImage}
        previewImage={previewImage}
    />
}

export default connect(
    ({ user }) => ({
        user: user.data
    }),
)(NewsFeed);