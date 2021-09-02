import React from 'react';
import { Switch, useRouteMatch, Route } from 'react-router-dom';
import MainPage from './pages/Main/index';
import NotFound from 'components/NotFound/index';
import { Container } from 'reactstrap';
import UserProfile from './component/UserProfile/UserProfile';
User.protoTypes = {};

function User(){
    const match = useRouteMatch();
    return (
        <Container>
            <div className="row">
                
                    <UserProfile userUid={match.params.userId}/>
                    <Switch>
                        <Route exact path={match.url}>
                            <MainPage match={match}/>
                        </Route>
                        {/* <Route path={`${match.url}/add`} component={AddEditPage} />
                    <Route path={`${match.url}/:photoId`} component={AddEditPage} /> */}
                        <Route component={NotFound} />
                    </Switch>
               
            </div>
            
        </Container>
       
    )
}

export default User;