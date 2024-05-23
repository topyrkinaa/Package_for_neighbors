import React, { useState }from "react";
import { connect } from 'react-redux';


import MenuSidebar from '../components/socialmedia/menuSidebar/MenuSidebar';

const MenuSidebarContainer = ({ user }) => {
    const [fild, setFild ] = useState("");

    const handleClick = (value) => {
        setFild(value);
    };
   
    return ( 
        <MenuSidebar 
            user={user}
            onClick={handleClick}
            fild={fild}
        />
    );
};

export default connect(
    ({ user }) => ({ user: user.data })
)(MenuSidebarContainer);
