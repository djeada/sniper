import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import App from "./App";
import Watch from "./Watch";

const Layout = () => (
  <Router>
    <div className="App">
      <ul>
        <li>
          <Link to="/">Play</Link>
        </li>
        <li>
          <Link to="/watch">Watch Other Games</Link>
        </li>
      </ul>
    </div>
    <Switch>
      <Route exact path="/" render={(d) => <App />} />
      <Route path="/watch" render={(d) => <Watch />} />
    </Switch>
  </Router>
);

export default Layout;
