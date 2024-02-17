import React from 'react';
import { IssuesCloseOutlined } from '@ant-design/icons';

import "./Home.scss";
import { Button } from 'antd';


function Home() {
  return (
    <section className='promo'>
      <div>
        <div className='container'>
          <div className='promo__content'>
            <div className="promo__text">
              <h1 className='promo__text-hh'>Зарегистрируйтесь</h1>
              <p className='promo__text-pp'>или войдите для полного доступа</p>
            </div>
            <div className='promo__info'>
            <IssuesCloseOutlined />
              <p className='promo__text-pp'>Справочная информация</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
