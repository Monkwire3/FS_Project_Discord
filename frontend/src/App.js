import { Route, Switch } from "react-router-dom";
import CreateServerForm from "./components/createServerForm";
import LeftSidebar from "./components/leftSideBar";
import LoginFormPage from "./components/LoginFormPage";
import Navbar from "./components/Navbar";
import RegisterFormPage from "./components/RegisterForm";
import ServerIndex from "./components/ServerIndex";
import ServerShow from "./components/ServerShow";

function App() {
  return (
    <>
    <Switch>
      <Route path="/login">
        <LoginFormPage />
      </Route>
      <Route path="/register">
        <RegisterFormPage />
      </Route>  
      <Route path='/channels/:id'>
        <ServerIndex />
        <LeftSidebar />
        <ServerShow />
      </Route>
      
      <Route path="/">
        <ServerIndex />
        <LeftSidebar />
        <ServerShow />
      <Route path="/servers/new">
        <CreateServerForm />
      </Route>

      </Route>
    </Switch>
    </>

  );
}

export default App;
