import React, {useState} from "react";
import { connect } from 'react-redux';

import userActions from '../reducers/actions/user';
import BaseCabinet from '../components/socialmedia/cabinet/Cabinet';
import attachmentsActions from '../reducers/actions/attachments';
import filesAPI from '../core/files';

const Cabinet = ({ user, setAttachments, attachments, fetchUpdateInfoUser }) => {
    const [previewImage, setPreviewImage ] = useState(null);
    const [visible, setVisible ] = useState(false);
    const [visiblemodalOk, setVisiblemodalOk ] = useState(false);
    const [isLoading, setLoading ] = useState(false);
    const [telephone, setTelephone ] = useState("");
    const [roommates, setRoommates ] = useState("");

    const onCloseAddImage = () => {
        setVisible(false);
        setVisiblemodalOk(false);
    };

    const onShowAddImage = () => {
        setVisible(true);
    };

    const onSelectFiles = async file => {
        let uploaded = []
            uploaded = [
            ...uploaded,
            {
                file,
                name: file.name,
                status: "uploading"
            }
        ];
        setLoading(true);
        setAttachments(uploaded);
        await filesAPI.upload(file).then(({ data }) => {
                    return uploaded =[{
                        status: 'done',
                        uid: data.id,
                        name: data.filename,
                        url: data.url
                    }];
        });
        setAttachments(uploaded);
        setLoading(false);
    };

    const onEditInfo = () => {
        if (attachments.length > 0) {
            fetchUpdateInfoUser({
                telephone: null,
                roommates: null,
                attachments: attachments[0].url});
            setAttachments([]);
            setVisible(false);
        } else if (telephone || roommates) {
            fetchUpdateInfoUser({
                telephone: telephone || null,
                roommates: roommates || null,
                attachments: null});
            setVisiblemodalOk(true);
        }
    };


    return <BaseCabinet  
    user={user}
    setPreviewImage={setPreviewImage}
    previewImage={previewImage}
    onShowAddImage={onShowAddImage}
    onCloseAddImage={onCloseAddImage}
    visible={visible}
    isLoading = {isLoading}
    onSelectFiles={onSelectFiles}
    onEditInfo={onEditInfo}
    attachments={attachments}
    telephone={telephone}
    setTelephone={setTelephone}
    setRoommates={setRoommates}
    roommates={roommates}
    setVisiblemodalOk={setVisiblemodalOk}
    visiblemodalOk={visiblemodalOk}
    />
}

export default connect(
    ({ attachments, user }) => ({
        attachments: attachments.items,
        user: user.data
    }),
    { ...userActions, ...attachmentsActions} 
)(Cabinet);