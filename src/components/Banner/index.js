import React from 'react';
import PropTypes from 'prop-types';
import './Banner.scss';
Banner.propTypes = {
    title: PropTypes.string,
    backgroundUrl: PropTypes.string
};

Banner.defaultProps = {
    title: '',
    backgroundUrl: ''
}

function Banner(props) {
    const {backgroundUrl} = props;
    const bannerStyle = backgroundUrl ? {backgroundImage: `url(${backgroundUrl})`}:{}
    return (
        <div className="banner" style={bannerStyle}>
            <p className="banner__text">Today photo</p>
        </div>
    );
}

export default Banner;