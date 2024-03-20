import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd'; // Добавляем импорт Button
import Avatar from '../../chat/Avatar/Avatar';
import "./Cabinet.scss";

const { TextArea } = Input;

const Cabinet = ({ user }) => {
  return (
    <div className="home__content-cabinet">
      <div className='home__content-cabinet-avatar'>
        <Avatar user={user} />
      </div>
      <div className='home__content-cabinet-form'>
        <form>
          <Form.Item label="Имя">
            <TextArea
              value={user.username ? user.username : 'Введите данные'}
              autoSize={{ minRows: 1, maxRows: 1}}
            />
          </Form.Item>

          <Form.Item label="Отчество">
            <TextArea
              value={user.patronymic ? user.patronymic : 'Введите данные'}
              autoSize={{ minRows: 1, maxRows: 1}}
            />
          </Form.Item>

          <Form.Item label="Фамилия">
            <TextArea
              value={user.surname ? user.surname : 'Введите данные'}
              autoSize={{ minRows: 1, maxRows: 1}}
            />
          </Form.Item>

          <Form.Item label="Номер квартиры">
            <TextArea
              value={user.apartmentnum ? user.apartmentnum : 'Введите данные'}
              autoSize={{ minRows: 1, maxRows: 1}}
            />
          </Form.Item>

          <Form.Item label="Телефон">
            <TextArea
              value={user.telephone ? user.telephone : 'Введите данные'}
              id="telephone"
              autoSize={{ minRows: 1, maxRows: 1 }}
            />
          </Form.Item>

          <Form.Item label="Почта">
            <TextArea
              value={user.email ? user.email : 'Введите данные'}
              autoSize={{ minRows: 1, maxRows: 1}}
            />
          </Form.Item>

          <Form.Item label="С кем живет">
            <TextArea
              value={user.roommates ? user.roommates : 'Введите данные'}
              autoSize={{ minRows: 3, maxRows: 7}}
            />
          </Form.Item>

          {/*<Button type="primary">Сохранить изменения</Button>*/}
        </form>
      </div>
    </div>
  );
}

export default Cabinet;
