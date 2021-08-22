import React from 'react';
import { Switch, useRouteMatch, Route } from 'react-router-dom';
import MainPage from './pages/Main/index';
import NotFound from 'components/NotFound/index';
import { Container } from 'reactstrap';
User.protoTypes = {};

function User(props){
    const match = useRouteMatch();
    return (
        <Container>
            <div className="row">
                <div className="col-md-12 col-lg-2">user page</div>
                <div className="col-md-12 col-lg-10">
                    <Switch>
                        <Route exact path={match.url} component={MainPage} />
                        {/* <Route path={`${match.url}/add`} component={AddEditPage} />
                    <Route path={`${match.url}/:photoId`} component={AddEditPage} /> */}
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </div>
            
        </Container>
       
    )
}

export default User;