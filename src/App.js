import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CardPage from "./components/CardPage/CardPage";
import Register from "./components/RegsiterPage/Register";
import "antd/dist/antd.css";
import Details from "./components/DetailPage/Details";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={CardPage} />
        <Route exact path="/reg" component={Register} />
        <Route exact path="/det" component={Details} />
      </Switch>
    </Router>
  );
}

export default App;
