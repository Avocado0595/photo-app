import React from 'react';
import { Switch, useRouteMatch, Route } from 'react-router-dom';
import MainPage from './pages/Main/index';
import AddEditPage from './pages/AddEdit/index';
import NotFound from '../../components/NotFound';
Photo.protoTypes = {};

function Photo(props){
    const match = useRouteMatch();
    return (
        <Switch>
            <Route exact path ={match.url} component={MainPage}/>
            <Route path ={`${match.url}/add`} component={AddEditPage}/>
            <Route path ={`${match.url}/:photoId`} component={AddEditPage}/>
            <Route component={NotFound}/>
        </Switch>
    )
}

export default Photo;