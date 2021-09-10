import './App.css';
import Login from './components/Login';
import Chatroom from './components/Chatroom';
import NotFound from './components/Chatroom/NotFound';
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import AuthProvider from './ContextAPI/AuthProvider';
import AppProvider from './ContextAPI/AppProvider';
import AddRoom from './components/Modal/AddRoom';
import InviteModal from './components/Modal/InviteModal';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Switch>
            <Route component={Login} path="/login"></Route>
            <Route component={Chatroom} path="/"></Route>
            <Route component={NotFound}></Route>
          </Switch>
          <AddRoom />
          <InviteModal />
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
