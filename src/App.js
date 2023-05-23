import { Switch, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import { useContext } from 'react';
import AuthContext from './store/auth-context';

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          {!authCtx.isLoggedIn && <HomePage />}
        </Route>
        <Route path='/auth'>
          {!authCtx.isLoggedIn && <AuthPage />}
          {authCtx.isLoggedIn && <UserProfile/>}
        </Route>
        <Route path='/profile'>
          <UserProfile />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
