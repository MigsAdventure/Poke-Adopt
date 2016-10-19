import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import Layout from './components/Layout';
import Home from './components/Home';
import MainViewPage from './components/MainViewPage';
import ClientsPage from './components/ClientsPage';

render(
  <Router history={browserHistory}>
    <Route path='/' component={Layout}>
      <IndexRoute component={Home}/>
      <Route path='/adopt' component={MainViewPage}/>
      <Route path='/clients' component={ClientsPage}/>
    </Route>
  </Router>,
  document.getElementById('root')
  )