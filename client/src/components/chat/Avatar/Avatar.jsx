import React from "react";
import PropTypes from "prop-types";

import generateAvatarFromHash from '../../../utils/helpers/generateAvatarFromHash';

import "./Avatar.scss";

const Avatar = ({ user }) => {
  if (user.avatar) {
    return (
      <img
        className="avatar"
        src={user.avatar}
        alt={`Avatar ${user.fullname}`}
      />
    );
  }

  const { color, colorLighten } = generateAvatarFromHash(user.id);
  const firstChar = user.fullname[0].toUpperCase();
  
  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${color} 0%, ${colorLighten} 96.52%)`
      }}
      className="avatar avatar--symbol"
    >
      {firstChar}
    </div>
  );
};

Avatar.defaultProps = {
  user: {
    avatar: '',
    fullname: '',
    id: ''
  }
};

Avatar.propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.string,
    fullname: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  })
};

export default Avatar;
