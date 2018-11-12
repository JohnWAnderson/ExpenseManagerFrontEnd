import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './component/Header';
import NotFound from './component/NotFound';
import AddPage from './component/ItemForms/AddPage';
import EditPage from './component/ItemForms/EditPage';
import CalendarPage from './component/Calendar/CalendarPage';
import { getCurrentUser, ACCESS_TOKEN, GetItems } from './ApiMethods/Account';
import PrivateRoute from './component/PrivateRoute';
import PrivateHomePageRoute from './component/PrivateHomePageRoute';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import { addUser, removeUser, authUser } from './Redux/Actions/Users';
import { addItem, clearItems } from './Redux/Actions/Items';
import { addGroup, clearGroup} from './Redux/Actions/Group';
import { resetFilter } from './Redux/Actions/Filter';
import { resetFilterQ } from './Redux/Actions/QFilter';
import AppDashBoard from './component/TimeSeries/AppDashBoard';
import {TimesItemChange} from './Redux/TimesChange';
import styled from 'styled-components';
import {LoadingChange} from './Redux/Actions/Loading';
import SignupPage from './Account/SignupPage';
import AnalyticsPage from './component/Analytics/AnalyticsPage';

const MainApp = styled.div`
  padding: 0;
  marggin: 0;
  height: 100%;
  min-height: 100%;
  min-width: 100%;
  width: 100%;
  position: relative;
`


class App extends React.Component {
  constructor(props) {   
    super(props);  
    //console.log(props);
    this.handleLogOn=this.handleLogOn.bind(this);
    this.loadCurrentUser=this.loadCurrentUser.bind(this);
    this.handleLogOut=this.handleLogOut.bind(this);
    this.loadItems=this.loadItems.bind(this);
    this.loadGroup=this.loadGroup.bind(this);
    this.props.dispatch(LoadingChange({clicked: false}));
  }

handleLogOn=()=>{
  this.loadCurrentUser();
}

  loadCurrentUser=()=> {
    getCurrentUser()
    .then(response => {
        this.props.dispatch(addUser({currentUser: response}));
        this.loadItems();
    })  
  };

  loadItems = () =>{
    GetItems().then(response => {     
      const groupList = new Set();
        for (const item of response.content) {
          const newItem = {...item, times: TimesItemChange(item, this.props.User.filter.startDate, this.props.User.filter.endDate)}
          groupList.add(item.group);
          this.props.dispatch(addItem(newItem))
        }
        this.loadGroup(groupList)
        this.props.dispatch(authUser({isAuthenticated: true}))
        this.props.dispatch(LoadingChange({clicked: false}));
    });
  }

  loadGroup = (groupList)=>{
    for (let group of groupList){
      if(group !== "no")
        this.props.dispatch(addGroup({group: group}))
    }
  }

handleLogOut=()=>{
    localStorage.removeItem(ACCESS_TOKEN);
    this.props.dispatch(removeUser());
    this.props.dispatch(clearGroup());
    this.props.dispatch(clearItems());
    this.props.dispatch(resetFilter());
    this.props.dispatch(resetFilterQ());
}


  render=()=>(
    <BrowserRouter>
        <MainApp className='app'>
            <Header handleLogOut= {this.handleLogOut} handleLogOn={this.handleLogOn}/>
            <Switch>
              <PrivateHomePageRoute path="/" componentAuth= {CalendarPage}  component={SignupPage} isAuthenticated={this.props.User.user.isAuthenticated}  exact={true}/>
              <PrivateRoute path="/analytics" component= {AnalyticsPage} isAuthenticated={this.props.User.user.isAuthenticated}  exact={true}/>
              <PrivateRoute path="/calendar" component= {CalendarPage} isAuthenticated={this.props.User.user.isAuthenticated}  exact={true}/>
              <PrivateRoute path="/edit/:id" component= {EditPage} isAuthenticated={this.props.User.user.isAuthenticated}  exact={true}/>
              <PrivateRoute path="/add" component={AddPage} isAuthenticated={this.props.User.user.isAuthenticated}  exact={true}/> 
              <PrivateRoute path="/Timeseries" component={AppDashBoard} isAuthenticated={this.props.User.user.isAuthenticated}  exact={true}/> 
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