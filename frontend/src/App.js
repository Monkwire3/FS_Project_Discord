import { Route, Switch } from "react-router-dom";
import CreateServerForm from "./components/createServerForm";
import LoginFormPage from "./components/LoginFormPage";
import Navbar from "./components/Navbar";
import RegisterFormPage from "./components/RegisterForm";
import ServerIndex from "./components/ServerIndex";

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
      
      <Route path="/">
        <ServerIndex />
      <Route path="/servers/new">
        <CreateServerForm />
      </Route>
      <Route path="/servers">
      </Route>
      </Route>
    </Switch>
    </>

  );
}

export default App;
