
import './App.css';
import React, {Suspense, lazy, useState, useEffect} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import NotFound  from './components/NotFound/index';
import Header from './components/Header';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import productApi from 'api/productApi';

//lazy load photo
const Photo = lazy(()=> import('./features/Photo/index'));

function App() {
  const [productList, setProductList] = useState([]);
  useEffect(
    ()=>{
      const fetchProductList = async() =>{
        try{
          const params = {_page:1, _limit:10};
        const data = await productApi.getAll(params);
        console.log(data);
        }
        catch(error){
          console.log('Fetch data failed: ', error);
        }
      };
      fetchProductList();
    },[]
  )

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
