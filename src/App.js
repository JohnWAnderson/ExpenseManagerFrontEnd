import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './component/Header';
import NotFound from './component/NotFound';
import AddPage from './component/AddPage';
import EditPage from './component/EditPage';
import CalendarPage from './component/CalendarPage';
import { getCurrentUser, ACCESS_TOKEN, GetItems } from './ApiMethods/Account';
import PrivateRoute from './component/PrivateRoute';
import PrivateHomePageRoute from './component/PrivateHomePageRoute';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import { addUser, removeUser } from './Redux/Actions/Users';
import { addItem, clearItems } from './Redux/Actions/Items';
import { resetFilter } from './Redux/Actions/Filter';
import AppDashBoard from './component/AppDashBoard';
import {TimesItemChange} from './Redux/TimesChange';
import styled from 'styled-components';
import {LoadingChange} from './Redux/Actions/Loading';
import SignupPage from './Account/SignupPage';

const MainApp = styled.div`
  padding: 0;
  height: 100%;
  min-height: 100%;
  min-width: 100%;
  width: 100%;
  position: relative;
  overflow:auto;
  background: white;

`


class App extends React.Component {
  constructor(props) {   
    super(props);  
    this.handleLogOn=this.handleLogOn.bind(this);
    this.loadCurrentUser=this.loadCurrentUser.bind(this);
    this.handleLogOut=this.handleLogOut.bind(this);
    this.loadItems=this.loadItems.bind(this);
    this.props.dispatch(LoadingChange({clicked: false}));
  }

handleLogOn=()=>{
  this.loadCurrentUser();
  this.loadItems();
}

  loadCurrentUser=()=> {
    getCurrentUser()
    .then(response => {
        this.props.dispatch(addUser({currentUser: response, isAuthenticated: true}))
    })
  };

handleLogOut=()=>{
    localStorage.removeItem(ACCESS_TOKEN);
    this.props.dispatch(removeUser());
    this.props.dispatch(clearItems());
    this.props.dispatch(resetFilter());
}

loadItems = () =>{
  GetItems().then(response => {     
      for (const item of response.content) {
        const newItem = {...item, times: TimesItemChange(item, this.props.User.filter.startDate, this.props.User.filter.endDate)}
        this.props.dispatch(addItem(newItem))
      }
  });
}
  

  render=()=>(
    <BrowserRouter>
        <MainApp className='app'>
            <Header handleLogOut= {this.handleLogOut} handleLogOn={this.handleLogOn}/>
            <Switch>
              <PrivateHomePageRoute path="/" componentAuth= {CalendarPage}  component={SignupPage} isAuthenticated={this.props.User.user.isAuthenticated}  exact={true}/>
              <PrivateRoute path="/edit/:id" component= {EditPage} isAuthenticated={this.props.User.user.isAuthenticated}  exact={true}/>
              <PrivateRoute path="/add" component={AddPage} isAuthenticated={this.props.User.user.isAuthenticated}  exact={true}/> 
              <PrivateRoute path="/Time" component={AppDashBoard} isAuthenticated={this.props.User.user.isAuthenticated}  exact={true}/> 
              <Route component= {NotFound}/>
            </Switch>
        </MainApp>
      </BrowserRouter>
  );
};

const MapUserInfo=(state)=>{
  return{
      User: state,
  }
}
export default connect(MapUserInfo)(App);