// import logo from './logo.svg';
import './App.css';
import Home from './pages/home.js'
import Details from './pages/details.js';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {

  return (
    <Router>
      <div className="App">
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/coin/:id" component={Details}/>
      </Switch>
      </div>
    </Router>
  );
}

export default App;
