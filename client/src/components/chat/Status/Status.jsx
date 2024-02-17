import React from "react";
import PropTypes from "prop-types";
import ClassNames from 'classnames';

import "./Status.scss";

const Status = ({ online }) =>(
    <span className={ClassNames('status',{'status--online': online } )}>
        {online ? 'онлайн': 'офлайн'}
     </span>
    );

Status.defaultProps = {
    online: false
};

Status.propTypes = {
    online: PropTypes.bool
};

export default Status;