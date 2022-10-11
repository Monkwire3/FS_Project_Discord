import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import Navbar from "./components/Navbar";
import RegisterFormPage from "./components/RegisterForm";

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
      </Route>
    </Switch>
    </>

  );
}

export default App;
