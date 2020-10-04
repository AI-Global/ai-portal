import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';

import Landing from './views/Landing';
import Datasets from './views/Datasets';
import Login from './views/Login';
import Register from './views/Register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/datasets" component={Datasets} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
