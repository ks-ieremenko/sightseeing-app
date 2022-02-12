import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navbar from '../../components/Navbar/Navbar';
import routesConfig from '../../routes/routes.config';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Navbar/>
        <Switch>
          {routesConfig.map(({ path, exact, component }, index) => (
            <Route
              key={index}
              path={path}
              exact={exact}
              component={component}
            />
          ))}
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
