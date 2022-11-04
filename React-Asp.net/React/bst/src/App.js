
import './App.css';

import {Home} from './Components/Home';
import {Departments} from './Components/Departments';
import {Employees} from './Components/Employees';
import {Navigation} from './Components/Navigation';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
function App() {
  return (
    <Router>
      <h3 className='m-3 d-flex justify-content-center'>React.js with Bootstrap</h3>
      <h5 className='m-3 d-flex justify-content-center'>Employee Managment Portal</h5>
      <Navigation/>
      <Switch>
        <Route path='/' component={Home} exact/>
        <Route path='/department' component={Departments} exact/>
        <Route path='/employee' component={Employees} exact/>
      </Switch>
    </Router>
  );
}

export default App;
