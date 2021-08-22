import React from 'react';
import { Spinner } from 'reactstrap';

function LoadingComponent(props) {
    return (
        <div className="loading-block">
            <Spinner style={{ width: '3rem', height: '3rem' }} children=""/>{'  '} <p className="loading-text">Loading...</p>
        </div>
    );
}

export default LoadingComponent;