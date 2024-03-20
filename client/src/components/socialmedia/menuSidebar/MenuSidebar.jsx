import React from 'react';
import { IssuesCloseOutlined, UserOutlined, CalculatorOutlined, HomeOutlined, MessageOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import Cabinet from '../../../containers/Cabinet';
import Receipts from '../../../containers/Receipts';


const MenuSidebar = ({ user, onClick, fild  }) => {

    const navigate = useNavigate();
    
    const handleNavigateRef = () => {
        navigate("/reference");
    };

    const handleNavigateChat = () => {
        navigate("/chat");
    };
    
    const renderComponent = () => {
      if (fild === "receipts") {
          return <Receipts />;
      } else if (fild === "cabinet") {
          return <Cabinet />;
      } 
  };

    return (
       <div className="menu">
        <div className="menu__sidebar">
    
            {/*<div className="menu__sidebar-button">
               <HomeOutlined />
              <p className='menu__text-pp'>Главная страница</p>
            </div>*/}
    
            <div 
              className="menu__sidebar-button"
              onClick={handleNavigateChat}
                role="button"  
              >
              <MessageOutlined />
              <p className='menu__text-pp'>Месседжер</p>
            </div>
    
            <div className="menu__sidebar-button"
            onClick={() => onClick('cabinet')}>
              <UserOutlined />
              <p className='menu__text-pp'>Личный кабинет</p>
            </div>
    
            <div className="menu__sidebar-button"
            onClick={() => onClick('receipts')}>
              <CalculatorOutlined />
              <p className='menu__text-pp'>Квитанции</p>
            </div>
    
    
            <div
                className='menu__info'
                onClick={handleNavigateRef}
                role="button"  
                tabIndex={0}  
              >
                <IssuesCloseOutlined />
                <p className='menu__text-pp'>Справочная информация</p>
              </div>
           
    
          </div>
        <div className="home__content">
        {renderComponent()}
        </div>
        </div>
      );
}

export default MenuSidebar;
