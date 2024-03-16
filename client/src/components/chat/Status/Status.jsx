import React from "react";
import PropTypes from "prop-types";
import ClassNames from 'classnames';

import "./Status.scss";

const Status = ({ online, user }) =>(
    
    <div className="chat__dialog-header-center">
                <b className="chat__dialog-header-username">{ user.surname } { user.username }</b>
                <div className="chat__dialog-status">
                <span className={ClassNames('status',{'status--online': false } )}>
                      {online ? 'онлайн': 'офлайн'}
                </span>
                </div>
              </div>

    );

Status.defaultProps = {
    online: false
};

Status.propTypes = {
    online: PropTypes.bool
};

export default Status;