import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ListUserComponent from "./component/user/ListUserComponent";
import AddUserComponent from "./component/user/AddUserComponent";
import EditUserComponent from "./component/user/EditUserComponent";
import CinemaHomeComponent from "./component/cinema/CinemaHomeComponent";

function App() {
  return (
      <div className="container">
          
          <Router>
              <div className="">
                  <Switch>
                      <Route path="/" exact component={ListUserComponent} />
                      <Route path="/users" component={ListUserComponent} />
                      <Route path="/add-user" component={AddUserComponent} />
                      <Route path="/edit-user" component={EditUserComponent} />
                      <Route path="/cinema" component={CinemaHomeComponent} />
                  </Switch>
              </div>
          </Router>
      </div>
  );
}

export default App;
