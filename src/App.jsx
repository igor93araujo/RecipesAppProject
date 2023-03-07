import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
// import rockGlass from './images/rockGlass.svg';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneReceipes from './pages/DoneReceipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import DetailsDrinks from './pages/DatailsDrinks';
import DetailsMeals from './pages/DetailsMeals';

import 'bootstrap/dist/css/bootstrap.min.css';
import { AppProvider } from './context/AppProvider';

function App() {
  return (
    <AppProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Meals } />
        <Route
          exact
          path="/meals/:id"
          render={ (props) => <DetailsMeals { ...props } /> }
        />
        <Route exact path="/meals/:id/in-progress" />
        <Route exact path="/drinks" component={ Drinks } />
        <Route
          exact
          path="/drinks/:id"
          render={ (props) => <DetailsDrinks { ...props } /> }
        />
        <Route exact path="/drinks/:id/in-progress" />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneReceipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </AppProvider>
  );
}

export default App;
