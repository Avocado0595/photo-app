import React from 'react';
import PropTypes from 'prop-types';
import './Banner.scss';
import { Link } from 'react-router-dom';
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
        <Link to='/' className="banner" style={bannerStyle}>
            <p className="banner__text">Photo of the day by <a href="/">{author}</a></p>
        </Link>
    );
}

export default Banner;