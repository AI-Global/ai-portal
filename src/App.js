import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';
import { AppEnv } from './env';

import Landing from './views/Landing';
import Login from './views/Login';
import Register from './views/Register';
import Resources from './views/Resources';
import AddResources from './views/AddResource'
import Admin from './views/Admin';
import AddOrganizations from './views/AddOrganizations'

function App() {
  return (
    <div className="App">
      <AppEnv>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/resources" component={Resources}/>
            <Route exact path="/resources/create" component={AddResources} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/admin" component={Admin} />
            <Route exact path="/organizations/create" component={AddOrganizations}/>
          </Switch>
        </BrowserRouter>
      </AppEnv>
    </div>
  );
}

export default App;
