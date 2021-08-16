
import './App.css';
import React, {Suspense, lazy, useEffect} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import NotFound  from './components/NotFound/index';
import Header from './components/Header';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import {auth} from './firebase/Firebase';
import { useDispatch, useSelector,  } from 'react-redux';
import { setCurrentUser, signOut } from 'features/User/UserSlice';
import About from 'features/About/About';
import Contact from 'features/Contact/Contact';
import User from 'features/User/index';
//lazy load photo
const Photo = lazy(()=> import('./features/Photo/index'));

function App() {
  const currentUser = useSelector(state=>state.user);
  const dispatch =useDispatch();
  useEffect(()=>{
    const unSubcribeFromAuth = auth.onAuthStateChanged(async user=>{    
      if(user){
        const action = setCurrentUser({displayName:user.displayName, uid: user.uid});
        const token = await auth.currentUser.getIdToken();
        localStorage.setItem('firebaseToken',token );
        dispatch(action);
      }
      else{
        const action = signOut(user);
        dispatch(action);
      }
    }
      );
      return ()=>unSubcribeFromAuth();
  },
  [dispatch]
  )
  console.log(currentUser);

  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Header/>

        <Switch>
          <Redirect exact from='/' to='/photos'/>
          <Route path='/photos' component={Photo}/>
          <Route path='/about' component={About}/>
          <Route path='/contact' component={Contact}/>
          <Route path='/:userId' render={()=>{return (currentUser.currentUser? <User/> : <Redirect to="/"/>)}}/>
          <Route component={NotFound}/>
          
        </Switch>
      </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
