import React, {useState} from "react";
import PropTypes from "prop-types";
import BaseDialogs from '../components/chat/Dialogs/Dialogs';



const Dialogs = ({ items, userId }) => {
    const [inputValue, setValue] = useState("");  
    const [filtered, setFilteredItems] = useState(Array.from(items)); 

    const onChangeInput = value => {
        setFilteredItems( items.filter(
                dialog => 
                dialog.user.fullname.toLowerCase().indexOf(value.toLowerCase()) >= 0
            ));
        setValue(value);
    };

    return (
        <BaseDialogs 
            userId={userId}
            items={filtered} 
            onSearch={onChangeInput} 
            inputValue={inputValue} 
        />
    );
};

Dialogs.propTypes = {
    items: PropTypes.array.isRequired,
    userId: PropTypes.any.isRequired,
    inputValue: PropTypes.any,
};

Dialogs.defaultProps = {
    inputValue: "",  // Значение по умолчанию для inputValue
};


export default Dialogs;