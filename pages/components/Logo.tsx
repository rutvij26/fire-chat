import React from 'react';
import { IconContext } from 'react-icons';
import { IoLogoFirebase } from 'react-icons/io5';

const Logo = () => {
    return (
        <IconContext.Provider value={{ color: 'yellow', size: '30px' }}>
            <div>
                <IoLogoFirebase />
            </div>
        </IconContext.Provider>
    );
};

export default Logo;
