import {  notification } from 'antd';

export default({text, type = 'info', title}) => notification[type](

  {
  message: title,
  description: text,
  style: {
    zIndex: 999, // Устанавливаем значение z-index
    marginTop: 32, // Устанавливаем отступ от верха
  },
});
