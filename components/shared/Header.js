import React from "react";
import Link from "next/link";
// импортим экземпляр нашего auth0
import auth0 from "../../services/auth0";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

const BsNavLink = ({ title, route }) => {
  return (
    <Link href={route}>
      <a className="nav-link port-navbar-link">{title}</a>
    </Link>
  );
};
// Нажимая на ссылку вызываем форму входа auth0
const Login = () => {
  return (
    <span onClick={auth0.login} className="nav-link port-navbar-link clickable">
      Login
    </span>
  );
};
const Logout = () => {
  return (
    <span
      onClick={auth0.logout}
      className="nav-link port-navbar-link clickable"
    >
      Logout
    </span>
  );
};

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      isAuthenticated: this.props.isAuthenticated // данные получим через контекст из _app, там посадим слушателя
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    // const { isAuthenticated, user } = this.state;
    const { isAuthenticated, user } = this.props;

    return (
      <div>
        <Navbar
          className="port-navbar port-default absolute"
          color="transparent"
          dark
          expand="md"
        >
          <NavbarBrand className="port-navbar-brand" href="/">
            Portfolio
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem className="port-navbar-item">
                <BsNavLink title="Home" route="/" />
              </NavItem>
              <NavItem className="port-navbar-item">
                <BsNavLink title="About" route="/about" />
              </NavItem>
              <NavItem className="port-navbar-item">
                <BsNavLink title="Portfolios" route="/portfolios" />
              </NavItem>
              {/* <NavItem className="port-navbar-item">
                <BsNavLink title="Blog" route="/blog" />
              </NavItem>
              <NavItem className="port-navbar-item">
                <BsNavLink title="Cv" route="/cv" />
              </NavItem> */}
              {/* {!isAuthenticated && (
                <NavItem className="port-navbar-item">
                  <BsNavLink title="Registration" route="/registration" />
                </NavItem>
              )} */}
              {!isAuthenticated && (
                <NavItem className="port-navbar-item">
                  <Login />
                </NavItem>
              )}

              {isAuthenticated && (
                <NavItem className="port-navbar-item">
                  <Logout />
                  {/* logout это ссылка, а не компанент */}
                </NavItem>
              )}
              {isAuthenticated && (
                <NavItem className="port-navbar-item">
                  <span className="nav-link port-navbar-link clickable">
                    {user.nickname}
                  </span>
                  {/* logout это ссылка, а не компанент */}
                </NavItem>
              )}

              {/* <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Option 1</DropdownItem>
                  <DropdownItem>Option 2</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Reset</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown> */}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
