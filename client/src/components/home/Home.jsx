import React from 'react';
import { IssuesCloseOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import "./Home.scss";

function Home() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/reference");
  };

  return (
    <section className='promo'>
      <div>
        <div className='container'>
          <div className='promo__content'>
            <div className="promo__text">
              <h1 className='promo__text-hh'>Зарегистрируйтесь</h1>
              <p className='promo__text-pp'>или войдите для полного доступа</p>
            </div>
            <div
              className='promo__info'
              onClick={handleNavigate}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleNavigate();
                }
              }}
              role="button"  
              tabIndex={0}  
            >
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
