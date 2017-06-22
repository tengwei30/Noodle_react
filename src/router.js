import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Detail1 from './routes/detail/detail';
import Search from './routes/search/search';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} />
      <Route path="detail/:id" component={Detail1} />
      <Route path="search" component={Search} />
    </Router>
  );
}

export default RouterConfig;
