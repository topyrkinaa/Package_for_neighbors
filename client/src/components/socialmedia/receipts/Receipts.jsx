import React from 'react';
import { CalculatorOutlined } from '@ant-design/icons';
import "./Receipts.scss";

/* eslint-disable */

const Receipts =  ({ user }) => {
  return (
          <div className='home__content-container'>
            
            <div className="home__content-item no-money">
              <div className="home__content-item-icon">
                <CalculatorOutlined />
              </div>
              <div className="home__content-item-info">
                <div className="home__content-item-info-top">
                  <b>За февраль</b>
                </div>
                <div className="home__content-item-info-bottom">
                  <p>квартира {user.apartmentnum}</p>
                </div>
              </div>
              <div className="home__content-item-status">
                <p>не оплачено</p>
              </div>
            </div>

            <div className="home__content-item no-money">
              <div className="home__content-item-icon">
                <CalculatorOutlined />
              </div>
              <div className="home__content-item-info">
                <div className="home__content-item-info-top">
                  <b>За январь</b>
                </div>
                <div className="home__content-item-info-bottom">
                  <p>квартира {user.apartmentnum}</p>
                </div>
              </div>
              <div className="home__content-item-status">
                <p>не оплачено</p>
              </div>
            </div>


          </div>
  );
}

export default Receipts;
