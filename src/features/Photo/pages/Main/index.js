import Banner from 'components/Banner';
import Images from 'constants/images';
import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';
 
Main.protoTypes = {};

function Main(){
    return (
        <div className="photo-main">
            <Banner title="Banner main nè!" backgroundUrl={Images.banner3}/>
            <Container className="text-center">
                <Link to='/photos/add'>Add new photo</Link>
            </Container>
        </div>
    )
}

export default Main;