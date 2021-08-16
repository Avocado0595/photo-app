
import PhotoList from 'features/Photo/components/PhotoList';
import React from 'react';

import { Container } from 'reactstrap';

import "./Main.scss";
index.protoTypes = {};

function index({match}){
    const test = match.path;
    const userId = test.slice(1,);

    const breakpointColumnsObj=  {
        default: 3,
        1200: 3,
        992: 3,
        768: 2,
        576: 1,
      };

    return (
        <div className="photo-main">
            <Container className="text-center">
                <div className="row">
                    <div className="col-md-12 col-lg-9">
                        
                        <PhotoList isDisableHover={true} breakpointColumns={breakpointColumnsObj} userId={userId}/>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default index;