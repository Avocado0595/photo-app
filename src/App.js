
import './App.css';
import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import NotFound from './components/NotFound/index';
import Header from './components/Header';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import { auth } from './firebase/Firebase';
import { useDispatch } from 'react-redux';
import { setCurrentUser, signOut } from 'features/User/UserSlice';
import About from 'features/About/About';
import Contact from 'features/Contact/Contact';
import User from 'features/User/index';
import LoadingComponent from 'components/LoadingComponent/LoadingComponent';
import { getPhotosFail, getPhotosProcess, getPhotosSuccess } from 'features/Photo/photoSlice';
import photoApi from 'api/photoApi';
import { getAuthorsFail, getAuthorsProcess, getAuthorsSuccess } from 'features/Authors/authorsSlice';
import authorApi from 'api/authorApi';
import Search from 'features/Search/Search';
import EditProfile from 'features/User/pages/EditProfile/EditProfile';
import userApi from 'api/userApi';

//lazy load photo
const Photo = lazy(() => import('./features/Photo/index'));

function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    const unSubcribeFromAuth = auth.onAuthStateChanged(async user => {
      if (user) {

        const databaseUser = await userApi.getOne(user.uid);
        const googleUser = { uid: user.uid, displayName: user.displayName, email: user.email, photoURL: user.photoURL };

        const action = setCurrentUser({ googleUser, databaseUser });
        const token = await auth.currentUser.getIdToken();
        localStorage.setItem('firebaseToken', token);
        dispatch(action);
      }
      else {
        const action = signOut(user);
        dispatch(action);
      }
    }
    );

    const getAuthorList = async () => {
      try {
        dispatch(getAuthorsProcess());
        const authorList = await authorApi.getAll();
        dispatch(getAuthorsSuccess(authorList));
      }
      catch (err) {
        dispatch(getAuthorsFail())
      }

    }

    const fetchPhotoList = async () => {
      
      try {
        dispatch(getPhotosProcess());
        const data = await photoApi.getAll();
        dispatch(getPhotosSuccess(data));
      }
      catch (error) {
        dispatch(getPhotosFail());
      }
    };
    const asyncFetchData = async () => {
      await fetchPhotoList();
      await getAuthorList();
    }
    asyncFetchData();
    return () => unSubcribeFromAuth();
  },
    [dispatch]
  )

  return (
    <div className="App">
      <Suspense fallback={<LoadingComponent />}>
        <BrowserRouter>
          <Header />
          <Switch>
            <Redirect exact from='/' to='/photos' />
            <Route path='/photos' component={Photo} />
            <Route path='/about' component={About} />
            <Route path='/contact' component={Contact} />
            <Route path='/edit/:userId' component={EditProfile} />
            <Route path='/search/:keyword' component={Search} />
            <Route path='/:userId' component={User} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Suspense>
      
    </div>
  );
}

export default App;
