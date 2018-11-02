// import React from 'react';
// import {Link} from 'react-router-dom';
// import { connect } from 'react-redux';
// import styled from 'styled-components';
// import Login from '../Account/Login';


// const Header =(props)=>{
//     return(
//     <header>
//         <h1>
//         <Link to="/">
//             Expense Manager
//         </Link>
//         </h1>
//     {(props.User.isAuthenticated) ?
//             <div>
//                 <table>
//                     <tbody>
//                         <tr>
//                             <td><div>Hello, {props.User.currentUser.name}</div></td>
//                             <td><div><button onClick = {props.handleLogOut}>LogOut</button></div></td>
//                         </tr>
//                     </tbody>
//                 </table>
//             </div> :
//             <div><Login handleLogOn={props.handleLogOn}/></div>}
//     </header>   
//     );
// }

// const MapUserInfo=(state)=>{
//     return{
//         User: state.user
//     }
// }

// export default connect(MapUserInfo)(Header);

import React from 'react';
import {Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,NavLink, Button } from 'reactstrap';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import LoginModal from '../Account/LoginModal';
import SignupModal from '../Account/SignupModal';
class Header extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
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
      <div>
        <Navbar color="secondary" light expand="md">
          <NavbarBrand href="/">ExpenseManager</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
          {(this.props.User.isAuthenticated) ? 
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link to="/calendar/">Calendar</Link>
              </NavItem>
              <NavItem>
                <Link to="/add/">Add Item</Link>
              </NavItem>
              <NavItem>
                <Button  onClick = {this.props.handleLogOut}>LogOut</Button>
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
        </Navbar>
      </div>
    );
  }
}

const MapUserInfo=(state)=>{
   return{
        User: state.user
   } }

 export default connect(MapUserInfo)(Header);