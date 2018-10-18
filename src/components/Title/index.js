import React from 'react';
import PropTypes from 'prop-types';

const Title = props => {
    return (
        <header>
            <h1 className='title'>
                {props.title}
            </h1>
        </header>
    );
};

Title.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Title;
