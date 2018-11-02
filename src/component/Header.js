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
import {Collapse, Navbar, NavbarBrand,Nav,NavItem,NavLink} from 'reactstrap';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Login from '../Account/Login';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  render() {
    return (
      <div>
      {this.props.User.isAuthenticated}
        <Navbar color="secondary" light expand="md">
          <NavbarBrand href="/">Expense Manager</NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/calendar/">Calendar</NavLink>
              </NavItem>
            <NavItem>
              <NavLink href="/calendar/">Calendar</NavLink>
            </NavItem>
            </Nav>
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