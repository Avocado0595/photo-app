import React, { useEffect } from 'react';
import { Switch, useRouteMatch, Route } from 'react-router-dom';
import MainPage from './pages/Main/index';
import NotFound from 'components/NotFound/index';
import { Container } from 'reactstrap';
import UserProfile from './component/UserProfile/UserProfile';
import Collection from './pages/Collection/Collection';
import { useDispatch } from 'react-redux';
import { getUserCollectionFail, getUserCollectionProcess, getUserCollectionSuccess } from 'features/Collection/CollectionSlice';
import collectionApi from 'api/collectionApi';
import { getPhotosByAuthorFail, getPhotosByAuthorProcess, getPhotosByAuthorSuccess } from 'features/Photo/photoSlice';
import photoApi from 'api/photoApi';

function User(){
    const match = useRouteMatch();
    const dispatch = useDispatch();
    const userId = match.params.userId;
    useEffect(() => {
        const getUserCollection = async () => {
          dispatch(getUserCollectionProcess());
          const userCollection = await collectionApi.getUserCollection(userId);
          if (userCollection) {
            dispatch(getUserCollectionSuccess(userCollection));
          }
          else {
            dispatch(getUserCollectionFail());
          }
        }
        getUserCollection();
    
        const getPhotosByAuthor = async () => {
          dispatch(getPhotosByAuthorProcess());
          const data = await photoApi.getByAuthor(userId);
          if (data) {
            dispatch(getPhotosByAuthorSuccess(data));
          }
          else {
            dispatch(getPhotosByAuthorFail());
          }
        }
        getPhotosByAuthor();
    
      }, [dispatch, userId])

    return (
        <Container>
            <div className="row">
                    <UserProfile userUid={match.params.userId}/>
                    <Switch>
                        <Route exact path={match.url}>
                            <MainPage match={match}/>
                        </Route>
                        <Route exact path={`${match.url}/:collectionId`}>
                            <Collection/>
                        </Route>
                        <Route component={NotFound} />
                    </Switch>   
            </div>
        </Container>
       
    )
}

export default User;