import React from 'react';
import { Switch, useRouteMatch, Route } from 'react-router-dom';
import MainPage from './pages/Main/index';
import NotFound from '../../components/NotFound';
Photo.protoTypes = {};

function Photo(){
    const match = useRouteMatch();
    return (
        <Switch>
            <Route exact path ={match.url} component={MainPage}/>
            <Route component={NotFound}/>
        </Switch>
    )
}

export default Photo;