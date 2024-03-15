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
        alt={`Avatar ${user.username}`}
      />
    );
  }
// TODO: доработать id
  const { color, colorLighten } = generateAvatarFromHash('655637429096566cfb927368');
  const firstChar = user.username[0].toUpperCase();
  
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
    username: '',
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
