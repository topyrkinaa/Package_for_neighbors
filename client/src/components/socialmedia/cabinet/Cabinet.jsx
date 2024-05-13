import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Modal, Popover } from 'antd'; // Добавляем импорт Button
import { FormOutlined, LoadingOutlined, DownloadOutlined, InfoCircleOutlined } from '@ant-design/icons';
import Upload from 'rc-upload';
import Avatar from '../../chat/Avatar/Avatar';
import "./Cabinet.scss";

const { TextArea } = Input;

const Cabinet = ({ 
  user, 
  setPreviewImage, 
  previewImage, 
  onShowAddImage, 
  onCloseAddImage,
  visible,
  onSelectFiles,
  isLoading,
  attachments,
  onEditInfo,
  telephone,
  setTelephone,
  setRoommates,
  roommates,
  visiblemodalOk
}) => {

  const [state, setState] = useState({
    previewVisible: false,
    previewImage: "",
    image: user.avatar
  });

  useEffect(() => {
    setState({
      ...state,
      image: user.avatar
    });
  }, [user.avatar]);



  return (
    <div className="home__content-cabinet">
      <div className='home__content-cabinet-avatar'>
          <div onClick={() => setPreviewImage(user.avatar)} key={user.id} className='home__content-cabinet-avatar-overlay' />
          <div className="home__content-cabinet-avatar-icon"onClick={onShowAddImage}>
            <FormOutlined  style={{ color : 'white', fontSize: 18 }}/>
          </div>

        <Avatar user={user} />
        <Modal
            open={!!previewImage} 
            onCancel={() => setPreviewImage(null)} 
            footer={null}
            >
                <img src={previewImage} style={{ width:'100%'}} alt="Preview" />
        </Modal>
      </div>

      <Modal
        className='home__content-cabinet-modal'
        title="Изменить фотографию профиля"
        open={visible}
        onCancel={onCloseAddImage}
        footer={null}
        >
          <p className='home__content-cabinet-modal-text'>Соседям будет проще узнать вас, если вы загрузите свою настоящую фотографию.
          Вы можете загрузить изображение в формате JPG, JPEG, GIF или PNG.</p>
          
          {isLoading ? (  
  <Button 
    className='home__content-cabinet-modal-button'
    type="ghost" 
    shape="circle" 
    icon={<LoadingOutlined />} 
    style = {{ marginLeft: '260px'}}
  />
) : (
  (attachments.length > 0) ? (
    <Button 
      className='home__content-cabinet-modal-button'
      key="submit" 
      type="primary"
      onClick={onEditInfo}
      style = {{ marginLeft: '230px'}}
    >
      Изменить
    </Button>
  ) : (
    <Upload 
      data={onSelectFiles} 
      accept='.jpg, .jpeg, .png, .gif' 
      multiple={true}
    >
      <Button 
        className='home__content-cabinet-modal-button'
        type="primary" 
        icon={<DownloadOutlined />} 
        size='large'
        style = {{ marginLeft: '215px'}}>
            Загрузить
          </Button>
    </Upload>
  )
)}
          
      </Modal>

      <Modal
        className='home__content-cabinet-modalОк'
        title="Изменить фотографию профиля"
        open={visiblemodalOk}
        onCancel={onCloseAddImage}
        footer={null}
        >
          <p className='home__content-cabinet-modal-text'>Данные успешно изменены</p>
          <Button 
          type="primary" 
          size='large'
          onClick={onCloseAddImage}
          style = {{ marginLeft: '255px'}}>
            Ок
          </Button>
      </Modal>



      <div className='home__content-cabinet-form'>
        <form >
          <div className='home__content-cabinet-form-item'>
          <Form.Item label="Имя">
          <TextArea
              value={user.username ? user.username : 'Введите данные'}
              autoSize={{ minRows: 1, maxRows: 1}}
            />
          </Form.Item> 

          <Popover
            content={
              <div>
                <p className='home__content-cabinet-form-text'>Это поле может изменить только администратор</p>
              </div>
              }
            trigger="hover">
            <div className='home__content-cabinet-form-icon'>
            <Button type="ghost" shape="circle" icon={<InfoCircleOutlined />} />             
              </div>
          </Popover>

          </div>


          <div className='home__content-cabinet-form-item'>
          <Form.Item label="Отчество">
            <TextArea
              value={user.patronymic ? user.patronymic : 'Введите данные'}
              autoSize={{ minRows: 1, maxRows: 1}}
            />
          </Form.Item>
          <Popover
            content={
              <div>
                <p className='home__content-cabinet-form-text'>Это поле может изменить только администратор</p>
              </div>
              }
            trigger="hover">
            <div className='home__content-cabinet-form-icon'>
            <Button type="ghost" shape="circle" icon={<InfoCircleOutlined />} />             
              </div>
          </Popover>
          </div>

          <div className='home__content-cabinet-form-item'>
          <Form.Item label="Фамилия">
            <TextArea
              value={user.surname ? user.surname : 'Введите данные'}
              autoSize={{ minRows: 1, maxRows: 1}}
            />
          </Form.Item>
          <Popover
            content={
              <div>
                <p className='home__content-cabinet-form-text'>Это поле может изменить только администратор</p>
              </div>
              }
            trigger="hover">
            <div className='home__content-cabinet-form-icon'>
            <Button type="ghost" shape="circle" icon={<InfoCircleOutlined />} />             
              </div>
          </Popover>
          </div>

          <div className='home__content-cabinet-form-item'>
          <Form.Item label="Номер квартиры">
            <TextArea
              value={user.apartmentnum ? user.apartmentnum : 'Введите данные'}
              autoSize={{ minRows: 1, maxRows: 1}}
            />
          </Form.Item>
          <Popover
            content={
              <div>
                <p className='home__content-cabinet-form-text'>Это поле может изменить только администратор</p>
              </div>
              }
            trigger="hover">
            <div className='home__content-cabinet-form-icon'>
            <Button type="ghost" shape="circle" icon={<InfoCircleOutlined />} />             
              </div>
          </Popover>
          </div>

          <Form.Item label="Телефон">
            <TextArea
              placeholder={user.telephone || 'Введите данные'}
              onChange={e => setTelephone(e.target.value) } 
              value={telephone}
              id="telephone"
              autoSize={{ minRows: 1, maxRows: 1 }}
              style={{ width: '290px'}}
            />
          </Form.Item>

          <div className='home__content-cabinet-form-item'>
          <Form.Item label="Почта">
            <TextArea
              value={user.email ? user.email : 'Введите данные'}
              autoSize={{ minRows: 1, maxRows: 1}}
            />
          </Form.Item>
          <Popover
            content={
              <div>
                <p className='home__content-cabinet-form-text'>Это поле может изменить только администратор</p>
              </div>
              }
            trigger="hover">
            <div className='home__content-cabinet-form-icon'>
            <Button type="ghost" shape="circle" icon={<InfoCircleOutlined />} />             
              </div>
          </Popover>
          </div>

          <Form.Item label="С кем живет">
            <TextArea
              placeholder={user.roommates || 'Введите данные'}
              onChange={e => setRoommates(e.target.value) } 
              value={roommates}
              autoSize={{ minRows: 3, maxRows: 7}}
              style={{ width: '265px'}}
            />
          </Form.Item>

          <Button type="primary"  onClick={onEditInfo} style={{ marginLeft: '115px' }}>
            Сохранить изменения
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Cabinet;
