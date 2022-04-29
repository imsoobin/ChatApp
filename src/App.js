import "./App.css";
import Login from "./components/Login";
import Chatroom from "./components/Chatroom";
import NotFound from "./components/Chatroom/NotFound";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import AuthProvider from "./ContextAPI/AuthProvider";
import AppProvider from "./ContextAPI/AppProvider";
import AddRoom from "./components/Modal/AddRoom";
import InviteModal from "./components/Modal/InviteModal";
import { onMessageList } from "./firebase-lint";
import Notification from "./components/Notification/Notification";
import ReactNotification from "./components/Notification/ReactNotification";
import { useState } from "react";
// import Fader from "./components/Fader";

function App() {
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({
    title: "Thông báo mới",
    body: "John",
  });

  onMessageList()
    .then((payload) => {
      setShow(true);
      console.log(show);
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
      });

      console.log(payload);
    })
    .catch((err) => {
      console.log("That bai", err);
    });
  return (
    <BrowserRouter>
      <ReactNotification title={notification.title} body={notification.body} />
      {show ? (
        <ReactNotification
          title={notification.title}
          body={notification.body}
        />
      ) : (
        <></>
      )}
      <Notification />
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
