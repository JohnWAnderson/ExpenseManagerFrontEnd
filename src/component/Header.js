import React from 'react';
import {Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,NavLink, Button } from 'reactstrap';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import LoginModal from '../Account/LoginModal';
import SignupModal from '../Account/SignupModal';

const HeaderLink = styled(Link)`
  font-family: Georgia;
    color: White;
    text-decoration: none;
    font-size: 30px;
    text-align: left ;
    position: relative;
    vertical-align: middle;

    &:hover ${HeaderLink} {
      text-decoration: none;
      color: black;
  }
`

const MyNavBarLink = styled(Link)`
  font-family: Georgia;
  color: White;
  text-decoration: none;
  font-size: 20px;
  text-align: left ;
  position: relative;
  vertical-align: middle;
  margin: 10px;

    &:hover ${MyNavBarLink} {
      text-decoration: none;
      color: black;
  }
`

const MyNavBarButton = styled.button`
    cursor:pointer;
    font-family: Georgia;
    color: White;
    text-decoration: none;
    font-size: 20px;
    text-align: center ;
    align: center ;
    position: relative;
    vertical-align: middle;
    background: none;
    border:none;
    margin: 5px;

    &:hover ${MyNavBarButton} {
      text-decoration: none;
      color: red;
  }
`

const HeaderNavbar = styled(Navbar)`
  background: #3263A4;
`



class Header extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.signOpenToggle = this.signOpenToggle.bind(this);
    this.logOpenToggle = this.logOpenToggle.bind(this);

    this.state = {
      isOpen: false,
      logOpen: false,
      signOpen: false
    };
  }

  logOpenToggle() {
    this.setState({
      logOpen: !this.state.logOpen
    });
  }

  signOpenToggle() {
    this.setState({
      signOpen: !this.state.signOpen
    });
  }

  toggle() {
    this.setState({
      ...this.state,
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
        <HeaderNavbar light expand="md">
          <h1><HeaderLink to="/">Expense Manager</HeaderLink></h1>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
          {(this.props.User.isAuthenticated) ? 
            <Nav className="ml-auto" navbar>
              <NavItem>
                <h3><MyNavBarLink to="/analytics">Analytics</MyNavBarLink></h3>
              </NavItem>
              <NavItem>
                <h3><MyNavBarLink to="/Timeseries">Time Series</MyNavBarLink></h3>
              </NavItem>    
              <NavItem>
                <h3><MyNavBarLink to="/add">Add Item</MyNavBarLink></h3>
              </NavItem>
              <NavItem>
                <MyNavBarButton color="danger" onClick = {this.props.handleLogOut}>LogOut</MyNavBarButton>
              </NavItem>
            </Nav> 
            : 
            <Nav className="ml-auto" navbar>
              <NavItem>
                <LoginModal handleLogOn ={this.props.handleLogOn} logOpenToggle={this.logOpenToggle} 
                signOpenToggle={this.signOpenToggle} logOpen={this.state.logOpen} auth={this.props.User.isAuthenticated}/>

              </NavItem>
              <NavItem>
                <SignupModal handleLogOn ={this.props.handleLogOn} auth={this.props.User.isAuthenticated} s
                signOpenToggle={this.signOpenToggle}  signOpen={this.state.signOpen}/>

              </NavItem>
            </Nav> }
          </Collapse>
        </HeaderNavbar>
    );
  }
}

const MapUserInfo=(state)=>{
   return{
        User: state.user
   } }

 export default connect(MapUserInfo)(Header);