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
    const {author, backgroundUrl} = props;

    const bannerStyle = backgroundUrl ? {backgroundImage: `url(${backgroundUrl})`}:{}
    //TODO: add link to author
    return (
        <div className="banner" style={bannerStyle}>
            <p className="banner__text">Photo of the day by <a href="/">{author}</a></p>
        </div>
    );
}

export default Banner;