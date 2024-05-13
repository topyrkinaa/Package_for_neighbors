import React from "react";
import { Button, Modal, Select, Input, Form  } from 'antd';
import { TeamOutlined, FormOutlined } from '@ant-design/icons';

import Dialogs from '../../../containers/Dialogs';

import "./Sidebar.scss";

const { Option } = Select;
const { TextArea } = Input;

const Sidebar = ({ 
  user, 
  visible, 
  isLoading, 
  inputValue, 
  selectedUserId,
  users, 
  onShow, 
  onSearch, 
  onClose, 
  onChangeInput, 
  onSelectUser, 
  onChangeTextArea,
  onModalOk,
  messageText
}) => {
  const options = users.map(user => (
  <Option key={user.id}>{user.username}</Option>));
  
    return (
        <div className="chat__sidebar">
          <div className="chat__sidebar-header">
          <div>
            <TeamOutlined />
            <span>Список диалогов</span>
          </div>
          <Button onClick={onShow} type="ghost" shape="circle" icon={<FormOutlined />} />
          </div>

          <div className="chat__sidebar-dialogs">
            <Dialogs userId={user && user.id} />
          </div>
          <Modal 
            title="Создать диалог" 
            open={visible} 
            footer={[
              <Button 
                type="dashed"
                onClick={onClose}>
                  Закрыть
                </Button>,
              <Button 
              disabled={!messageText}
                key="submit" 
                type="primary" 
                loading={isLoading} 
                onClick={onModalOk}>
                    Создать
                  </Button>,
            ]}>
              <Form className="add-dialog-form">
              <Form.Item label="Ввидите имя пользователя или email">
              <Select
              style={{ width: '100%' }}
              placeholder="Введите имя пользователя или почту"
              value={inputValue}
              onSearch={onSearch}
              onChange={onChangeInput}
              onSelect={onSelectUser}
              notFoundContent={null}
              defaultActiveFirstOption={false}
              suffixIcon={null}
              filterOption={false}
              showSearch
                >
                  {options} 
                  </Select>

              </Form.Item>

              {selectedUserId && (<Form.Item label="Введите текст сообщение">
              <TextArea
                  autoSize={{ minRows: 3, maxRows: 10}} 
                  onChange={onChangeTextArea}
                  value={messageText}/>
                  
              </Form.Item>)}

              </Form>                  
          </Modal>

        </div>
    );
}

Sidebar.defaultProps = {
  users: [],
};

export default Sidebar;