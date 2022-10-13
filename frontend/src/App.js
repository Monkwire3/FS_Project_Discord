import { Route, Switch } from "react-router-dom";
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
        <Navbar />
        <Route path="/servers">
        <ServerIndex />
      </Route>
      </Route>
    </Switch>
    </>

  );
}

export default App;
