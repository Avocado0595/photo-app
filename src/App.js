
import './App.css';
import React, {Suspense, lazy} from 'react';
import {BrowserRouter, Route, Switch, Redirect, Link} from 'react-router-dom';
import NotFound  from './components/NotFound/index';
import Header from './components/Header';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import Banner from './components/Banner';

//lazy load photo
const Photo = lazy(()=> import('./features/Photo/index'));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Header/>

        <Switch>
          <Redirect exact from='/' to='/photos'/>
          <Route path='/photos' component={Photo}/>
          <Route component={NotFound}/>
          
        </Switch>
      </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
