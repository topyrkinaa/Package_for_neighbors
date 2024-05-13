import React, { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import { effect } from 'zod';


const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });


  const UploadFiles = ({ attachments, removeAttachments }) => {
    const [state, setState] = useState({
      previewVisible: false,
      previewImage: "",
      fileList: attachments
    });

    useEffect(() => {
      setState({
        ...state,
        fileList: attachments
      });
    }, [attachments]);

    const handleCancel = () => setState({...state, previewVisible: false });



    return (
    <div>
      
      <Upload
        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        listType="picture-card"
        fileList={state.fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={file => removeAttachments(file)}
      />
      <Modal
      open={state.previewVisible}
      footer={null}
      onCancel={handleCancel}
      >
        <img alt='example' style={{ width: "100%" }} src={state.previewImage} />
      </Modal>
      
      
      
      {/*state.previewImage && (
        <Image
          wrapperStyle={{
            display: 'none',
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={state.previewImage}
        />
      )*/}
    </div>
  );
}

UploadFiles.defaultProps = {
  attachments: []
}


export default UploadFiles;