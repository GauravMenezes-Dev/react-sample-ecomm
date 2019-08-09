import React from 'react';
import './custom-button.styles.scss'

const CustomButton = ({children, signInWithGoogle, ...otherProps}) => (
    <button className='custom-button' onClick={signInWithGoogle}>
        {children}
    </button>
)

export default CustomButton