import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
    <Switch>
      <Route path="/login">
        <LoginFormPage />
      </Route>
      <Route path="/">
        <Navbar />
      </Route>
    </Switch>
    </>

  );
}

export default App;
