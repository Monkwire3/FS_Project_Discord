import { Route, Switch } from "react-router-dom";
import CreateServerForm from "./components/createServerForm";
import LeftSidebar from "./components/leftSideBar";
import LoginFormPage from "./components/LoginFormPage";
import Navbar from "./components/Navbar";
import RegisterFormPage from "./components/RegisterForm";
import ServerIndex from "./components/ServerIndex";
import ServerShow from "./components/ServerShow";
import Home from './components/Home'

function App() {
  return (
    <>
    <Switch>
      <Route exact path="/login">
        <LoginFormPage />
      </Route>
      <Route exact path="/register">
        <RegisterFormPage />
      </Route>  
      <Route path='/servers/:id'>
        <ServerIndex />
        <LeftSidebar />
        <ServerShow />
      </Route>
      
      {/* <Route path="/">
        <Home />
      </Route> */}
      <Route path="/servers/new">
        <CreateServerForm />
      </Route>

    </Switch>
    </>

  );
}

export default App;
